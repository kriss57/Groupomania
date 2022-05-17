import axios from "axios"
import tokenService from '../_services/tokenService'
import router from "@/router";
import jwt_decode from "jwt-decode";



const jwtInterceptor = axios.create({
    baseUrl: 'http://localhost:8888'
})

const instance = axios.create({
    baseUrl: 'http://localhost:8888'
})

//----Injection du token avec l interecepteur de requete

jwtInterceptor.interceptors.request.use(request => {
    console.log(`Bearer ${localStorage.getItem('token')
        }`);
    //request.headers['Authorization'] = `Bearer ${store.state.token}`
    request.headers.common.Authorization = `Bearer ${localStorage.getItem('token')
        }`
    return request
})


//------------------------------------------------------------------------//
//response interceptor pour rafraichir le token avec délais de 5 minute

jwtInterceptor.interceptors.response.use(response => {

    return response
}, error => {
    const originalRequest = error.config;
    console.log(originalRequest);
    let refreshToken = localStorage.getItem("refresh");
    let token = localStorage.getItem('token')
    //----Verification s'il y a bien un refreshToken et erreur 401
    if (
        refreshToken &&
        error.response.status === 401 &&
        !originalRequest._retry
    ) {
        originalRequest._retry = true;

        let ref = new Date()
        let decoded = jwt_decode(token);
        //-----Vérification Si le token n'a pas dépasser les 5 minutes d expiration
        if (ref.getTime() < (decoded.exp * 1000) + (5 * 60000)) {

            localStorage.setItem('token', refreshToken)
            axios
                .post("http://localhost:8888/auth/refresh")
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data.access_token);
                        localStorage.setItem("token", res.data.access_token);
                        console.log("Access token refreshed!");

                        router.go()
                        return axios(originalRequest);
                    }
                });
        } else {
            console.log('session expired plus de token');
            tokenService.logout()
            router.push('/')
        }


    }
    return Promise.reject(error);
}
);

export default jwtInterceptor


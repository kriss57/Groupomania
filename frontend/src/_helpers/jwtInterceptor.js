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

//-----Intercepteur reponse Api pour traiter l'erreur

/*jwtInterceptor.interceptors.response.use(response => {
    console.log('dans intercept res');
    console.log(response);
    console.log(localStorage.getItem('refresh'));
    return response
}, error => {
    //const refreshToken = localStorage.getItem('refresh')

    if (error.response.status == 401) {


        try {
            let refreshToken = localStorage.getItem("refresh")
            const rs = jwtInterceptor.post("/auth/refresh",
                refreshToken
            )

            const { accessToken } = rs.data

            localStorage.setItem("token", accessToken)


            // const { access_Token } = rs.data

            // localStorage.setItem("token", access_Token)

        } catch (err) {
            return Promise.reject(err)
        }
    } else {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
        //tokenService.logout()
        router.push('/')
        alert('la session a expiré')
    }

})
//let refreshToken = localStorage.getItem('refresh')
var decodedToken = localStorage.getItem('token');
if (decodedToken.exp < new Date() / 1000) {
    console.log("EXPIRED");
}*/

/*jwtInterceptor.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.config.url != "/auth/refresh" && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refresh')

        if (refreshToken && refreshToken != "") {
            jwtInterceptor.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;
            console.log(refreshToken);
            await jwtInterceptor.post("/auth/refresh").then((response) => {
                // TODO: mettre à jour l'accessToken dans le localStorage
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access_token}`;
                jwtInterceptor.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
            }).catch((err) => {
                console.log(err.response.status)
                console.log(err);
                refreshToken = null;
            });
            return instance(originalRequest);
        }
    }
    return Promise.reject(error);
});*/





jwtInterceptor.interceptors.response.use(response => {

    return response
}, error => {


    let token = localStorage.getItem('token')
    let tt = new Date()
    if (tt.getTime() < tt.getTime) {
        if (tt.getTime() < token.exp + (5 * 60)) {
            try {
                let refreshToken = localStorage.getItem("refresh")


                const rs = axios.post("/auth/refresh", {
                    refreshToken
                }

                )

                const { accessToken } = rs.data

                localStorage.setItem("token", accessToken)

                return axios(originalConfig)

            } catch (err) {
                return Promise.reject(err)
            }
        } else {
            localStorage.removeItem('token')
            localStorage.removeItem('refresh')
        }
    }
    return Promise.reject(error)
})


export default jwtInterceptor
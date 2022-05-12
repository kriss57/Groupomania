import axios from "axios"
import tokenService from '../_services/tokenService'
import router from "@/router";
import jwt_decode from "jwt-decode";



const jwtInterceptor = axios.create({
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

jwtInterceptor.interceptors.response.use(response => {
    console.log('dans intercept res');
    console.log(response);
    console.log(localStorage.getItem('refresh'));
    return response
}, error => {
    const refreshToken = localStorage.getItem('refresh')
    const originalRequest = error.config;
    if (error.response.status == 401 && !originalRequest._retry) {
        originalRequest._retry = true
        tokenService.logout()
        router.push('/')
        alert('la session a expiré');

    }

})

export default jwtInterceptor
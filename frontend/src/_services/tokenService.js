import router from "@/router"
import jwt_decode from "jwt-decode"

export default {

    // Sauvegarde token et redirection vers page principal
    saveToken(token) {
        localStorage.setItem('token', token)
        router.push('/admin/wall')
    },

    // Sauvegarde du refreshToken dans le localstorage
    saveRefreshToken(refreshToken) {
        localStorage.setItem('refresh', refreshToken)
    },

    // decodage du token
    decodeToken() {
        let token = localStorage.getItem('token');
        let decoded = jwt_decode(token);
        console.log(decoded);
    },

    // Supprime le token et déconnexion  (redirection page connexion)
    deleteToken(token) {
        localStorage.removeItem('token', token)
        router.push('/')

    },

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
    },

    isLogged() {
        let token = localStorage.getItem('token')

        return !!token
    },



}


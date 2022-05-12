import jwtInterceptor from "../_helpers/jwtInterceptor";
import axios from "axios"

const url = "http://localhost:8888/users"

export default {


    getAllUsers() {
        return jwtInterceptor.get(url)
    },

    getUser(id) {
        return jwtInterceptor.get(url + '/' + id)
    },

    addUser(user) {
        return jwtInterceptor.put(url, user)
    },

    authUser(user) {
        return jwtInterceptor.post('http://localhost:8888/auth/login', user)
    },

    // test refresh token route
    refreshUser(user) {
        return jwtInterceptor.post('http://localhost:8888/refresh', user)
    },

    updateUser(id, user) {
        return jwtInterceptor.patch(url + '/' + id, user)
    },

    trashUser() {
        return jwtInterceptor.delete(url + '/trash' + id, user)
    },

    untrashUser() {
        return jwtInterceptor.post(url + '/untrash' + id, user)
    },

    deleteUser(id) {
        return jwtInterceptor.delete(url + '/' + id)
    }
}

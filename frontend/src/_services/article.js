import jwtInterceptor from "../_helpers/jwtInterceptor";
import axios from "axios"

const url = "http://localhost:8888/articles"

export default {

    getAllArticles() {
        return axios.get(url)
    },

    getArticle(id) {
        return jwtInterceptor.get(url + '/' + id)
    },

    addArticle(article) {
        return jwtInterceptor.put(url, article)
    },

    updateArticle(id, article) {
        return jwtInterceptor.patch(url + '/' + id, article)
    },

    trashArticle() {
        return jwtInterceptor.delete(url + '/trash' + id, article)
    },

    untrashArticle() {
        return jwtInterceptor.post(url + '/untrash' + id, article)
    },

    deleteArticle(id) {
        return jwtInterceptor.delete(url + '/' + id)
    }
}

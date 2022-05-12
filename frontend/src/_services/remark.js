import jwtInterceptor from "../_helpers/jwtInterceptor";
import axios from "axios"

const url = "http://localhost:8888/remarks"

export default {


    getAllRemarks() {
        return jwtInterceptor.get(url)
    },

    getRemark(id) {
        return jwtInterceptor.get(url + '/' + id)
    },

    addRemark(remark) {
        return jwtInterceptor.put(url, remark)
    },

    updateRemark(id, remark) {
        return jwtInterceptor.patch(url + '/' + id, remark)
    },


    deleteRemark(id) {
        return jwtInterceptor.delete(url + '/' + id)
    }
}

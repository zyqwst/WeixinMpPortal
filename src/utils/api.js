import axios from "@/utils/axios"

//let apiUrl = "http://www.sviip.com/wechat/support";
let apiUrl = "";
export default {
    install(Vue) {
        Vue.prototype.$api = {
            get(url, params) {
                return axios.get(apiUrl + url, { params: params })
            },
            post(url, params) {
                return axios.post(apiUrl + url, params);
            }
        }
    }
}
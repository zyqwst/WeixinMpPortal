import axios from "./axios"

let apiUrl = "http://10.175.31.46";
//let apiUrl = "";
export default {
    install(Vue) {
        Vue.prototype.$api = {
            get(url, params) {
                return axios.get(apiUrl + url, { params: params })
            },
            post(url, params) {
                let prm = new URLSearchParams()
                for(let item in params){
                    prm.append(item,params[item])
                }
                return axios.post(apiUrl + url,prm);
            }
        }
    }
}
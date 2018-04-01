import axios from "./axios"

// let apiUrl = "http://localhost:9000";
let apiUrl = "";
export default {
    install(Vue) {
        Vue.prototype.$api = {
            spread(callback){
                return axios.spread(callback)
            },
            get(url, params) {
                return axios.get(apiUrl + url, { params: params })
            },
            post(url, params) {
                return axios.post(apiUrl + url,params)
            },
            /**
             * 多请求
             * @param {[{url:string,params:any,type:string]} arr 
             */
            all(arr){
                let makeReq = function(item){
                    return item.type==='post'?axios.post(apiUrl+item.url,item.params):axios.get(apiUrl+item.url,{params:item.params})
                }
                let reqs = arr.map(makeReq)
                return axios.all(reqs)
            }
        }
    }
}
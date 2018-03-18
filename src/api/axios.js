import axios from "axios"
import Vue from "vue"
import {Cookies} from "../utils/cookie-util"

axios.interceptors.request.use(config => {
    config.headers.common[Cookies.Authorization] = sessionStorage.getItem(Cookies.Authorization)
    return config;
})

axios.interceptors.response.use(response =>{
    let result = response.data
    if(!result){
        result = {
            status:-1,
            msg:'数据请求失败'
        }
        let err = new Error(result.msg)
        err.data = result
        err.response = response
        throw err
    }

    return result

},
    err =>{
        Vue.prototype.instance.$vux.toast.show(err.message);
        return Promise.reject(err);
    }
)

export default axios;
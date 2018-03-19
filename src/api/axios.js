import axios from "axios"
import Vue from "vue"
import {Cookies} from "../utils/cookie-util"

axios.interceptors.request.use(config => {
    config.headers.common[Cookies.Authorization] = sessionStorage.getItem(Cookies.Authorization)
    if(config.method  === 'post'){
        const formData = new FormData()
        Object.keys(config.data).forEach(key => formData.append(key, config.data[key]))
        config.data = formData
    }
    return config;
})

axios.interceptors.response.use(response =>{
    let result = response.data
    if(!result){
        result = {
            status:-1,
            msg:'数据请求失败'
        }
    }
    switch(result.status){
        case 1:
            return result
            break;
        default:
            
    }

    let err = new Error(result.msg)
    err.data = result
    err.response = response
    throw err

},
    err =>{
        Vue.prototype.instance.$vux.toast.show(err.message);
        return Promise.reject(err);
    }
)

export default axios;
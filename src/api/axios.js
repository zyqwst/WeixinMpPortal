import axios from "axios"
import Vue from "vue"

axios.interceptors.request.use(config => {
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
        default:
            break;
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
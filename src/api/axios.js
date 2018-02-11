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
            msg:'为请求到数据'
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
        console.info('axios-err',err)
        return Promise.reject(err)
    }
)

export default axios;
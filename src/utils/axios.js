import axios from "axios"
import Vue from "vue"


//设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
    if (token) {  
        config.headers.Authorization = token;
    }
    return config;
});

//错误处理
axios.interceptors.response.use(
    (response) => {
        console.log(response);
        let result = response.data;
        console.info("result===", result);

        if (!result) {
            result = {
                stateCode: 3,
                message: "未获取到数据"
            }
        }

        switch (result.stateCode) {
            case 0:
                return result.data;
            case 1:
                //没有登录
                break;
            case 2:
                //其他错误
                break;
            default:
                break;
        }

        let err = new Error(result.message);

        err.data = result;
        err.response = response;

        throw err;
    },
    (err) => {
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = "请求错误";
                    break
                case 404:
                    err.message = "请求地址不存在";
                    break
                case 408:
                    err.message = "网络异常，请稍后重试[408]";
                    break
                case 500:
                    err.message = "网络异常，请稍后重试[500]";
                    break
                case 501:
                    err.message = "网络异常，请稍后重试[501]";
                    break
                case 502:
                    err.message = "网络异常，请稍后重试[502]";
                    break
                case 503:
                    err.message = "网络异常，请稍后重试[503]";
                    break
                case 504:
                    err.message = "网络异常，请稍后重试[504]";
                    break
                case 505:
                    err.message = "网络异常，请稍后重试[505]";
                    break
                default:
            }
        }
        else {
            err.message = "网络异常，请稍后重试";
        }
        Vue.prototype.instance.$vux.toast.show(err.message);
        return Promise.reject(err);
    }
);

export default axios;
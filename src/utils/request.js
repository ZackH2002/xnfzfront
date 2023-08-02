/**
 * 封装 axios工具
 */

import axios from "axios";
import { Loading } from "element-ui";
const URL = "http://localhost:8088"

//请求接口时候的加载对象
let loadingInstance = ""

//创建 axios实例
const request = axios.create({
    baseURL: URL,
    timeout: 5000,
    withCredentials: true,
    crossDomain: true
})

//request拦截器
request.interceptors.request.use(config=>{
    //开启全屏加载效果
    loadingInstance = Loading.service({fullscreen: true});
    config.headers["Content-Type"] = "application/json"
    if(localStorage.getItem("token")){
        config.headers.token = localStorage.getItem("token")
    }
    return config
    }, 
    error=>{
        return Promise.reject(error)
    }
)

//request 拦截器
request.interceptors.response.use(
    response=>{
        loadingInstance.close()
        if(response.status == 200){
            return response.data
        }
        return -1
    },
    error=>{
        return Promise.reject(error)
    }
)

export default request

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
// 以服务的方式来调用 Loading 加载
import {ElLoading, ElMessage} from 'element-plus'
enum MESS {
    "操作成功" = 200,
    "密码错误",
    "帐号错误",
    "请求异常"
}

// 加载。。。
let loading: any
const startLoading = () => {
    interface Options {
        lock: boolean;
        text: string;
        background: string;
    }
    const options: Options = {
        lock: true,
        text: '加载中...',
        background: 'rgba(0,0,0,0.7)'
    }
    loading = ElLoading.service(options)
}

const endLoading = () => {
    loading.close()
}
const http = axios.create({
    baseURL: '/api'
})
// * 请求拦截
http.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = config.headers || {}
    if (localStorage.getItem('token')) {
        config.headers["cms-token"] = localStorage.getItem('token') || ''
    }

    // ? 加载
    startLoading()
    return config
})

// * 响应拦截
http.interceptors.response.use((response:AxiosResponse) => {
    const code:number = response.data.errCode
    console.log(response.data.code, response)
    if(code !== 0) {
        ElMessage.error(MESS[code]);
        endLoading()
        return Promise.reject(response.data)
    }
    // ? 结束 loading
    endLoading()
    return response
}, err => {
    endLoading()
    // ? 错误提醒
    return Promise.reject(err)
})

export default http

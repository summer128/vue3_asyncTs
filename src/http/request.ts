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
// 创建一个实例 axios.create({})
const http = axios.create({
    baseURL: 'http://127.0.0.1:3000'
})
// * 请求拦截
http.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = config.headers || {}
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';  //此处是增加的代码，设置请求头的类型
    console.log(localStorage.getItem('Authorization'), 'Authorization')
    if (localStorage.getItem('Authorization')) {
        config.headers["Authorization"] = localStorage.getItem('Authorization') || ''
    }

    // ? 加载
    startLoading()
    return config
})

// * 响应拦截
// http.interceptors.response.use((response:AxiosResponse) => {
//     const code:number = response.data.errCode
//     console.log(response.data.code, response)
//     if(code !== 0) {
//         ElMessage.error(MESS[code]);
//         endLoading()
//         return Promise.reject(response.data)
//     }
//     // ? 结束 loading
//     endLoading()
//     return response
// }, err => {
//     endLoading()
//     // ? 错误提醒
//     return Promise.reject(err)
// })


http.interceptors.response.use((response:AxiosResponse) => {
    // console.log(response, '响应数据')
    const code:number = response.data.status
    if (response.status === 200) {
        if(code !== 0) {
            ElMessage.error(response.data.message);
            endLoading()
        } else {
            ElMessage.success(response.data.message);
        }
    } else {
        // 状态码报错
        ElMessage.error(MESS[code]);
        endLoading()
        return Promise.reject(response.data)
    }
    endLoading()
    // ? 结束 loading
    return response
}, err => {
    endLoading()
    // ? 错误提醒
    return Promise.reject(err)
})
export default http

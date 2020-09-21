import axios from "axios";
import store from "@/store";
import { Toast } from "vant";
let router = import("@/router");

// 环境的切换
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'https://www.baidu.com';
  }
  else {
    axios.defaults.baseURL = 'https://www.production.com';
  }
axios.defaults.timeout = 3 * 1000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers["Cache-Control"] = "no-cache";
axios.defaults.headers["pragma"] = "no-cache";

let source = axios.CancelToken.source();

axios.interceptors.request.use(
    request => {
        request.headers["X-SZK-Channel"] = "h5";
        request.headers["X-SZK-Token"] = "";
        request.headers["X-SZK-UUID"] = "";

        // 动画效果
        const loadingFlag = request.data.NoLoading;
        if (!loadingFlag) {
            store.dispatch("AppStore/setLoading", true);
        }
        return request;
    }, error => {
        return Promise.reject(error)
    }
);

//切换页面取消请求
axios.interceptors.request.use(request => {
    request.cancelToken = source.token;
    return request;
});
router.then(lib => {
    lib.default.beforeEach((to, from, next) => {
        source.cancel()
        source = axios.CancelToken.source();
        next()
    })
})

//登录过期跳转
axios.interceptors.response.use(response => {
    let data = response.data;
    if (
        [10002].includes(data.ret)
    ) {
        router.then(lib => lib.default.push({ name: "login" })); // 跳转到登录页面
        Toast(data.msg);
    }
    return response;
})

//返回值解构
axios.interceptors.response.use(response => {
    let data = response.data;
    let isJson = (response.headers["content-type"] || "").includes("json");
    if (isJson) {
        if (data.code !== 200) {
            handleError(data.code)
        }
        return Promise.resolve({
            data: data.data,
            msg: data.msg,
            code: data.code,
        });

    } else {
        return data;
    }
}, err => {
    let isCancel = axios.isCancel(err);
    if (isCancel) {
        return new Promise(() => { });
    }
    return Promise.reject(
        err.response.data &&
        err.response.data.msg ||
        "网络错误"
    );
})

/**
 * 请求失败后的错误统一处理
 * @param {Number} code 请求失败的状态码
 */
const handleError = code => {
    switch (code) {
        case 400:
            Toast('错误请求')
            break;
        case 401:
            Toast('未授权，请重新登录')
            break;
        case 403:
            Toast('拒绝访问')
            break;
        case 404:
            Toast('请求错误,未找到该资源')
            window.location.href = "/NotFound"
            break;
        case 405:
            Toast('请求方法未允许')
            break;
        case 408:
            Toast('请求超时')
            break;
        case 500:
            Toast('服务器端出错')
            break;
        case 501:
            Toast('网络未实现')
            break;
        case 502:
            Toast('网络错误')
            break;
        case 503:
            Toast('服务不可用')
            break;
        case 504:
            Toast('网络超时')
        default:
            break
    }
}

export function post(url, data, otherConfig) {
    return axios.post(url, data, otherConfig);
}

export function get(url, data, otherConfig) {
    return axios.get(url, { params: data, ...otherConfig });
}
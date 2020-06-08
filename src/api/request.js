import axios from 'axios';
import {statusSuccess} from "./config";

const url = process.env.VUE_APP_BASE_URL;
const request = axios.create({
    baseURL: url,
    timeout: 20000
});

/*响应拦截器  精简返回的数据*/
request.interceptors.response.use(response => {
    const res = response.data;
    if (res.code !== statusSuccess) {
        return Promise.reject(new Error(res.msg));
    }else{
        return res;
    }
}, error => {
    return Promise.reject(error);
});
export default request;

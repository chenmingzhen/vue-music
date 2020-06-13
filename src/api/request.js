import axios from 'axios';
import {statusSuccess} from "./config";

//FIXME 手机不知道为什么不能查看相似艺人
/*请求相似歌手出现301错误 添加这个就好了  听说这个还能解决跨域 */
axios.defaults.withCredentials=true;
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

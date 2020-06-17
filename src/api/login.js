import request from "./request";

/*登陆*/
export function login(phone,password) {
    const url='/login/cellphone';
    return request({url, method: 'get', params: {phone,password}});
}

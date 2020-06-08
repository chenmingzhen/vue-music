import originJsonp from 'jsonp';

export default function jsonp(url, data, option) {
    /*拼接url 判断是否存在param？ 有则拼接*/
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
    return new Promise((resolve, reject) => {
        originJsonp(url, option, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
}

function param(data) {
    let url = '';
    for (let k in data) {
        let value = data[k] !== undefined ? data[k] : '';
        url += '&' + k + '=' + encodeURIComponent(value);
    }
    /*去掉第一个&*/
    return url ? url.substring(1) : '';
}

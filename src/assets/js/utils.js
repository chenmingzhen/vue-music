import Cookies from 'js-cookie';

export function pxToRem(px) {
    return px/37.5+'rem';
}

/*时间戳转换*/
export function timestampToTime(timestamp) {
    let l=timestamp.toString().length;
    let date;
    // coldplay 1584288000000
    //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    if(l===10){
        date= new Date(timestamp*1000);
    }else{
        date= new Date(timestamp);
    }
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    let s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    return Y+M+D;
}

/**/
export function formatDuration(mss) {
    let days = parseInt(mss / (1000 * 60 * 60 * 24));
    let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = (mss % (1000 * 60)) / 1000;
    return minutes + ":" + seconds;
}



export function getToken(TokenKey = 'User-Token') {
    return Cookies.get(TokenKey);
}

export function setToken(token,TokenKey = 'User-Token') {
    return Cookies.set(TokenKey, token);
}

export function removeToken(TokenKey = 'User-Token') {
    return Cookies.remove(TokenKey);
}

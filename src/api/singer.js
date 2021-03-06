import request from "./request";

/*热门歌手*/

//https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e7%83%ad%e9%97%a8%e6%ad%8c%e6%89%8b
export function getSinger({limit = 50, offset = 0, type = -1, area = -1}) {
    const url = '/artist/list';
    return request({url, method: 'get', params: {limit, offset, type, area}});
}

/*歌手信息*/

//https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e6%ad%8c%e6%89%8b%e5%8d%95%e6%9b%b2
export function getSingerInf(id) {
    const url = '/artists';
    return request({url, method: 'get', params: {id}});
}

/*音乐url*/

//https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e9%9f%b3%e4%b9%90-url
export function getSong(id) {
    const url = '/song/url';
    return request({url, method: 'get', params: {id}});
}

/*相似歌手*/

//https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e7%9b%b8%e4%bc%bc%e6%ad%8c%e6%89%8b
export function getSimilarSinger(id) {
    const url = '/simi/artist';
    return request({url, method: 'get', params: {id}});
}

/*歌手专辑*/

//https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e4%b8%93%e8%be%91%e5%86%85%e5%ae%b9
export function getSingerAlbum(id) {
    const url = '/artist/album';
    return request({url, method: 'get', params: {id}});
}

/*获取歌手 mv*/

//https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e6%ad%8c%e6%89%8b-mv
export function getSingerMv(id) {
    const url = '/artist/mv';
    return request({url, method: 'get', params: {id}});
}

/*mv 地址*/

//https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=mv-%e5%9c%b0%e5%9d%80
export function getMvUrl(id) {
    const url = '/mv/url';
    return request({url, method: 'get', params: {id}});
}

/*排行榜*/

//https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%8e%92%e8%a1%8c%e6%a6%9c
export function getRank(idx) {
    const url = '/top/list';
    return request({url, method: 'get', params: {idx}});

}

import request from "./request";
import axios from 'axios';
/*热门歌手*/
//https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e7%83%ad%e9%97%a8%e6%ad%8c%e6%89%8b
export function getSinger({limit=50,offset=0,type=-1,area=-1}){
    const url='/artist/list';
    return request({url, method: 'get', params: {limit,offset,type,area}});
}

/*歌手信息*/
//https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e6%ad%8c%e6%89%8b%e5%8d%95%e6%9b%b2
export function getSingerInf(id) {
    const url='/artists';
    return request({url, method: 'get', params: {id}});
}

/*音乐url*/
//https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e9%9f%b3%e4%b9%90-url
export function getSong(id){
    const url='/song/url';
    return request({url, method: 'get', params: {id}});
}

/*相似歌手*/
//https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e7%9b%b8%e4%bc%bc%e6%ad%8c%e6%89%8b
export function getSimilarSinger(id) {
    const url='/simi/artist';
    return request({url, method: 'get', params: {id}});
}

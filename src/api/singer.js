import request from "./request";

/*热门歌手*/
//https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e7%83%ad%e9%97%a8%e6%ad%8c%e6%89%8b
export function getSinger({limit=50,offset=0,type=-1,area=-1}){
    const url='/artist/list';
    return request({url, method: 'get', params: {limit,offset,type,area}});
}

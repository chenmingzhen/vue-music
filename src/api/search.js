import request from "./request";

/*热搜列表*/
//https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e7%83%ad%e6%90%9c%e5%88%97%e8%a1%a8%e7%ae%80%e7%95%a5
export function getHotSearch() {
    const url='/search/hot';
    return request({url, method: 'get'});
}

/*搜索*/
//https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%90%9c%e7%b4%a2
/*limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
type: 搜索类型；
默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合*/
export function getSearch({keywords,limit=30,offset=0,type=1}) {
    const url='/search';
    return request({url, method: 'get', params: {keywords,limit, offset, type}});
}

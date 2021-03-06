import {getSong} from "../../api/singer";
import {getLyric} from "../../api/play";

export class Song {
    /**
     *
     * @param id 歌曲id
     * @param name 名字
     * @param ar 演唱者
     * @param al  专辑 内有picUrl
     * @param dt  时长
     */
    constructor({id,name,ar,al,dt,url}) {
        this.id=id;
        this.name=name;
        // FIXME
        this.singer=ar;
        this.album=al;
        this.duration=dt;
        this.image=al.picUrl;
        this.url=url;
    }

    /*获取歌词*/
    //https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e6%ad%8c%e8%af%8d
    _getLyric(){
        if(this.lyric){
            return Promise.resolve(this.lyric);
        }
        return new Promise(((resolve, reject) => {
            getLyric(this.id).then(data=>{
                resolve(data);
            });
        }));
    }
}

export async function createSong(musicData) {
    let _url='';
    await getSong(musicData.id).then(data=>{
        _url=data.data[0].url;
    });
    return new Song({
        id: musicData.id,
        name:musicData.name,
        ar:filterSinger(musicData.ar),
        al:musicData.al,
        dt:musicData.dt,
        image:musicData.al.picUrl,
        url:_url
    });
}

function filterSinger(singer){
    let ret=[];
    if(!singer){
        return '';
    }
    singer.forEach(item=>{
        ret.push(item.name);
    });
    return ret.join('/');
}


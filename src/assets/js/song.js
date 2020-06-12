import {getSong} from "../../api/singer";

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
}

export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        name:musicData.name,
        singer:filterSinger(musicData.ar),
        al:musicData.al,
        duration:musicData.dt,
        image:musicData.al.picUrl,
        url:getSong(musicData.id)
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

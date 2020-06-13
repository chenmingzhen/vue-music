<template>
    <transition name="fade-slide-right" appear>
        <!--<music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>-->
        <my-music-list :title="title" :bg-image="bgImage" :songs="songs"></my-music-list>
    </transition>
</template>

<script>
  import {getSingerInf} from "../../api/singer";
  import {singerMixin} from "../../utils/mixin";
  import {createSong} from "../../assets/js/song";
  import MusicList from "../singerInf/musicList";
  import MyMusicList from "../singerInf/singerInf";
  export default {
    name: "singerDetail",
    mixins: [singerMixin],
    components:{MyMusicList},
    computed:{
      title(){
        return this.singer.name;
      },
      bgImage(){
        return this.singer.picUrl;
      },
    },
    data(){
      return {
        songs:[]
      };
    },
    created() {
      if(!this.singer.id){
        this.$router.push('/singer');
        return;
      }
      this.initSingerDetail();
    },
    methods: {
      initSingerDetail() {
        getSingerInf(this.singer.id).then(data => {
          this.songs=this.normalizeSongs(data.hotSongs);
        });
      },
      normalizeSongs(list){
        let ret=[];
        list.forEach(item=>{
          if(item.id&&item.al.id){
            createSong(item).then(data=>{
              ret.push(data);
            });
          }
        });
        return ret;
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/transitions";

    /*測試類*/
    .singerDetail {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: black;
        z-index: 1000;
    }

</style>

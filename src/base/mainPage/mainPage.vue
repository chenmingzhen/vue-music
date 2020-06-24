<template>
    <div class="main-page">
        <div class="hot-music">
            <div class="hot-music-text-wrapper">
                <div class="icon"><i class="icon-play"></i></div>
                <div class="hot-text">近期热门</div>
                <div class="hot-more">更多热门 ></div>
            </div>
            <song-list :songs="songs.slice(0,3)" :album="true" @selectItem="handleSelect"></song-list>
        </div>
        <div class="basic-info" v-if="briefDesc">
            <div class="basic-info-text-wrapper">
                <div class="icon"><i class="icon-mine"></i></div>
                <div class="info-text">歌手简介</div>
            </div>
            <div class="info">
                {{briefDesc}}
            </div>
        </div>
        <div class="similar-singer">
            <div class="similar-singer-text-wrapper">
                <div class="icon"><i class="icon-mine"></i></div>
                <div class="info-text">相似艺人</div>
            </div>
        <singer-column></singer-column>
        </div>
        <div style="height: 20px"></div>
    </div>
</template>

<script>
  import SongList from "../../base/songList/songList";
  import {playMixin, singerMixin} from "../../utils/mixin";
  import {getSingerInf} from "../../api/singer";
  import SingerColumn from "../column/singerColumn";

  export default {
    name: "mainPage",
    mixins: [singerMixin,playMixin],
    // eslint-disable-next-line vue/no-unused-components
    components: {SongList,SingerColumn},
    props: {
      songs: Array
    },
    data(){
      return {
        briefDesc:''
      };
    },
    created() {
      getSingerInf(this.singer.id).then(data=>{
        this.briefDesc=data.artist.briefDesc;
      }).catch(e=>{
        console.log('mainPageError');
      });
    },
    methods:{
      handleSelect(item,index){
        this.selectPlay({
          list:this.songs,
          index
        });
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "../../assets/sass/variable";

    .main-page {
        padding: 0 0.533rem;

        .hot-music {
            padding-top: 0.533rem;
            box-sizing: border-box;
            .hot-music-text-wrapper {
                font-size: 0.8rem;
                color: #EEA84E;
                padding-bottom: 0.267rem;
                display: flex;
                justify-content: space-between;
                align-items: center;

                i {
                    color: #766F5C;
                }

                .hot-text {
                    flex-basis: 65%;
                    font-weight: bolder;
                    padding-bottom: 0.133rem;
                }

                .hot-more {
                    font-size: 0.4rem;
                    border-radius: 20px;
                    border: 0.053rem solid #766F5C;
                    padding: 0.267rem 0.533rem;
                }
            }
        }
        .basic-info{
            padding-top: 0.533rem;
            box-sizing: border-box;
            .basic-info-text-wrapper{
                font-size: 0.8rem;
                font-weight: bolder;
                color: #EEA84E;
                padding-bottom: 0.267rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .icon{
                    i{
                        color: #766F5C;
                    }
                }
                .info-text{
                    flex-basis: 92%;
                    font-weight: bolder;
                    padding-bottom: 0.133rem;
                }

            }
            .info{
                color: $c-b-d;
                font-size: 0.8rem;
                padding: 0 0.3rem;
                line-height: 1.2rem;
            }
        }
        .similar-singer{
            padding-top: 0.533rem;
            .similar-singer-text-wrapper{
                font-size: 0.8rem;
                font-weight: bolder;
                color: #EEA84E;
                padding-bottom: 0.267rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .icon{
                    i{
                        color: #766F5C;
                    }
                }
                .info-text{
                    flex-basis: 92%;
                    font-weight: bolder;
                    padding-bottom: 0.133rem;
                }
            }
        }
    }
</style>

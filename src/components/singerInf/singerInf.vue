<template>
    <div class="music-list-wrapper">
        <div>
            <div class="back">
                <i class="icon-back"></i>
            </div>
            <h1 class="title" v-html="title"></h1>
        </div>
        <div class="bg-image" :style="bgStyle" ref="bgImage" id="bgImage" >
            <div class="filter" ref="filter"></div>
        </div>
        <div class="card" ref="card">
            <div class="card-item-wrapper">
                <div class="card-item" @click="clickItem(1)" :class="{'active':selectIndex===1}">主页</div>
                <div class="card-item" @click="clickItem(2)" :class="{'active':selectIndex===2}">歌曲</div>
                <div class="card-item" @click="clickItem(3)" :class="{'active':selectIndex===3}">专辑</div>
                <div class="card-item" @click="clickItem(4)" :class="{'active':selectIndex===4}">视频</div>
            </div>
        </div>
        <scroll class="list" ref="list" @onScroll="scroll" :top=230 >
            <!--主页-->
            <div class="main-page-wrapper" v-if="selectIndex===1">
                <main-page :songs="songs"></main-page>
            </div>
            <!--歌曲-->
            <div class="song-list-wrapper" v-if="selectIndex===2">
                <song-list :songs="songs" :rank="true"></song-list>
            </div>
            <!--专辑-->
            <div class="album-list-wrapper" v-if="selectIndex===3">
                <album-list></album-list>
            </div>
            <!--视频-->
            <div class="video-list-wrapper" >
                <video-list></video-list>
            </div>
        </scroll>

    </div>
</template>

<script>
  import Scroll from "../../base/scroll/scroll";
  import SongList from "../../base/songList/songList";
  import {pxToRem} from "../../assets/js/utils";
  import MainPage from "../../base/mainPage/mainPage";
  import AlbumList from "../../base/albumList/albumList";
  import VideoList from "../../base/videoList/videoList";
  export default {
    name: "myMusicList",
    components: {Scroll, SongList,MainPage,AlbumList,VideoList},
    props: {
      bgImage: String,
      songs: {
        type: Array,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: []
      },
      title: {
        type: String,
        default: ''
      }
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`;
      }
    },
    data(){
      return {
        scrollTop:0,
        selectIndex:0
      };
    },
    created() {
      /*出现莫名的错误 挂载后再设置选择Index*/
      setTimeout(()=>{
        this.selectIndex=1;
      });
    },
    methods:{
      scroll(offSetY){
        /*let val=window.innerWidth*0.7-offSetY;
        //let img=window.getComputedStyle(this.$refs.bgImage).paddingTop;
        this.$refs.bgImage.style.paddingTop=`${val}px`;*/
      },
      clickItem(index){
        this.selectIndex=index;
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "../../assets/sass/variable";
    @import "../../assets/sass/mixin";

    .music-list-wrapper {
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: $c-b;

        .back {
            position: absolute;
            top: 0;
            left: 0.16rem;
            z-index: 1000;

            .icon-back {
                display: block;
                padding: 0.267rem;
                font-size: 0.933rem;
                color: $c-b-d;
            }
        }

        .title {
            position: absolute;
            top: 0.267rem;
            left: 12%;
            width: 75%;
            text-align: center;
            line-height: 0.933rem;
            font-size: 0.933rem;
            color: $c-t;
            z-index: 1000;
            font-weight: 600;
            @include no-wrap
        }

        .bg-image {
            /*新技能*/
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 55%;
            //transform-origin: top;
            background-size: cover;
            z-index: 100;

            .filter {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(7, 17, 27, .4);
            }
        }

        .card {
            position: relative;
            width: 100%;
            z-index: 1000;
            border-bottom: 1px $color-theme solid;
            .card-item-wrapper {
                position: relative;
                z-index: 1000;
                background-color: $color-background;
                display: flex;
                align-items: center;
                justify-content: space-around;
                color: $c-t;
                border-radius: 0.7rem 0.7rem 0 0;
                .card-item {
                    font-size: 0.667rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0.4rem 0;
                    position: relative;
                    font-weight: bold;
                    &.active::after{ //.active
                        border-bottom: 0.08rem solid $c-t-s;
                        display: block;
                        content: ' ';
                        position: absolute;
                        top: 83%;
                        width: 100%;
                    }
                }
            }
        }

        .list {
            position: relative;
            top: 0;
            bottom: 0;
            width: 100%;
            background-color: $color-background;

            .song-list-wrapper {
                padding: 0.533rem 0.8rem
            }

            .loading-container {
                position: absolute;
                width: 100%;
                top: 50%;
                transform: translateY(-50%);
            }

        }

    }
</style>

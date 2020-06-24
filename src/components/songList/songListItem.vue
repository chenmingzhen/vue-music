<template>
    <transition name="fade-slide-down">
        <div class="song-list-item-wrapper">
            <div class="icon" @click="back"><i class="icon-back"></i></div>
            <div class="subscribe">收藏</div>
            <!--封面背景-->
            <div class="bg-image" :style="bgStyle" ref="bgImage">

            </div>
            <!--推动-->
            <div class="bg-layer" ref="layer"></div>
            <better-scroll class="list" ref="list" @scroll="scroll" :listen-scroll=true :probe-type=3>
                <div class="item-wrapper" ref="wrapper">
                    <song-list :songs="songList" :rank="true" @selectItem="handleSelect"></song-list>
                </div>
            </better-scroll>
        </div>
    </transition>
</template>

<script>
  import {getPlayList} from "../../api/recommend";
  import BetterScroll from "../../base/betterScroll/betterScroll";
  import {createSong} from "../../assets/js/song";
  import SongList from "../../base/songList/songList";
  import {playMixin} from "../../utils/mixin";

  export default {
    name: "songListItem",
    components: {BetterScroll, SongList},
    mixins:[playMixin],
    data() {
      return {
        dataList: {},
        scrollY: 0,
        songList: []
      };
    },
    activated() {
      this.songList = [];
      getPlayList(this.$route.query.id).then(data => {
        this.dataList = data.playlist;
        this.dataList.tracks.forEach(item => {
          createSong(item).then(data => {
            this.songList.push(data);
            this.$nextTick(() => {
              this.$refs.list.refresh();
            });
          });
        });
      });
      this.imageHeight = this.$refs.bgImage.clientHeight;
      this.minTransalteY = -this.imageHeight + 40;
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      scroll(pos) {
        this.scrollY = pos.y;
      },
      handleSelect(item,index){
        this.selectPlay({
          list:this.songList,
          index
        });
      }
    },
    computed: {
      bgStyle() {
        if (this.dataList.creator) {
          return `background-image:url(${this.dataList.coverImgUrl})`;
        }
        return ``;
      }
    },
    watch: {
      scrollY(newVal) {
        let translateY = Math.max(this.minTransalteY, newVal);
        let zIndex = 0;
        let scale = 1;
        let blur = 0;
        const percent = Math.abs(newVal / this.imageHeight);
        if (newVal > 0) {
          zIndex = 1000;
          scale = 1 + percent;
        }
        this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`;//能用
        //上面就初步可以了
        if (newVal < this.minTransalteY) {
          zIndex = 1000;
          this.$refs.bgImage.style.paddingTop = 0;
          this.$refs.bgImage.style.height = `40px`;//能用
          //this.$refs.infWrapper.style.opacity=0;
        } else {
          this.$refs.bgImage.style.paddingTop = '70%';
          this.$refs.bgImage.style.height = 0;
          //this.$refs.infWrapper.style.opacity=1;
          zIndex = 0;
        }
        this.$refs.bgImage.style['transform'] = `scale(${scale})`;
        this.$refs.bgImage.style.zIndex = zIndex.toString();
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable";
    @import "src/assets/sass/transitions";
    @import "src/assets/sass/mixin";

    .song-list-item-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 10000;
        background-color: #222;

        .icon, .subscribe {
            z-index: 5000;
            position: absolute;
            margin-top: 0.533rem;
            margin-left: 0.25rem;
        }

        .subscribe {
            right: 0.2rem;
            background-color: #ffcd32;
            padding: 0.12rem 0.8rem;
            border-radius: 0.8rem;
            font-size: 0.8rem;
        }

        .bg-image {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 70%;
            transform-origin: top;
            background-size: cover;
        }

        .bg-layer {
            position: relative;
            height: 100%;
            background: transparent;
        }

        .list {
            position: absolute;
            top: 9.0rem;
            bottom: 0;
            width: 100%;

            .item-wrapper {
                width: 100%;
                border-radius: 1.2rem 1.2rem 0 0;
                background-color: #222;

                .song-list {
                    padding: 0 0.8rem;
                }
            }
        }

    }
</style>

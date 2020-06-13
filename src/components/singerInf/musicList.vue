<template>
    <div class="music-list-wrapper">
        <div class="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <!--遮罩-->
            <div class="filter" ref="filter"></div>
        </div>
        <div class="card" ref="card">
            <div class="card-item-wrapper">
                <div class="card-item">主页</div>
                <div class="card-item">歌曲</div>
                <div class="card-item">专辑</div>
                <div class="card-item">视频</div>
            </div>
        </div>
        <div class="bg-layer" ref="layer"></div>
        <better-scroll :data="songs" class="list" ref="list" @scroll="scroll"
                       :listen-scroll="listenScroll" :probe-type="probeType">
            <div class="song-list-wrapper">
                <song-list :songs="songs"></song-list>
            </div>

        </better-scroll>
    </div>
</template>

<script>
  import Loading from "../../base/loading/loading";
  import BetterScroll from "../../base/betterScroll/betterScroll";
  import SongList from "../../base/songList/songList";
  import {pxToRem} from "../../assets/js/utils";

  const RESERVED_HEIGHT = 75;

  export default {
    name: "musicList",
    components: {/*Loading*/BetterScroll, SongList},
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
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    /*滚动条的活动范围*/
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight;
      this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT;
      this.$refs.list.$el.style.top = `${pxToRem(this.imageHeight+37)}`;//${this.imageHeight+37}px ${pxToRem(this.imageHeight)}
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`;
      }
    },
    data() {
      return {
        scrollY: 0
      };
    },
    created() {
      this.probeType = 3;
      this.listenScroll = true;
    },
    methods: {
      scroll(pos) {
        this.scrollY = pos.y;
      }
    },
    watch: {
      scrollY(newVal) {
        let translateY = Math.max(this.minTransalteY, newVal);
        let zIndex = 0;

        this.$refs.layer.style['transform'] = `translate3d(0,${pxToRem(translateY)} ,0)`;//${translateY}px  ${pxToRem(translateY)
        console.log(pxToRem(translateY),'translateY',translateY);
        if (newVal < this.minTransalteY) {
          zIndex = 1;
          this.$refs.bgImage.style.paddingTop = 0;
          this.$refs.bgImage.style.height = `${pxToRem(36)}`;  //${pxToRem(36)}
          this.$refs.card.style['transform']=`translate3d(0,${pxToRem(36)},0)`; //${pxToRem(36)}
        } else {
          this.$refs.bgImage.style.paddingTop = '70%';
          this.$refs.bgImage.style.height = 0;
          this.$refs.card.style['transform'] = `translate3d(0,${pxToRem(translateY+1)},0)`; //${translateY+1}px  ${pxToRem(translateY+1)}

        }
        this.$refs.bgImage.style.zIndex = zIndex;
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
        background:$c-b ;

        .back {
            position: absolute;
            top: 0;
            left: 0.16rem;
            z-index: 1000;

            .icon-back {
                display: block;
                padding: 0.267rem;
                font-size: 0.933rem;
                color: $color-theme;
            }
        }

        .title {
            position: absolute;
            top: 0.267rem;
            left: 12%;
            width: 80%;
            text-align: center;
            line-height: 0.933rem;
            font-size: 0.933rem;
            color: $color-text;
            z-index: 1000;
            @include no-wrap
        }

        .bg-image {
            /*新技能*/
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 70%;
            transform-origin: top;
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
            .card-item-wrapper {
                position: relative;
                z-index: 1000;
                background-color: $color-background;
                display: flex;
                align-items: center;
                justify-content: space-around;
                border-radius: 0.7rem 0.7rem 0 0;
                .card-item {
                    font-size: 0.667rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0.4rem 0;
                }
            }
        }

        .list {
            position: fixed;
            top: 0;
            bottom: 0;
            width: 100%;


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


        .bg-layer {
            position: relative;
            height: 200%;
            background: $color-background;
        }
    }
</style>

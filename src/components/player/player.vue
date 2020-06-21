<template>
    <!--添加了:key 就不卡顿了 不知道为什么-->
    <div class="player" v-show="playList.length>0">
        <transition name="normal" appear @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave"
                    @after-leave="afterLeave">
            <div class="normal-player" v-show="fullScreen">
                <div class="background">
                    <img :src="currentSong.image" alt="" style="width: 100%; height: 100%;">
                </div>
                <div class="top">
                    <div class="back" @click="back"><i class="icon-back"></i></div>
                    <h1 class="title">{{currentSong.name}}</h1>
                    <h2 class="subtitle">{{currentSong.singer}}</h2>
                </div>
                <div class="middle">
                    <div class="middle-left" ref="middleL">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd" :class="cdCls" id="cd">
                                <img class="image" :src="currentSong.image">
                            </div>
                        </div>
                        <div class="playing-lyric-wrapper">
                            <div class="playing-lyric">{{playingLyric}}</div>
                        </div>
                        <canvas class="music-cover-background" id="my-background" :key="myKey">your brower does not
                            support canvas
                        </canvas>
                    </div>
                </div>
                <div class="bottom">
                    <div class="operators">
                        <div class="icon i-left">
                            <i :class="iconMode"></i>
                        </div>
                        <div class="icon i-left" :class="disableCls" @click="prev">
                            <i class="icon-prev"></i>
                        </div>
                        <div class="icon i-center" :class="disableCls" @click="togglePlaying">
                            <i :class="playIcon"></i>
                        </div>
                        <div class="icon i-right" :class="disableCls" @click="next">
                            <i class="icon-next"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon icon-not-favorite"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="mini">
            <div class="mini-player" v-show="!fullScreen&&playList.length>0" @click="open">
                <div class="icon">
                    <img :class="cdCls" v-if="currentSong"
                         :src="currentSong.image"><!--:src="$store.state.currentSong.image"-->
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="control">
                    <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
                </div>
                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
        <audio :src="currentSong.url" ref="audio" @play="ready" @error="error" @ended="end"></audio>
    </div>
</template>

<script>
  import {playMixin} from "../../utils/mixin";
  import {createCanvas} from "../../assets/js/lonelyPlanet";
  import animations from 'create-keyframe-animation';

  export default {
    name: "player",
    mixins: [playMixin],
    data() {
      return {
        songReady: false,
        currentTime: 0,
        radius: 32,
        currentLyric: null,
        currentLineNum: 0,
        currentShow: 'cd',
        playingLyric: '',
        myKey: 0,
      };
    },
    computed: {
      cdCls() {
        return this.playing ? 'play' : 'play pause';
      },
      playIcon() {
        return this.playing ? 'icon-pause' : 'icon-play';
      },
      miniIcon() {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini';
      },
      disableCls() {
        return this.songReady ? '' : 'disable';
      }
    },
    methods: {
      back() {
        this.setFullScreen(false);
      },
      open() {
        this.setFullScreen(true);
      },
      getPositionAndScale() {
        const targetWidth = 40;
        const paddingLeft = 40;
        const paddingBottom = 30;
        const paddingTop = 80;
        const width = window.innerWidth * 0.8;
        const scale = targetWidth / width;
        const x = -(window.innerWidth / 2 - paddingLeft);
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
        return {
          x,
          y,
          scale
        };
      },
      /*animation start*/
      enter(el, done) {
        const {x, y, scale} = this.getPositionAndScale();
        let animation = {
          0: {
            transform: `translate3d(${x / 25}rem,${y / 25}rem,0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0,0,0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0,0,0) scale(1)`
          }
        };
        /*使用插件*/
        animations.registerAnimation({name: 'move', animation, presets: {duration: 700, easing: 'linear'}});
        animations.runAnimation(this.$refs.cdWrapper, 'move', done);

      },
      afterEnter() {
        animations.unregisterAnimation('move');
        this.$refs.cdWrapper.style.animation = '';
      },
      leave(el, done) {
        this.$refs.cdWrapper.style.transition = 'all .7s';
        const {x, y, scale} = this.getPositionAndScale();
        this.$refs.cdWrapper.style['transform'] = `translate3d(${x / 25}rem,${y / 25}rem,0) scale(${scale})`;
        this.$refs.cdWrapper.addEventListener('transitionend', done);
      },
      afterLeave() {
        this.$refs.cdWrapper.style.transition = '';
        this.$refs.cdWrapper.style['transform'] = '';
      },
      /*animation end*/
      /*audio start*/
      ready() {
        this.songReady = true;
      },
      error() {
        this.songReady = true;
      },
      end() {
        this.next();
      },
      next() {
        if (!this.songReady) {
          return;
        }
        if (this.playList.length === 1) {
          this.loop();
          return;
        } else {
          let index = this.currentIndex + 1;
          if (index === this.playList.length) {
            index = 0;
          }
          this.setCurrentIndex(index);
          if (!this.playing) {
            this.togglePlaying();
          }
        }
        this.songReady = false;
      },
      prev() {
        if (!this.songReady) {
          return;
        }
        if (this.playList.length === 1) {
          this.loop();
          return;
        } else {
          let index = this.currentIndex - 1;
          if (index === -1) {
            index = this.playList.length - 1;
          }
          this.setCurrentIndex(index);
          if (!this.playing) {
            this.togglePlaying();
          }
        }
        this.songReady = false;
      },
      togglePlaying(){
        if (!this.songReady) {
          return;
        }
        this.setPlaying(!this.playing);
      }
      /*audio end*/

    },

    watch: {
      fullScreen(val) {
        /*话说会重新渲染 但是好像没效果 没触发生命周期 */
        ++this.myKey;
        /*使这个操作在最后进行 否则dom报错*/
        setTimeout(() => {
          this.scene = null;
          this.scene = createCanvas();
          this.scene.run();
        });
      },
      /*通过监听vuex值 决定播放与暂停*/
      playing(newPlaying) {
        const audio = this.$refs.audio;
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause();
        });
      },
      currentSong(newSong, oldSong) {
        if (!newSong.id) {
          return;
        }
        if (newSong.id === oldSong.id) {
          return;
        }
        /*要在下次dom更新才生效*/
        this.$nextTick(()=>{
          this.$refs.audio.play();
        });
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable.scss";
    @import "src/assets/sass/mixin.scss";
    @import "src/assets/sass/transitions.scss";

    .player {
        .normal-player {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 15000;
            background-color: $color-background;

            .background {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                opacity: .6;
                /*模糊*/
                filter: blur(0.2rem);
            }

            .top {
                position: relative;
                margin-bottom: 1rem;

                .back {
                    position: absolute;
                    top: 0;
                    left: 0.24rem;
                    z-index: 50;

                    .icon-back {
                        display: block;
                        padding: 0.36rem;
                        font-size: 1.2rem;
                        color: $color-theme;
                        transform: rotate(-90deg);
                    }
                }

                .title {
                    width: 70%;
                    margin: 0 auto;
                    line-height: 1.6rem;
                    text-align: center;
                    @include no-wrap;
                    font-size: 0.8rem;
                    color: $c-t;
                }

                .subtitle {
                    line-height: 0.8rem;
                    text-align: center;
                    font-size: 0.6rem;
                    color: $c-t-s;
                }
            }

            .middle {
                position: fixed;
                width: 100%;
                top: 3.2rem;
                bottom: 6.8rem;
                white-space: nowrap;
                font-size: 0;

                .middle-left {
                    display: inline-block;
                    vertical-align: top;
                    position: relative;
                    width: 100%;
                    height: 0;
                    padding-top: 80%;

                    .cd-wrapper {
                        position: absolute;
                        left: 10%;
                        top: 0;
                        width: 80%;
                        height: 100%;

                        .cd {
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                            border: 0.4rem solid rgba(255, 255, 255, 0.1);
                            border-radius: 50%;

                            &.play {
                                animation: rotate 20s linear infinite
                            }

                            &.pause {
                                animation-play-state: paused;
                            }

                            .image {
                                position: absolute;
                                left: 0;
                                top: 0;
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                    }

                    .music-cover-background {
                        position: absolute;
                        left: -30%;
                        top: -6rem;
                        width: 23.75rem;
                        height: 23.75rem;
                        box-sizing: border-box;
                        z-index: -1;
                        /* border: 0.125rem solid #B3B3B3; */
                        border-radius: 50%;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }

            .bottom {
                position: absolute;
                bottom: 2rem;
                width: 100%;

                .operators {
                    display: flex;
                    align-items: center;

                    .icon {
                        flex: 1;
                        color: $color-theme;

                        &.disable {
                            color: $color-theme-d;
                        }
                    }

                    .i-left {
                        text-align: right;
                    }

                    .i-center {
                        padding: 0 20px;
                        text-align: center;
                    }

                    i {
                        font-size: 40px;
                    }

                    .i-right {
                        text-align: left;
                    }

                    .icon-favorite {
                        color: $color-sub-theme;
                    }
                }
            }
        }

        .mini-player {
            display: flex;
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 18000;
            width: 100%;
            height: 2.4rem;
            background: $color-highlight-background;


            .icon {
                flex: 0 0 1.6rem;
                width: 1.6rem;
                padding: 0 0.4rem 0 0.8rem;
                display: flex;
                align-items: center;

                img {
                    border-radius: 50%;
                    width: 1.6rem;
                    height: 1.6rem;
                }
            }

            .text {
                display: flex;
                flex-direction: column;
                justify-content: center;
                flex: 1;
                line-height: 0.8rem;
                overflow: hidden;

                .name {
                    margin-bottom: 0.08rem;
                    @include no-wrap();
                    font-size: 0.6rem;
                    color: $c-t;
                }

                .desc {
                    @include no-wrap();
                    font-size: 0.4rem;
                    color: $color-text-d;
                }
            }

            .control {
                flex: 0 0 1.2rem;
                width: 1.2rem;
                padding: 0 0.4rem;
                display: flex;
                align-items: center;

                .icon-play-mini, .icon-pause-mini, .icon-playlist {
                    font-size: 1rem;
                    color: #9A462A;
                }

                .icon-mini {
                    font-size: 1rem;
                    left: 0;
                    top: 0;
                }

            }
        }
    }
</style>

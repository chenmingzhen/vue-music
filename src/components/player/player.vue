<template>
    <div class="player">
        <div class="normal-player" v-show="playList.length>0">
            <div class="background">
                <img src="" alt="" style="width: 100%; height: 100%;">
            </div>
            <div class="top">
                <div class="back"><i class="icon-back"></i></div>
                <h1 class="title"></h1>
                <h2 class="subtitle"></h2>
            </div>
            <div class="middle">
                <div class="middle-left" ref="middleL">
                    <div class="cd-wrapper" ref="cdWrapper">
                        <div class="cd" :class="cdCls">
                            <img v-if="$store.state.currentSong" class="image" :src="$store.state.currentSong.image">
                            <!--:src="$store.state.currentSong.image"-->
                        </div>
                    </div>
                    <div class="playing-lyric-wrapper">
                        <div class="playing-lyric">{{playingLyric}}</div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="operators">
                     <div class="icon i-left" >
                         <i :class="iconMode"></i>
                     </div>
                    <div class="icon i-left" :class="disableCls">
                        <i class="icon-prev"></i>
                    </div>
                    <div class="icon i-center" :class="disableCls">
                        <i :class="playIcon"></i>
                    </div>
                    <div class="icon i-right" :class="disableCls">
                        <i class="icon-next"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="icon"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="mini-player" v-show="!$store.state.fullScreen&&playList>0">
            <div class="icon">
                <img v-if="$store.state.currentSong" :class="cdCls" width="40" height="40"
                     :src="$store.state.currentSong.image"><!--:src="$store.state.currentSong.image"-->
            </div>
            <div class="text">
                <h2 class="name"></h2>
                <p class="desc"></p>
            </div>
            <div class="control">
            </div>
            <div class="control">
                <i class="icon-playlist"></i>
            </div>
        </div>
    </div>
</template>

<script>
  import {playMixin} from "../../utils/mixin";

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
        playingLyric: ''
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
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable.scss";
    @import "src/assets/sass/mixin.scss";

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
                filter: blur(1rem);
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
                    font-size: 1.4rem;
                    color: $c-t;
                }

                .subtitle {
                    line-height: 0.8rem;
                    text-align: center;
                    font-size: 1.2rem;
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

                    .icon-favorite{
                        color:$color-sub-theme;
                    }
                }
            }
        }
    }
</style>

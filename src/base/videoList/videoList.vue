<template>
    <div class="video-list">
        <ul>
            <li class="item" v-for="(item,index) in videoData" :key="index">
                <div class="img-wrapper">
                    <img v-lazy="item.imgurl" alt="" class="video-img">
                    <div class="count-wrapper">
                        <i class="count-img icon-play"></i>
                        <p class="count">{{item.playCount}}</p>
                    </div>
                    <div class="duration-wrapper">
                        <img src="../../assets/image/time.png" alt="" class="duration-img">
                        <p class="duration">{{
                            _formatDuration(item.duration)}}</p>
                    </div>
                </div>
                <div class="text-wrapper">
                    <div class="title">{{item.name}}</div>
                    <div class="time" v-if="item.publishTime">
                        {{item.publishTime}}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
  import {singerMixin} from "../../utils/mixin";
  import {getSingerMv} from "../../api/singer";
  import {formatDuration} from "../../assets/js/utils";

  export default {
    name: "videoList",
    mixins: [singerMixin],
    data() {
      return {
        videoData: Array
      };
    },
    created() {
      this.initVideoData();
    },
    methods: {
      initVideoData() {
        getSingerMv(this.singer.id).then(data => {
          this.videoData = data.mvs;
        });
      },
      _formatDuration(duration) {
        return formatDuration(duration);
      }
    }

  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable.scss";
    .video-list{
        padding: 0.4rem 0.267rem;
        .item{
            &:first-child {
                padding-top: 0.05rem;
            }
            padding-top: 0.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            .img-wrapper{
                padding-right: 0.533rem;
                width: 30%;
                position: relative;
                .video-img{
                    border-radius: 0.3rem;
                    width: 100%;
                }
                .count-wrapper{
                    position: absolute;
                    top: 0.053rem;
                    display: flex;
                    right: 12%;
                    .count-img{
                        padding-right: 0.133rem;
                    }
                    .count-img,.count{
                        font-size: 0.533rem;
                        font-weight: bolder;
                    }
                }
                .duration-wrapper{
                    position: absolute;
                    width:100% ;
                    display: flex;
                    align-items: center;
                    z-index: 10;
                    top: 2.4rem;
                    .duration-img{
                        width: 20%;
                    }
                    .duration{
                        padding-top: 0.053rem;
                        font-size: 0.2rem;
                    }
                }
            }
            .text-wrapper{
                flex: 1;
                .title{
                    color: $c-t;
                    font-size: 0.533rem;
                }
                .time{
                    padding-top: 0.5rem;
                    color: rgba(255, 255, 255, .3);
                    font-size: 0.4rem;
                }
            }
        }
    }
</style>

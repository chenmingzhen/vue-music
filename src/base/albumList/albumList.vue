<template>
    <ul class="album-list">
        <li v-for="(item,index) in albumData" :key="index" class="album-item">
            <div class="img-wrapper">
                <img v-lazy="item.picUrl" alt="" class="album" >
                <img src="../../assets/image/album.png" alt="" class="card">
            </div>
            <div class="text-wrapper">
                <div class="title">{{item.name}}</div>
                <div class="detail">
                    <div class="time"> {{date(item.publishTime)}}</div>
                    <div class="size">歌曲{{item.size}}</div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
  import {singerMixin} from "../../utils/mixin";
  import {getSingerAlbum} from "../../api/singer";
  import {timestampToTime} from "../../assets/js/utils";

  export default {
    name: "albumList",
    mixins: [singerMixin],
    data() {
      return {
        albumData: Array
      };
    },
    computed: {},
    created() {
      this.initAlbum();
    },
    methods: {
      initAlbum() {
        getSingerAlbum(this.singer.id).then(data => {
          this.albumData = data.hotAlbums;
        });
      },
      date(publishTime) {
        return timestampToTime(publishTime);
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable.scss";

    .album-list {
        padding: 0.4rem 0.267rem;

        .album-item {
            &:first-child {
                padding-top: 0.05rem;
            }

            padding-top: 0.2rem;
            display: flex;
            align-items: center;
            justify-content: center;

            .img-wrapper {
                padding-right: 0.533rem;
                width: 15%;
                position: relative;

                .album {
                    border-radius: 0.3rem;
                    width: 100%;
                }

                .card {
                    position: absolute;
                    width: 70%;
                    top: 10%;
                    right: -2%;
                    z-index: -1;
                }
            }

            .text-wrapper {
                flex: 1;

                .title {
                    color: $c-t;
                    font-size: 0.533rem;
                }

                .detail {
                    padding-top: 0.267rem;
                    color: rgba(255, 255, 255, .3);
                    font-size: 0.4rem;
                    display: flex;
                    justify-content: space-between;
                    .time{

                    }
                    .size{
                        padding-right: 7rem;
                    }
                }
            }
        }

    }
</style>

<template>
    <transition name="fade-slide-right">
        <div class="song-list-wrapper">
            <div class="header">
                <div class="icon" @click="back">
                    <i class="icon-back"></i>
                </div>
                <div class="title">{{title}}</div>
            </div>
            <better-scroll v-if="this.playLists.length" class="list" ref="list">
                <div class="item-wrapper" >
                    <div class="item" v-for="(item,index) in playLists" :key="index" @click="goToSongListItem(item)">
                        <div class="img"><img v-lazy="item.coverImgUrl||item.picUrl" alt=""></div>
                        <div class="list-title">{{item.name}}</div>
                    </div>
                    <div style="opacity: 0">_</div>
                </div>
            </better-scroll>
        </div>
    </transition>
</template>

<script>
  import BetterScroll from "../../base/betterScroll/betterScroll";
  import {getOfficialColumn, getExcellentColumn, getCategoryColumn} from "../../api/recommend";

  export default {
    name: "songList",
    components: {BetterScroll},
    data() {
      return {
        playLists: []
      };
    },
    computed: {
      title() {
        return this.$route.query.title;
      }
    },
    activated() {
      this.playLists=[];
      const limit = 60;
      switch (this.$route.query.title) {
      case '官方推荐':
        getOfficialColumn(limit).then(data => {
          this.playLists = data.result;
        });
        break;
      case '达人推荐':
        getExcellentColumn(limit).then(data => {
          this.playLists = data.playlists;
        });
        break;
      case '华语推荐':
        getCategoryColumn(limit).then(data => {
          this.playLists = data.playlists;
        });
        break;
      case '欧美推荐':
        getCategoryColumn(limit,'欧美').then(data => {
          this.playLists = data.playlists;
        });
        break;
      case '流行推荐':
        getCategoryColumn(limit,'流行').then(data => {
          this.playLists = data.playlists;
        });
        break;
      case '古典推荐':
        getCategoryColumn(limit,'古典').then(data => {
          this.playLists = data.playlists;
        });
        break;
      default:
        getOfficialColumn(limit).then(data => {
          this.playLists = data.result;
        });
        break;
      }
    },
    beforeRouteEnter(to, from, next) {
      if (!to.query.title) {
        next(false);
      } else {
        next();
      }
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      goToSongListItem(item){
        this.$router.push({path:'/songListItem',query:{id:item.id}});
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable";
    @import "src/assets/sass/transitions";
    .song-list-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 10000;
        background-color: $c-b-d;
        .header {
            position: relative;
            z-index: 10000;
            margin-top: 0.4rem;
            margin-left: 0.2rem;
            display: flex;
            .icon {
                .icon-back {

                }
            }
        }

        .list {
            position: absolute;
            top: 1.48rem;
            bottom: 0;
            width: 100%;
            z-index: 9999;
            padding: 0.2rem 0.2rem;
            overflow: hidden;
            .item-wrapper {
                .item {
                    padding-top: 0.3rem;
                    display: flex;
                    align-items: center;
                    height: 1.5rem;
                    .img {
                        display: flex;
                        width: 10%;
                        background-color: $c-b-d;
                        border-radius: 0.15rem;
                        img{
                            width: 100%;
                        }
                    }

                    .list-title {
                        font-size: 0.4rem;
                        padding-left: 0.6rem;
                    }
                }
            }
        }


    }
</style>

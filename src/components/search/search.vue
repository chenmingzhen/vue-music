<template>
    <div class="search-wrapper">
        <div class="top">
            <div class="search">
                <i class="icon-search"></i>
                <label>
                    <input ref="input" @keyup.enter="findSearch" type="text" placeholder="搜索歌曲" v-model="content">
                </label>
                <i class="icon-dismiss" v-show="content" @click="clearSearch"></i>
            </div>
        </div>
        <div class="hot-search" v-if="!searchResult.length&&!searching">
            <div class="title">热门搜索</div>
            <div class="wrapper">
                <div class="hot-item" v-for="(item,index) in hotSearch" :key="index" @click="clickHot(item)">{{item}}
                </div>
            </div>
        </div>
        <loading v-if="searching" class="loading"></loading>
        <scroll :top="150" ref="scroll" class="search-content" :bottom="0" v-if="searchResult&&!searching">
            <song-list :songs="searchResult" :rank="true" @selectItem="handleSelect"></song-list>
        </scroll>
    </div>
</template>

<script>
  import {getHotSearch, getSearch} from "../../api/search";
  import {getSong} from "../../api/singer";
  import Scroll from "../../base/scroll/scroll";
  import {Song} from "../../assets/js/song";
  import SongList from "../../base/songList/songList";
  import Loading from "../../base/loading/loading";
  import {playMixin} from "../../utils/mixin";
  export default {
    name: "search",
    components: {Scroll,SongList,Loading},
    mixins:[playMixin],
    data() {
      return {
        content: '',
        hotSearch: [],
        searchResult: [],
        searching:false
      };
    },
    created() {
      getHotSearch().then(data => {
        data.result.hots.forEach(item => {
          this.hotSearch.push(item.first);
        });

      });
    },
    methods: {
      findSearch() {
        this.searchResult=[];
        this.searching=true;
        getSearch({keywords: this.content}).then(data => {
          data.result.songs.forEach((item) => {
            let _url;
            getSong(item.id).then(data=>{
              _url=data.data[0].url;
              this.searchResult.push(
                new Song({id: item.id, name: item.name,ar:this.filterSinger(item.artists),
                          al:item.album,dt:item.duration,url:_url})
              );
              this.searching=false;
            });
          });
        }).catch(e => {
          console.log(e);
        });
      },
      filterSinger(singer) {
        let ret = [];
        if (!singer) {
          return '';
        }
        singer.forEach(item => {
          ret.push(item.name);
        });
        return ret.join('/');
      },
      clearSearch() {
        this.content = '';
      },
      clickHot(item) {
        this.content = item;
        this.$refs.input.focus();
      },
      handleSelect(item,index){
        this.selectPlay({
          list:this.searchResult,
          index
        });
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable.scss";

    .search-wrapper {
        padding: 0 0.4rem;

        .top {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            width: 100%;
            padding: 0.32rem 0.16rem;
            height: 1.067rem;
            background: #333;
            border-radius: 0.16rem;
            margin: 0.5rem 0;

            .search {
                display: flex;
                align-items: center;
                position: relative;
                width: 100%;
                .icon-search {
                    font-size: 0.853rem;
                    color: #222;
                }

                input {
                    position: relative;
                    bottom: 0.1rem;
                    flex: 1;
                    margin: 0 0.133rem;
                    background: #333;
                    color: #666666;
                    font-size: 0.5rem;
                    outline: 0;
                }

                .icon-dismiss {
                    position: absolute;
                    font-size: 0.853rem;
                    color: #222;
                    top: 0.08rem;
                    right: 0;
                }
            }
        }

        .hot-search {
            margin-top: 1rem;

            .title {
                margin-left: 0.2rem;
                color: #EEA84E;
                font-weight: bold;
            }

            .wrapper {
                margin-top: 0.4rem;
                display: flex;
                flex-wrap: wrap;
                align-items: center;

                .hot-item {
                    padding: 0.2rem 0.4rem;
                    margin: 0.1rem 0.2rem;
                    background-color: #333;
                    border-radius: 0.8rem;
                    font-size: 0.533rem;
                    color: hsla(0, 0, 100%, .5);
                    font-weight: 600;
                }
            }
        }


        .search-content {
            height: 22rem !important;
        }
    }
</style>

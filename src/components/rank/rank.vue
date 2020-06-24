<template>
    <scroll ref="scroll" class="recommend-content" :top=64.9>
        <div class="rank-wrapper" v-if="rankData.length">
            <div class="rank-item" v-for="(item,index) in rankData" :key="index" @click="showHide(index)">
                <div class="header-wrapper">
                    <div class="img"><img v-lazy="item.coverImgUrl" alt=""></div>
                    <div>
                        <div class="text-wrapper">{{item.name}}</div>
                        <div class="tag-wrapper">
                            <div class="tag" v-for="(item,index) in item.tags" :key="index">
                                {{item}}
                            </div>
                        </div>
                    </div>
                    <div class="icon-wrapper"><i></i></div>
                </div>
                <div class="song-list">
                    <ul class="ul">
                        <li class="item" v-for="(song,_index) in songData[index]" :key="_index" @click="handleSelect(song,_index,index)">
                            <div class="rank">{{_index+1}}.</div>
                            <div class="content">
                                <h2 class="name">{{song.name}}</h2>
                                <p class="desc">{{getDesc(song)}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <loading v-else></loading>
    </scroll>
</template>

<script>
  import {getRank} from "../../api/singer";
  import {createSong} from "../../assets/js/song";
  import Scroll from "../../base/scroll/recommendScroll";
  import Loading from "../../base/loading/loading";
  import {playMixin} from "../../utils/mixin";
  export default {
    name: 'rank',
    components: {Scroll,Loading},
    mixins:[playMixin],
    data() {
      return {
        rankData: [],
        songData: []
      };
    },
    created() {
      this.initRank();
    },
    methods: {
      initRank() {
        (async () => {
          for (let i = 0; i < 10; i++) {
            await (() => {
              return new Promise(res => {
                getRank(i).then(data => {
                  this.rankData.push(data.playlist);
                  if (this.rankData[i].tracks) {
                    let arr = [];
                    this.rankData[i].tracks.forEach((item, index) => {

                      if (index > 9) return;
                      createSong(item).then(data => {
                        arr.push(data);
                      }).catch(e => console.log(e));
                    });
                    this.songData.push(arr);
                  }
                  res();
                }).catch(e => {
                });
              });
            })();
          }
        })();
      },
      getDesc(song) {
        return `${song.singer}·${song.album.name}`;
      },
      showHide(index,fromSelf=false) {    //点击展开收起
        let item = document.getElementsByClassName('ul')[index];    //这里我们通过参数index来让浏览器判断你点击的是哪一个列表
        let height = item.getBoundingClientRect().height;	//获取页面元素的当前高度
        //document.getElementsByTagName('i')[index].style.transform = height ? 'rotateX(0deg)' : 'rotateX(180deg)';
        if (height) {
          //收缩
          item.style.height = height + 'px';
          let f = document.body.offsetHeight;	//强制相应dom重绘，使最新的样式得到应用
          item.style.height = '0px';
        } else {
          //展开
          if(fromSelf){
            return;
          }
          item.style.height = 'auto';
          height = item.getBoundingClientRect().height;
          item.style.height = '0';
          let f = document.body.offsetHeight;
          item.style.height = height + 'px';
          for(let i=0;i<10;i++){
            if(i===index)return;
            this.showHide(i,true);
          }
          this.$refs.scroll.scrollTo(0,596*index);
          console.log(index);
        }

      },
      handleSelect(song,_index,index){
        this.selectPlay({
          list:this.songData[index],
          index:_index
        });
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "../../assets/sass/variable";
    @import "../../assets/sass/mixin";

    .rank-wrapper {
        padding: 0.2rem 0.45rem;

        .rank-item {
            margin-top: 1rem;

            &:first-child {
                margin-top: 0.2rem;
            }

            .header-wrapper {
                border-radius: 0.8rem;
                display: flex;
                //justify-content: space-around;
                align-items: center;
                background-color: $c-b;

                .img {
                    width: 20%;
                    padding: 0.267rem 0.5rem ;
                    img {
                        border-radius: 0.2rem;
                        width: 100%;
                    }
                }

                div {
                    .text-wrapper {
                        width: 8rem;
                        text-align: center;
                        font-size: 1rem;
                        font-weight: 400;
                        color: $c-t;
                    }

                    .tag-wrapper {
                        box-sizing: border-box;
                        padding-top: 0.533rem;
                        display: flex;
                        align-items: center;

                        .tag {
                            padding: 0.267rem 0.533rem;
                            margin-right: 0.533rem;
                            background-color: $c-t-s;
                            font-size: 0.4rem;
                            border-radius: 0.4rem;
                        }
                    }
                }

                .icon-wrapper {

                }
            }

            .song-list {
                .ul {
                    height: 0;
                    overflow: hidden;
                    transition: height .7s;

                    .item {
                        border-radius: 0.533rem;
                        margin-top: 0.267rem;
                        display: flex;
                        align-items: center;
                        font-size: $font-size-medium;
                        padding: 0 0.3rem;
                        background-color: rgba(118, 111, 92, .2);

                        .rank {
                            text-align: center;
                            flex-basis: 10%;
                            color: $color-theme;
                            font-size: 0.8rem;
                        }

                        .content {
                            flex: 1;
                            line-height: 0.533rem;

                            .name {
                                @include no-wrap;
                                color: #DD9B6B; /**/
                                font-size: 0.6rem;
                                line-height: 1rem;
                            }

                            .desc {
                                text-overflow: ellipsis;
                                overflow: hidden;
                                margin-top: 0.2rem;
                                color: $color-text-d; /**/
                                padding-bottom: 0.1rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>

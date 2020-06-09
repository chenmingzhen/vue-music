<template>
    <div class="recommend" ref="recommend">
        <scroll ref="scroll" class="recommend-content" :top=64.9>
            <!--当有数据的时候再渲染-->
            <div class="slider-wrapper" ref="sliderWrapper" v-if="recommends.length">
                <slider>
                    <div v-for="item in recommends" :key="item.url">
                        <a :href="item.url">
                            <!--样式由slider处理-->
                            <img :src="item.pic">
                        </a>
                    </div>
                </slider>
            </div>
            <div class="column-wrapper" v-if="officialColumn.length">
                <column :columnData="officialColumn"></column>
            </div>
            <div class="column-wrapper" v-if="excellentColumn.length">
                <column :columnData="excellentColumn"></column>
            </div>
            <div class="column-wrapper" v-if="asiaHighQualityColumn.length">
                <column :columnData="asiaHighQualityColumn"></column>
            </div>
            <div class="column-wrapper" v-if="europeHighQualityColumn.length">
                <column :columnData="europeHighQualityColumn"></column>
            </div>
            <div class="column-wrapper" v-if="popHighQualityColumn.length">
                <column :columnData="popHighQualityColumn"></column>
            </div>
            <div class="column-wrapper" v-if="classicalHighQualityColumn.length">
                <column :columnData="classicalHighQualityColumn"></column>
            </div>
            <!--copyright-->
            <div class="copyright-wrapper">
                <div class="copyright">
                    <img src="../../../public/musical.png" alt="">
                    <p>Wind Music</p>
                </div>
                <p class="copyright_text1">Copyright © 2020 - ~ ChenMingZhen All Rights Reserved</p>
                <p class="copyright_text2">Wechat: mz-21416451 GitHub: <a
                        href="https://github.com/chenmingzhen/vue-music">github.io</a></p>
            </div>
        </scroll>
        <Toast :text="toastText" v-if="toastShow" @destroy="toastVisible"></Toast>
    </div>
</template>

<script>
  import Slider from "../../base/slider/slider";
  import {getBanner, getOfficialColumn, getExcellentColumn, getCategoryColumn} from '../../api/recommend.js';
  import Column from "../../base/column/column";
  import Scroll from "../../base/scroll/scroll";
  import {eventBus} from "../../main";
  import Toast from "../../base/toast/toast";
  export default {
    name: "recommend",
    data() {
      return {
        recommends: [],
        officialColumn: [],
        excellentColumn: [],
        asiaHighQualityColumn: [],
        europeHighQualityColumn: [],
        popHighQualityColumn: [],
        classicalHighQualityColumn: [],
        toastText:'刷新失败',
        toastShow:false
      };
    },
    created() {
      this.initBanner();
      this.initColumn();
      /*刷新*/
      eventBus.$on('refreshData', () => {
        Promise.all([this.initBanner(), this.initColumn()]).then(() => {
          //下滑刷新隐藏 位置回调
          eventBus.$emit('refreshDone');
        }).catch(e=>{
          this.toastVisible();
          console.log(this.toastShow);
        });
      });
    },
    methods: {
      initBanner() {
        return new Promise((resolve,reject) => {
          getBanner().then(data => {
            this.recommends = data.banners;
            resolve();
          }).catch(e => {
            reject(e);
          });
        });
      },
      initColumn() {
        return new Promise((resolve,reject) => {
          /*官推*/
          getOfficialColumn(9).then(data => {
            this.officialColumn = data.result;
            //this.officialColumn["title"] = '官方推荐';
            this.$set(this.officialColumn, 'title', "官方推荐");
          }).catch(e => {
            reject(e);
          });
          /*达人*/
          getExcellentColumn(9).then(data => {
            this.excellentColumn = data.playlists;
            this.excellentColumn["title"] = '达人推荐';
          }).catch(e => {
            reject(e);
          });
          /*华语*/
          getCategoryColumn(9, '华语').then(data => {
            this.asiaHighQualityColumn = data.playlists;
            this.asiaHighQualityColumn["title"] = '华语推荐';
          }).catch(e => {
            reject(e);
          });
          /*古典*/
          getCategoryColumn(9, '古典').then(data => {
            this.classicalHighQualityColumn = data.playlists;
            this.classicalHighQualityColumn["title"] = '古典推荐';
          }).catch(e => {
            reject(e);
          });
          /*欧美*/
          getCategoryColumn(9, '欧美').then(data => {
            this.europeHighQualityColumn = data.playlists;
            this.europeHighQualityColumn["title"] = '欧美推荐';
          }).catch(e => {
            reject(e);
          });
          /*流行*/
          getCategoryColumn(9, '流行').then(data => {
            this.popHighQualityColumn = data.playlists;
            this.popHighQualityColumn["title"] = '流行推荐';
          }).catch(e => {
            reject(e);
          });
          resolve();
        });
      },
      toastVisible(){
        this.toastShow=!this.toastShow;
        setTimeout(()=>{
          this.toastShow=!this.toastShow;
        },2000);
      }
    },
    components: {
      Slider,
      Column,
      Scroll,
      Toast
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable.scss";

    .recommend {
        position: fixed;
        width: 100%;
        top: 2.347rem;
        bottom: 0;

        .recommend-content {
            z-index: 10;

            .slider-wrapper {
                position: relative;
                width: 100%;
                overflow: hidden;
            }

            .copyright-wrapper {
                margin-top: 1.6rem;
                margin-bottom: 3.2rem;
                border-top: #7e8c8d 0.027rem solid;
                padding-top: 0.8rem;
                width: 100%;

                .copyright {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0 1rem;

                    img {
                        padding-right: 0.5rem;
                        width: 7%;
                    }

                    p {
                        color: $color-theme;
                        font-size: $font-size-large-x;
                        font-weight: bold;
                    }
                }

                .copyright_text1 {
                    margin-top: 0.4rem;
                    text-align: center;
                    font-size: $font-size-large;
                }

                .copyright_text2 {
                    margin-top: 0.4rem;
                    text-align: center;
                    font-size: $font-size-large;

                    a {
                        color: $color-theme;
                        font-size: $font-size-large;
                    }
                }
            }
        }
    }
</style>

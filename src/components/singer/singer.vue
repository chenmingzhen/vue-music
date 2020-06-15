<template>
    <div class="singer-wrapper">
        <div class="select-wrapper">
            <my-select :data="categoryData" @select="selectFromCategory" :select-item="selectList.category"></my-select>
            <my-select :data="areaData" @select="selectFromArea" :select-item="selectList.area"></my-select>
        </div>
        <scroll ref="scroll" :top=153.3 :bottom=-10 class="scroll">
            <div class="singer-wrapper" v-if="singerData.length">
                <singer-item v-for="(item,index) in singerData" :key="index" :data="item"
                             @selectItem="handleSelect"></singer-item>
            </div>
            <Loading class="loading-wrapper" :text="String('加载中...')"
                     v-else-if="!singerData.length&&fail===0"></Loading>
            <fail class="fail-wrapper" v-else :text="String('加载失败')">
            </fail>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
  import {getSinger} from "../../api/singer";
  import Scroll from "../../base/scroll/scroll";
  import MySelect from "../../base/select/singSelect";
  import SingerItem from "../../base/singerItem/singerItem";
  import NProgress from 'nprogress';
  import '../../assets/sass/nprogress.scss';
  import Loading from "../../base/loading/loading";
  import Fail from "../../base/fail/fail";
  import {singerMixin} from "../../utils/mixin";

  NProgress.configure({showSpinner: false, parent: '.scroll'});
  export default {
    name: "singer",
    components: {Scroll, MySelect, SingerItem, Loading, Fail},
    mixins: [singerMixin],
    data() {
      return {
        categoryData: {title: '分类:', list: ['全部', '男歌手', '女歌手', '乐队组合']},
        areaData: {title: '语种:', list: ['全部', '华语', '欧美', '日本', '韩国', '其他']},
        selectList: {category: 0, area: 0},
        singerData: {},
        selectIndex: {categoryIndex: -1, areaIndex: -1},
        fail: 0
      };
    },
    created() {
      this.initSinger({});
    },
    methods: {
      initSinger({type = this.selectIndex.categoryIndex, area = this.selectIndex.areaIndex}) {
        getSinger({type, area}).then(data => {
          this.singerData = data.artists;
          NProgress.done();
          //this.$refs.scroll.scrollTo(0,0);
        }).catch(e => {
          NProgress.done();
          this.fail = -1;
          console.log(e);
        });
      },
      selectFromCategory(index) {
        this.fail = 0;
        this.startProgress();
        this.selectList.category = index;
        if (index === 0) {
          index === -1;
        }
        this.singerData = {};
        this.selectIndex.categoryIndex = index;
        this.initSinger({});
      },
      selectFromArea(index) {
        this.fail = 0;
        this.startProgress();
        switch (index) {
        case 0:
          this.selectIndex.areaIndex = -1;
          break;
        case 1:
          this.selectIndex.areaIndex = 7;
          break;
        case 2:
          this.selectIndex.areaIndex = 96;
          break;
        case 3:
          this.selectIndex.areaIndex = 8;
          break;
        case 4:
          this.selectIndex.areaIndex = 16;
          break;
        case 5:
          this.selectIndex.areaIndex = 0;
          break;
        }
        this.singerData = {};
        this.selectList.area = index;
        this.initSinger({});
      },
      startProgress() {
        /*因为parent是在本文件 未加载完毕 要使用栈 让这里最后执行*/
        setTimeout(() => {
          NProgress.start();
        });
      },
      handleSelect(singer) {
        this.setSinger(singer);
        this.$router.push({path: `/singer/singerDetail${singer.id}`});
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable.scss";

    .singer-wrapper {
        box-sizing: border-box;
        padding: 0.08rem 0.533rem;

        .select-wrapper {
            .category-wrapper {
                &:last-child {
                    border-bottom: 1px gray solid;
                    padding-bottom: 0.267rem;
                }

                margin-top: 0.533rem;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .title {
                    font-size: 0.8rem;
                    color: $color-theme;
                    font-weight: bolder;
                }

                .content {
                    flex: 1;

                    ul {
                        display: flex;
                        align-items: center;
                        justify-content: space-around;

                        .item {
                            text-align: center;
                            font-size: 0.6rem;
                            color: rgba(255, 255, 255, .7);
                            padding: 0.1rem 0.2rem;
                        }

                        .active {
                            border-radius: 0.2rem;
                            border: 0.06rem solid $color-theme;
                            background-color: $color-theme;
                            color: black;
                        }
                    }
                }
            }
        }

        .scroll {
            .loading-wrapper {
                font-size: 0.8rem;
                color: #ffcd32;
            }
        }
    }
</style>

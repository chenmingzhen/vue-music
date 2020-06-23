<template>
    <div class="column-wrapper">
        <div class="text-wrapper">
            <div class="title">{{columnData.title}}</div>
            <div class="more" @click="toSongList">更多></div>
        </div>
        <div class="list" @touchmove="_columnMove" @touchend="_columnEnd">
            <div class="list-item" v-for="(item,index) in columnData" :key="index">
                <div class="img">
                    <a>
                        <img v-lazy="item.picUrl||item.coverImgUrl" alt="">
                    </a>
                </div>
                <div class="content">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
  import {recommendMixin} from "../../utils/mixin";

  export default {
    name: "column",
    mixins: [recommendMixin],
    props: {
      columnData: {
        type: Array,
        default: null
      }
    },
    methods: {
      _columnMove() {
        this.setColumnMove(true);
      },
      _columnEnd() {
        this.setColumnMove(false);
      },
      toSongList() {
        this.$router.push({path:'/moreSongList',query:{title:this.columnData.title}});
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable";
    @import "src/assets/sass/mixin";

    .column-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: .4rem .5rem;

        .text-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: .4rem 1rem .4rem .25rem;
            box-sizing: border-box;

            .title {
                font-weight: bold;
                flex: 0 1 auto;
                color: $color-theme;
                font-size: 0.9rem;
            }

            .more {
                font-size: 0.64rem;
                flex: 0 1 auto;
                border: 0.12rem solid $color-theme;
                border-radius: 0.8rem;
                padding: 0.2rem 0.6rem;
            }
        }

        .list {
            overflow-x: scroll;
            white-space: nowrap;
            width: 100%;
            /*柔顺*/
            -webkit-overflow-scrolling: touch;
            overflow-y: hidden;

            .list-item {
                display: inline-block;
                flex-direction: column;
                width: 33%;
                margin-right: 0.533rem;

                .img {
                    img {
                        width: 100%;
                        border-radius: 0.8rem;
                        /*不明原因部分图片高 部分低 用这个办法限制住*/
                        max-height: 5rem;
                        min-height: 5rem;
                    }
                }

                .content {
                    margin-top: 0.267rem;
                    font-size: 0.52rem;
                    @include ellipsis();
                }
            }
        }

        .list::-webkit-scrollbar {
            display: none;
        }
    }
</style>

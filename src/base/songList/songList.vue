<template>
    <div class="song-list">
        <ul>
            <li class="item" v-for="(song,index) in songs" :key="index" @click="selectItem(song,index)">
                <div class="rank" v-if="rank">{{index+1}}.</div>
                <div class="album" v-if="album"><img v-lazy="song.album.picUrl" alt=""></div>
                <div class="content">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: "songList",
    props: {
      songs: {
        type: Array,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      },
      album:{
        type: Boolean,
        default: false
      }
    },
    methods:{
      getDesc(song){
        return `${song.singer}·${song.album.name}`;
      },
      selectItem(item,index){
        this.$emit('selectItem',item,index);
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "../../assets/sass/variable";
    @import "../../assets/sass/mixin";
    .song-list{
        .item{
            margin-top: 0.267rem;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            height: 1.707rem;
            font-size: $font-size-medium;
            .rank{
                flex-basis: 10%;
                color: $color-theme;
                font-size: 0.8rem;
            }
            .album{
                width: 15%;
                box-sizing: border-box;
                padding: 0 0.267rem;
                img{
                    width: 100%;
                }
            }
            .content{
                flex: 1;
                line-height: 0.533rem;
                overflow: hidden;
                .name{
                    @include no-wrap;
                    color: #DD9B6B;/**/
                    font-size: 0.6rem;
                    line-height: 1rem;
                }
                .desc{
                    @include no-wrap;
                    margin-top: 0.107rem;
                    color: $color-text-d;/**/
                }
            }
        }
    }
</style>

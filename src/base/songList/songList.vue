<template>
    <div class="song-list">
        <ul>
            <li class="item" v-for="(song,index) in songs" :key="index">
                <div class="rank"></div>
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
      }
    },
    methods:{
      getDesc(song){
        return `${song.singer}·${song.album.name}`;
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "../../assets/sass/variable";
    @import "../../assets/sass/mixin";
    .song-list{
        .item{
            display: flex;
            align-items: center;
            box-sizing: border-box;
            height: 1.707rem;
            font-size: $font-size-medium;
            .content{
                flex: 1;
                line-height: 0.533rem;
                overflow: hidden;
                .name{
                    @include no-wrap;
                    color: $color-text;/**/
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

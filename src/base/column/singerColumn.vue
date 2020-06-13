<template>
    <div class="column-wrapper">
        <div class="list">
            <div class="list-item" v-for="(item,index) in columnData" :key="index">
                <div class="flex-wrapper">
                    <div class="img">
                        <a>
                            <img v-lazy="item.picUrl||item.coverImgUrl" alt="">
                        </a>
                    </div>
                    <div class="content">{{item.name}}</div>
                    <div class="subscribe">{{isSubscribe}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {singerMixin} from "../../utils/mixin";
  import {getSimilarSinger} from "../../api/singer";
  export default {
    name: "singerColumn",
    data(){
      return{
        subscribe:false,
        columnData:Array
      };
    },
    mounted() {
      setTimeout(()=>{
        getSimilarSinger(this.singer.id).then(data=>{
          this.columnData=data.artists;
        }).catch(e=>{
          console.log('singerColumnError');
        });
      });
    },
    computed:{
      isSubscribe(){
        return this.subscribe===true?'取消关注':'关注';
      }
    },
    mixins:[singerMixin]
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable";
 .column-wrapper{
     width: 100%;

     .list{
         overflow-x: scroll;
         white-space: nowrap;
         width: 100%;
         -webkit-overflow-scrolling: touch;
         overflow-y: hidden;

         .list-item{
             display: inline-block;
             width: 25%;
             height: 4.447rem;
             background-color:$c-b-d;
             margin-right: 0.533rem;
             .flex-wrapper{
                 display: flex;
                 flex-direction: column;
                 justify-content: center;
                 align-items: center;
                 .img{
                     img{
                         border-radius: 50%;
                         width: 50%;
                     }
                 }
                 .content{
                     flex: 1;
                     font-size: 0.533rem;
                 }
                 .subscribe{
                     flex: 1;
                     font-size: 0.4rem;
                 }
             }
         }
     }
     .list::-webkit-scrollbar {
         display: none;
     }
 }
</style>

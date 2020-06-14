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
             width: 33%;
             height: 4.447rem; //4.447
             background-color: rgba(154,70,42,.1);

             border-radius: 0.533rem;
             margin-right: 1.2rem;
             .flex-wrapper{
                 display: flex;
                 flex-direction: column;
                 justify-content: center;
                 align-items: center;
                 width: 100%;
                 height: 100%;
                 flex-wrap: wrap;
                 overflow: hidden;
                 .img{
                     flex: 1;
                     img{
                         padding-top: 0.2rem;
                         border-radius: 50%;
                         width: 2rem;
                         height: 2rem;
                     }
                 }
                 .content{
                     flex: 1;
                     padding-top: 0.267rem;
                     font-size: 0.373rem;
                     font-weight: 800;
                     line-height: 0.3rem;
                     color: #D09B6B;

                 }
                 .subscribe{
                     padding: 0.25rem;
                     font-size: 0.4rem;
                     background-color: $c-t-s;
                     border-radius: 0.533rem;
                 }
             }
         }
     }
     .list::-webkit-scrollbar {
         display: none;
     }
 }
</style>

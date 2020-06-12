<template>
    <div class="item-wrapper" @click="selectItem">
        <div class="img"><img v-lazy="data.picUrl" ></div>
        <div class="name-wrapper">
            <div class="name">{{data.name}}</div>
            <div class="trans" v-if="data.trans">{{data.trans}}</div>
        </div>
    </div>
</template>

<script>

  export default {
    name: "singerItem",
    props:{
      data:{
        type:Object,
        default:null
      }
    },
    methods:{
      selectItem(){
        this.$emit('selectItem',this.data);
      }
    }
  };
</script>

<style scoped lang="scss">
    .item-wrapper{
        box-sizing: border-box;
        //padding: 0 0.8rem 0 0.2rem;
        margin-top: 0.533rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .img{
            flex: 0;
            img{
                width: 2.667rem;
                height: 2.667rem;
                border-radius: 50%;
                font-size: 0.267rem;
            }
        }
        .name-wrapper{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .name{
                flex: 1;
                //text-align: center;
                font-size: 0.8rem;
                color: wheat;
            }
            .trans{
                margin-top: 0.4rem;
                flex: 1;
                color: #7e8c8d;
                font-size: 0.6rem;
            }
        }
    }
</style>

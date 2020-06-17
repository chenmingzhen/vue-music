<template>
    <div class="m-header">
        <div class="icon"></div>
        <h1 class="text">Wind Music</h1>
        <div class="me-wrapper" @click="goToMePage">
            <i class="icon-mine" v-if="!img"></i>
            <img v-lazy="img" alt="" v-if="img">
        </div>
    </div>
</template>

<script>
  import {userMixin} from "../../utils/mixin";

  export default {
    name: "m-header",
    mixins:[userMixin],
    methods:{
      goToMePage(){
        this.$router.push('/login');
      }
    },
    data(){
      return{
        img:''
      };
    },
    watch:{
      user(){
        this.img=this.user.data.profile.avatarUrl;
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable";
    @import "src/assets/sass/mixin";

    .m-header {
        position: relative;
        height: 1.173rem;
        text-align: center;
        color: $color-theme;
        font-size: 0;
        background-color: $color-background;
        z-index: 1000;
        .icon {
            display: inline-block;
            vertical-align: top;
            margin-top: 0.16rem;
            width: 0.8rem;
            height: 0.853rem;
            margin-right: 0.24rem;
            background-image: url("./musical.png");
            background-size: 0.8rem 0.8rem;
        }

        .text {
            display: inline-block;
            vertical-align: top;
            line-height: 1.173rem;
            font-size: 0.8rem;
        }

        .me-wrapper{
            position: absolute;
            top: 0.16rem;
            right: 0.213rem;
            border-radius: 50%;
            width: 0.8rem;
            height: 0.8rem;
            border: 0.053rem #EEA84E solid;
            .icon-mine{
                font-size: 0.7rem;
            }
            img{
                border-radius: 50%;
                width: 100%;
                height: 100%;
            }
        }
    }
</style>

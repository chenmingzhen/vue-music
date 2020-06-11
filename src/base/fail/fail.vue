<template>
    <div class="fail-wrapper">
        <div class="img"><img v-lazy="" alt=""></div>
        <div class="text">{{text}}</div>
    </div>
</template>

<script>
  export default {
    name: "fail",
    props:{
      text:String
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable.scss";
    .fail-wrapper{
        display: flex;
        align-items: center;
        justify-content: center;

        flex-direction: column;
        .img{
            width: 25%;
            height: 25%;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text{
            margin-top: 0.8rem;
            color: $color-theme;
            font-size: $font-size-large-x;
        }
    }
</style>

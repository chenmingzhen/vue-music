<template>
    <div class="m-header">
        <div class="icon"></div>
        <h1 class="text">Wind Music</h1>
    </div>
</template>

<script>
  export default {
    name: "m-header"
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
    }
</style>

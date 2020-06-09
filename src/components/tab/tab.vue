<template>
    <div class="tab">
        <router-link class="tab-item" tag="div" to="/recommend"><span class="tab-link">推荐</span></router-link>
        <router-link class="tab-item" tag="div" to="/singer"><span class="tab-link">歌手</span></router-link>
        <router-link class="tab-item" tag="div" to="/rank"><span class="tab-link">排行</span></router-link>
        <router-link class="tab-item" tag="div" to="/search"><span class="tab-link">搜索</span></router-link>
    </div>
</template>

<script>
  export default {
    name: "tab"
  };
</script>

<style scoped lang="scss">
    @import "./src/assets/sass/variable";
    .tab{
        display: flex;
        height: 1.173rem;
        line-height: 1.173rem;
        font-size: $font-size-large-x;
        background-color: $color-background;
        z-index: 1000;
        position: relative;
        .tab-item{
            flex: 1;
            text-align: center;
            .tab-link{
                padding-bottom: 0.133rem;
                color: $color-text-l;
            }
            &.router-link-active{
                .tab-link{
                    color: $color-theme;
                    border-bottom: 0.053rem solid $color-theme;
                }
            }
        }
    }
</style>

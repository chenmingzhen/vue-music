<template>
    <div class="self-wrapper">
        <div class="icon" @click="back"><i class="icon-back"></i></div>
        <!--封面背景-->
        <div class="bg-image" :style="bgStyle" ref="bgImage"/>
        <!--推动-->
        <div class="bg-layer" ref="layer"></div>
        <better-scroll class="list" ref="list" @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType">
            <div class="item-wrapper">
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
                <div class="item">&</div>
            </div>
        </better-scroll>
    </div>

</template>

<script>
  import {getToken} from "../../assets/js/utils";
  import {utilMixin} from "../../utils/mixin";
  import {userMixin} from "../../utils/mixin";
  import BetterScroll from "../../base/betterScroll/betterScroll";

  export default {
    name: "selfInformation",
    mixins: [utilMixin, userMixin],
    components: {BetterScroll},
    data(){
      return{
        scrollY: 0
      };
    },
    created() {
      this.probeType = 3;
      this.listenScroll = true;
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight;
      this.minTransalteY = -this.imageHeight + 40;
      this.$refs.list.$el.style.top = `${this.imageHeight}px`;//能用
    },
    beforeRouteEnter(to, from, next) {
      if (getToken()) {
        next();
      } else {
        /*未登陆 不能访问*/
        next(false);
      }
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.user.data.profile.backgroundUrl})`;
      }
    },
    methods:{
      scroll(pos) {
        this.scrollY = pos.y;
      }
    },
    watch:{
      scrollY(newVal){
        let translateY = Math.max(this.minTransalteY, newVal);
        let zIndex = 0;
        console.log(translateY);
        if (newVal > 0) {
          zIndex = 1000;
        }
        this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`;//能用
        //上面就初步可以了
        if (newVal < this.minTransalteY) {
          zIndex = 1000;
          this.$refs.bgImage.style.paddingTop = 0;
          this.$refs.bgImage.style.height = `40px`;//能用
        } else {
          this.$refs.bgImage.style.paddingTop = '70%';
          this.$refs.bgImage.style.height = 0;
        }
        this.$refs.bgImage.style.zIndex = zIndex.toString();

      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable";

    .self-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: $color-background;
        width: 100%;
        height: 100%;
        z-index: 10000;

        .icon {
            z-index: 5000;
            position: absolute;
            margin-top: 0.533rem;
            margin-left: 0.25rem;
        }

        .bg-image {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 70%;
            transform-origin: top;
            background-size: cover;
        }

        .bg-layer {
            position: relative;
            height: 100%;
            background: $color-background;
        }

        .list {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            background: $color-background;
            .item {

            }
        }
    }
</style>

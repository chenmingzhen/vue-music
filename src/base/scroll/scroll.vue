<template>
    <div class="scroll-wrapper" :class="{'no-scroll': ifNoScroll}" @scroll.passive="handleScroll" ref="scrollWrapper"
         @touchstart="handleStart" @touchend="handleEnd" @touchmove="handleMove">
        <slot></slot>
    </div>
</template>

<script>
  import {recommendMixin} from "../../utils/mixin";
  import {eventBus} from "../../main";
  export default {
    name: 'scroll',
    mixins: [recommendMixin],
    data: function () {
      return {
        startPoint: {},
        endPoint: {},
        offsetY: 0
      };
    },
    props: {
      top: {
        type: Number,
        default: 0
      },
      bottom: {
        type: Number,
        default: 0
      },
      ifNoScroll: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleStart(e) {
        let touch = e.changedTouches[0];
        this.startPoint.y = touch.pageY;
      },
      handleEnd(e) {
        if (this.offsetY === 0 && (this.endPoint.y - this.startPoint.y > 100)) {
          this.startPoint.y = 0;
          this.endPoint.y = 0;
        }
        this.setScrollMove(false);
        if(this.recommendScroll>300){
          this.setScrollFix(true);
          eventBus.$emit('refreshData');
        }
        eventBus.$emit('refreshDone');
      },
      handleMove(e) {
        let touch = e.targetTouches[0];
        this.endPoint.y = touch.pageY;
        if (!this.columnMove) {
          this.setScrollMove(true);
          if (this.scrollFix) {
            return ;
          }
          this.setRecommendScroll(e.targetTouches[0].pageY);
        }
      },
      handleScroll(e) {
        const offsetY = e.target.scrollTop || window.pageYOffset || document.body.scrollTop;
        this.offsetY = offsetY;
        this.$emit('onScroll', offsetY);
      },
      scrollTo(x, y) {
        this.$refs.scrollWrapper.scrollTo(x, y);
      },
      refresh() {
        if (this.$refs.scrollWrapper) {
          this.$refs.scrollWrapper.style.height = window.innerHeight - this.realPx(this.top) - this.realPx(this.bottom) + 'px';
          this.$refs.scrollWrapper.addEventListener('scroll', this.handleScroll);
        }
      },
      realPx(px) {
        const maxWidth = window.innerWidth > 750 ? 750 : window.innerWidth;
        return px * (maxWidth / 375);
      }
    },
    mounted() {
      this.refresh();
    }
  };
</script>

<style scoped lang="scss">

    .scroll-wrapper {
        position: relative;
        z-index: 100;
        width: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;

        &::-webkit-scrollbar {
            display: none;
        }

        &.no-scroll {
            overflow: hidden;
        }
    }
</style>

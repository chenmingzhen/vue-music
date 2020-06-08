<template>
    <div class="scroll-wrapper" :class="{'no-scroll': ifNoScroll}" @scroll.passive="handleScroll" ref="scrollWrapper"
         @touchstart="handleStart" @touchend="handleEnd" @touchmove="handleMove">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'scroll',
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
          console.log('show');
          this.startPoint.y = 0;
          this.endPoint.y = 0;
        }
      },
      handleMove(e) {
        let touch = e.changedTouches[0];
        this.endPoint.y = touch.pageY;
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

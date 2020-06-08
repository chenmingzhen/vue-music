<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dot-wrapper">
            <span class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex===index}"
                  :key="index"></span>
        </div>
    </div>
</template>

<script>
  import {addClass} from "../../assets/js/dom";
  import BScroll from "better-scroll";

  export default {
    name: "slider",
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      };
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    mounted() {
      setTimeout(() => {
        this.setSliderWidth();
        this.initDots();
        this.initSlider();
        if (this.autoPlay) {
          this.play();
        }
      }, 20);

      /*改变窗口大小时 重新计算slider宽度*/
      window.addEventListener('resize',()=>{
        if(!this.slider){
          return;
        }
        this.setSliderWidth(true);
        this.slider.refresh();
      });
    },
    destroyed() {
      clearInterval(this.timer);
    },
    methods: {
      setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children;

        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth;
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          addClass(child, 'slider-item');
          child.style.width = sliderWidth + 'px';
          width += sliderWidth;
        }
        /*联接*/
        if (this.loop && !isResize) {
          width += 2 * sliderWidth;
        }
        this.$refs.sliderGroup.style.width = width + 'px';
      },
      initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400,
          click:true
        });

        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX;
          if (this.loop) {
            pageIndex -= 1;
          }
          this.currentPageIndex = pageIndex;

          if (this.autoPlay) {
            clearTimeout(this.timer);
            this.play();
          }
        });
      },
      initDots() {
        this.dots = new Array(this.children.length);
      },
      play() {
        let pageIndex = this.currentPageIndex + 1;
        if (this.loop) {
          pageIndex += 1;
        }
        this.timer = setInterval(() => {
          this.slider.goToPage(pageIndex, 0, 400);
        }, this.interval);
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable.scss";

    .slider {
        min-height: 0.027rem;

        .slider-group {
            position: relative;
            overflow: hidden;
            white-space: nowrap;
            width: 100%;

            .slider-item {
                float: left;
                overflow: hidden;
                box-sizing: border-box;
                text-align: center;

                a {
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    text-decoration: none;

                    img {
                        display: block;
                        width: 100%;
                    }
                }
            }
        }

        .dot-wrapper {
            position: absolute;
            right: 0;
            left: 0;
            bottom: 0.32rem;
            text-align: center;
            font-size: 0;

            .dot {
                display: inline-block;
                margin: 0 0.107rem;
                width: 0.213rem;
                height: 0.213rem;
                border-radius: 50%;
                background: $color-text-l;

                &.active {
                    width: 0.533rem;
                    border-radius: 0.133rem;
                    background: $color-text-ll;
                }
            }
        }
    }
</style>

<template>
    <div id="refresh-wrapper" class="refresh-wrapper" :style="{'background-color':backgroundColor}" ref="refresh">
        <div class="img"><img src="../../assets/image/refresh.png" alt=""></div>
    </div>
</template>

<script>
  import {recommendMixin} from "../../utils/mixin";
  import {eventBus} from "../../main";

  export default {
    mixins: [recommendMixin],
    name: "refresh",
    props: {
      backgroundColor: {
        type: String,
        default: '#222'
      }
    },
    watch: {
      recommendScroll(val) {
        if (val < 300 && this.scrollFix === false) {
          if (!this.scrollMove) {
            this.setScrollFix(true);
          } else {
            if (this.scrollFix) return;
            else {
              this.$refs.refresh.style.transform = `translateY(${this.realPx(val - 200)}px)`;
            }
          }
        }

      }
    },
    created() {
      eventBus.$on('refreshDone', () => {
        this.$refs.refresh.style.opacity = '0';
        setTimeout(() => {
          this.$refs.refresh.style.transform = `translateY(0)`;
          this.$refs.refresh.style.opacity = '1';
          this.setScrollFix(false);
        }, 1000);
      });
    }
  };
</script>

<style scoped lang="scss">
    .refresh-wrapper {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
        border-radius: 50%;
        width: 1.333rem;
        height: 1.333rem;
        top: 3.5%;
        transition: opacity 1s;

        .img {
            width: 100%;

            img {
                width: 100%;
                animation: turn 2s linear infinite;
            }
        }

    }

    @keyframes turn {
        0% {
            -webkit-transform: rotate(360deg);
        }
        25% {
            -webkit-transform: rotate(270deg);
        }
        50% {
            -webkit-transform: rotate(180deg);
        }
        75% {
            -webkit-transform: rotate(90deg);
        }
        100% {
            -webkit-transform: rotate(0deg);
        }
    }
</style>

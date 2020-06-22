<template>
    <div class="progress-bar" ref="progressBar">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn"
                 @touchstart.prevent="progressTouchStart"
                 @touchmove.prevent="progressTouchMove"
                 @touchend="progressTouchEnd">
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
  const progressBtnWidth = 16;
  export default {
    name: "progress-bar",
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.touch = {};
    },
    methods: {
      progressTouchStart(e) {
        this.touch.initiated = true;
        this.touch.startX = e.touches[0].pageX;
        this.touch.left = this.$refs.progress.clientWidth;
      },
      progressTouchMove(e) {
        if (!this.touch.initiated) {
          return;
        }
        const deltaX = e.touches[0].pageX - this.touch.startX;
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX));
        this._offset(offsetWidth);
      },
      progressTouchEnd() {
        this.touch.initiated = false;
        this.triggerPercent();
      },
      triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        const percent = this.$refs.progress.clientWidth / barWidth;
        console.log(percent, 'triggerPercent');
        this.$emit('percentChange', percent);
      },
      _offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth/25}rem`;
        this.$refs.progressBtn.style['transform'] = `translate3d(${offsetWidth/25}rem,0,0)`;
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initiated) {
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
          const offsetWidth = newPercent * barWidth;
          this._offset(offsetWidth);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable.scss";

    .progress-bar {
        height: 1.2rem;

        .bar-inner {
            position: relative;
            top: 0.52rem;
            height: 0.16rem;
            background: rgba(0, 0, 0, .3);

            .progress {
                position: absolute;
                height: 100%;
                background: $color-theme
            }

            .progress-btn-wrapper {
                position: absolute;
                left: -0.32rem;
                top: -0.52rem;
                width: 1.2rem;
                height: 1.2rem;

                .progress-btn {
                    position: relative;
                    top: 0.28rem;
                    left: 0.28rem;
                    box-sizing: border-box;
                    width: 0.64rem;
                    height: 0.64rem;
                    border: 0.04rem solid $c-b;
                    border-radius: 50%;
                    background: $c-t;
                }
            }
        }
    }
</style>

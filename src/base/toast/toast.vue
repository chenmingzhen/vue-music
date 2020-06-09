<template>
    <transition name="slide" appear>
        <div class="toast-wrapper">
            <div class="toast-background" :style="{'background-color':backgroundColor}"></div>
            <div class="toast-text" :style="{'background-color':textBackgroundColor}">
                <img src="../../assets/image/musical.png" alt="">
                <p class="text">{{text}}</p>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: "toast",
    props: {
      text: String,
      backgroundColor: {
        type: String,
        default: "rgba(49,49,49,.5)"
      },
      textBackgroundColor: {
        type: String,
        default: "rgba(255,205,50)" //(255,205,50,.5)
      }
    },
    methods: {
      destroy() {
        this.$emit('destroy', this.text);
      }
    }
  };
</script>

<style scoped lang="scss">
    .toast-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10000;
        .toast-background {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 10000;
        }

        .toast-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50%;
            height: 8%;
            z-index: 10000;
            border-radius: 0.8rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 0 0.9rem;
            box-sizing: border-box;

            img {

                width: 15%;
            }

            .text {
                color: #222222;
                font-size: 0.8rem;
                font-weight: bolder;
            }
        }
    }

    /*animation*/
    .slide-enter, .slide-leave-to {
        transform: translateY(-3rem);
        opacity: 0;
    }


    .slide-enter-to, .slide-leave {
        transform: translateY(0);
        opacity: 1;
    }

    .slide-enter-active, .slide-leave-active {
        transition: all .4s linear;
    }

</style>

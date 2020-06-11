<template>
    <div class="cell">
        <div class="card">
            <span class="refreshing-loader">Loading&#8230;</span>
        </div>
        <div class="text">
            {{text}}
        </div>
    </div>
</template>

<script>

  export default {
    name: "loading",
    props:{
      text:String
    }
  };
</script>

<style scoped lang="scss">
    .cell{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        flex-direction: column;
        .text{
            margin-top: 0.8rem;
        }
    }
    @import "src/assets/sass/variable.scss";
    @-moz-keyframes refreshing-loader {
        0% {
            -moz-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -moz-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes refreshing-loader {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes refreshing-loader {
        0% {
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -moz-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    /* :not(:required) hides this rule from IE9 and below */
    .refreshing-loader:not(:required) {
        -moz-animation: refreshing-loader 1000ms infinite linear;
        -webkit-animation: refreshing-loader 1000ms infinite linear;
        animation: refreshing-loader 1000ms infinite linear;
        -moz-border-radius: 2.4em;
        -webkit-border-radius: 2.4em;
        border-radius: 2.4em;
        border: 0.4em solid $color-theme;
        border-left-color: transparent;
        color: transparent;
        display: inline-block;
        font-size: 10px;
        line-height: 1.2;
        width: 3em;
        height: 3em;
        text-indent: 100%;
    }
    .refreshing-loader:not(:required):after {
        display: block;
        border: 0.5em solid transparent;
        border-top-color: $color-theme;
        border-left-color: $color-theme;
        content: '';
        width: 0;
        height: 0;
        overflow: hidden;
        margin-left: -0.2em;
        margin-top: 1em;
    }

</style>

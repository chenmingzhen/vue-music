<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
  import MHeader from "./components/m-header/m-header";
  import Tab from './components/tab/tab.vue';
  export default {
    components: {
      MHeader,
      Tab
    }
  };

  (function () {
    function a() {
      let b = document.documentElement.clientWidth;
      b = b > 750 ? 750 : b;
      const c = b / 750 * 50;
      document.getElementsByTagName('html')[0].style.fontSize = c + 'px';
    }
    a();
    window.onresize = a;
  })();
</script>
<style lang="scss"></style>

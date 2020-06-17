<template>
    <div id="app">
        <m-header></m-header>
        <tab></tab>
        <!--<refresh></refresh>-->
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>
<script>
  import MHeader from "./components/m-header/m-header";
  import Tab from './components/tab/tab.vue';
  import {getToken} from "./assets/js/utils";
  import {login} from "./api/login";
  import {userMixin} from "./utils/mixin";

  export default {
    components: {
      MHeader,
      Tab,
      /*Refresh*/
    },
    mixins:[userMixin],
    created() {
      if(getToken()){
        login(getToken('phone'),getToken('password')).then(data=>{
          this.setUser({data});
          console.log(this.user.data.profile.avatarUrl);
        });
      }
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
<style lang="scss">
    .app {
        position: relative;

        .m-header, .tab {
            z-index: 1000;
        }
    }
</style>

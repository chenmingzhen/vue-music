import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/sass/index.scss";
import fastClick from "fastclick";
import VueLazyLoad from "vue-lazyload";
Vue.config.productionTip = false;

/*import 'nprogress/nprogress.css';*/

/*兄弟组件传值 eventBus*/
export const eventBus=new Vue();


Vue.use(VueLazyLoad,{
  error:require('../src/assets/image/fail.png'),
  loading:require('../src/assets/image/loading.gif')
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/sass/index.scss";
import fastClick from "fastclick";
import VueLazyLoad from "vue-lazyload";
Vue.config.productionTip = false;
//fastClick.attach(document.body);
Vue.use(VueLazyLoad,{
  loading:require('../src/assets/image/loading.gif')
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

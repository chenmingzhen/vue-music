import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/sass/index.scss";
import fastClick from "fastclick";

Vue.config.productionTip = false;
fastClick.attach(document.body);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

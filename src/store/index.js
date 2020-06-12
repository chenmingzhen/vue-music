import Vue from "vue";
import Vuex from "vuex";
import recommend from "./modules/recommend";
import singer from "./modules/singer";
import getters from './getters';
import actions from './actions';
Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    recommend,
    singer
  },
  getters,
  actions
});

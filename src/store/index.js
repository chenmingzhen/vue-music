import Vue from "vue";
import Vuex from "vuex";
import recommend from "./modules/recommend";
import singer from "./modules/singer";
import userInf from "./modules/userInf";
import play from "./modules/play";
import getters from './getters';
import actions from './actions';
Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    recommend,
    singer,
    userInf,
    play
  },
  getters,
  actions
});

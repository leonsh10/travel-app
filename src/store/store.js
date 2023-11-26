import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import reservation from './modules/reservation';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    reservation
  }
})


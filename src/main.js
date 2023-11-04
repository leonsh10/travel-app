import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.min.css';
import router from './router';
import './global.css';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import store from './store/store';
import Vuelidate from 'vuelidate';
import 'swiper/css/swiper.css';
Vue.use(Vuelidate);
Vue.config.productionTip = false;

Vue.use(Vuetify);

Vue.use(Toast);

const vuetify = new Vuetify({});

if (localStorage.getItem('token')) {
  store.commit('SET_USER_DATA', {
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user'))
  });
}

new Vue({
  render: h => h(App),
  store,
  router,
  vuetify,
}).$mount('#app');
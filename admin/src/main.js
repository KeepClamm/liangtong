import App from './App';
import Vue from 'vue';
import router from './router';

import Vuex from 'vuex';
import store from './store';
import Element from 'element-ui';
import '@/icons'; // icon
import '@/permission'; // permission control
import '@/filter/filter';

import '@/../static/js/polyfills.min.js';
import '@/../static/js/directives.js';
import '@/styles/index.scss'; // global css
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'; // element css file

Vue.use(Vuex);
Vue.use(Element, { size: 'medium'}); // set element-ui default size
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
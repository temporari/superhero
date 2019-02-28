// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'


import $ from 'jquery'

import '@/assets/css/bootstrap/css/bootstrap.min.css'
import '@/assets/css/bootstrap/js/bootstrap.min'

import 'font-awesome/css/font-awesome.min.css'



// import '@/assets/css/cropper.min.css'
import '@/assets/css/style.css'

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use($);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});

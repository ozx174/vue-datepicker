// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import './common/js/rem.js'
import './common/stylus/index.styl'
import router from './router'
import store from './store/index'
import './beforeRoute'
// import Vconsole from 'vconsole'

Vue.config.productionTip = false

// let vConsole = new Vconsole()// eslint-disable-line

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})

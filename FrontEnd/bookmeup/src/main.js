import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import endpoints from '../config/endpoints'
import Sticky from 'vue-sticky-directive'

Vue.use(Sticky)


Vue.config.productionTip = false

Vue.prototype.$endpoints = endpoints

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

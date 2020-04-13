import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import endpoints from '../config/endpoints'
import Sticky from 'vue-sticky-directive'
import Toasted from 'vue-toasted';

let toasted_options = {
  theme: "toasted-primary",
  position: "bottom-left",
  duration: 5000
}

Vue.use(Toasted, toasted_options)
Vue.use(Sticky)

Vue.config.productionTip = false

Vue.prototype.$endpoints = endpoints

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Sticky from 'vue-sticky-directive'
import Toasted from 'vue-toasted';
import VueCookies from "vue-cookies"
import Vuelidate from "vuelidate"
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme


import default_Layout from './layouts/Default.vue'
import noTopBar_Layout from './layouts/NoTopBar.vue'

let toasted_options = {
  theme: "toasted-primary",
  position: "bottom-left",
  duration: 2000
}

Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(Vuelidate)
Vue.use(VueCookies)
Vue.use(Toasted, toasted_options)
Vue.use(Sticky)

Vue.config.productionTip = false

Vue.component("default-layout", default_Layout)
Vue.component("unauthenticated-layout", noTopBar_Layout)


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
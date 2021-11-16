import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './plugins/element.js'

// use directive
import VueRouteQuery from '../../src/index'
Vue.use(VueRouteQuery)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

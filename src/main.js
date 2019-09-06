import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'

import router from './router/index'
import store from './store/index'

import globalMethods from './mixins/funcs'

Vue.use(Vuelidate)
Vue.config.productionTip = false

Vue.mixin(globalMethods)

Vue.commitData = function ($event) {
  const name = $event.target.getAttribute('name')
  const data = $event.target.value

  this.$store.commit('changeState', { name, data })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

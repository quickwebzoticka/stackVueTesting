import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'

import router from './router/index'
import store from './store/index'

import globalMethods from './mixins/funcs'

Vue.use(Vuelidate)
Vue.config.productionTip = false

Vue.mixin(globalMethods)

Vue.filter('money', function (value) {
  value = `${value}`
  return `${parseInt(value.replace(/ /g, '')).toLocaleString()} руб`
})
Vue.filter('procent', function (value) {
  let val = (`${parseFloat(value)}`).slice(0, 5)
  return (`${val} %`)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

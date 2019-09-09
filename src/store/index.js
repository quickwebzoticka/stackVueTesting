import Vue from 'vue'
import Vuex from 'vuex'

import globalMutations from './globalMutations'
import globalActions from './globalActions'
import tab1 from './tab1/tab1'
import tab2 from './tab2/tab2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: globalMutations,
  actions: globalActions,
  modules: {
    tab1,
    tab2
  }
})

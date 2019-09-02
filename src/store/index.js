import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    counterUpdate (state, payload) {
      if (state.counter === 0 && payload === -1) return false
      state.counter = state.counter + payload
    }
  }
})

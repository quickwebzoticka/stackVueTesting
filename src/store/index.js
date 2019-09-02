import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
    phones: 0
  },
  mutations: {
    counterUpdate (state, payload) {
      if (state.counter === 0 && payload === -1) return false
      state.counter = state.counter + payload
    },
    updateCountPhones (state, value) {
      if (state.phones === 0 && value === -1) return false
      state.phones = state.phones + value
    }
  }
})

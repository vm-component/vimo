import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    menu: {
      side: 'left', // left/right
      type: 'reveal' // overlay/reveal
    }
  },
  actions: {},
  mutations: {
    SET_MENUS: (state, {side, type}) => {
      if (side) {
        state.menu.side = side
      }
      if (type) {
        state.menu.type = type
      }
    }
  },
  getters: {}
})
export default store

import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '../i18n/index'

Vue.use(Vuex)
const index = new Vuex.Store({
  state: {
    locale: 'zh-CN',
    menu: {
      side: 'left', // left/right
      type: 'reveal' // overlay/reveal
    }
  },
  actions: {},
  mutations: {
    SET_LOCALE: (state, {locale}) => {
      state.locale = locale
      i18n.locale = locale
    },
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
export default index

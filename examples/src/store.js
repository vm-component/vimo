import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const store = new Vuex.Store({
  // 数据持久缓存
  // plugins: [
  //   createPersistedState({
  //     storage: window.sessionStorage,
  //     key: 'RouteRecruiting'
  //   })
  // ],
  state: {
    menus: {
      side: 'left', // left/right
      type: 'reveal' // overlay/reveal
    }
  },
  actions: {
    // 获取招募列表
    LOAD_RECRUIT_LIST: function ({commit, state}) {
      // commit('SET_RECRUIT_LIST', {list: list})
      // commit('ADD_ROUTE_ID', {data: state.userSignedList})
      // commit('CLEAR_USER_SIGNED_LIST')
    }
  },
  mutations: {
    SET_MENUS: (state, {side, type}) => {
      if (side) {
        state.menus.side = side
      }
      if (type) {
        state.menus.type = type
      }
    }

    // CLEAR_USER_SIGNED_LIST: (state) => {
    //   // state.userSignedList = null
    // },
    // SET_NOT_IN_APP: (state) => {
    //   // state.isInApp = false
    // },
    // // 招募的 站点信息 列表
    // SET_RECRUIT_LIST: (state, {list}) => {
    //   // state.recruitList = list
    // },
    // // 向 recruitList 添加以报名的线路id, 可以是单个, 也可以是数组
    // ADD_ROUTE_ID: (state, {data}) => {
    //   // // 如果没有线路列表, 则记录不处理
    //   // if (!state.recruitList || state.recruitList.length === 0) {
    //   //   state.userSignedList = data
    //   // } else {
    //   //   if (typeof data === 'string' || typeof data === 'number') {
    //   //     let recruitList = JSON.parse(JSON.stringify(state.recruitList))
    //   //     // 根据单个routeId 更新 recruitList, 这里需要对报名数++
    //   //     for (let i = 0, len = recruitList.length; len > i; i++) {
    //   //       let item = recruitList[i]
    //   //       if (parseInt(data) === parseInt(item.routeId)) {
    //   //         item.isSigned = true
    //   //         item.enterCount++
    //   //         break
    //   //       }
    //   //     }
    //   //     state.recruitList = recruitList
    //   //   } else if (Array.isArray(data)) {
    //   //     // let recruitList = JSON.parse(JSON.stringify(state.recruitList))
    //   //     let recruitList = state.recruitList
    //   //     // 根据多个数据 [1,2,4] 更新 recruitList
    //   //     // data = data.join(',')
    //   //     recruitList.forEach((item) => {
    //   //       for (let i = 0, len = data.length; len > i; i++) {
    //   //         let routeId = data[i].toString()
    //   //         if (routeId === item.routeId.toString()) {
    //   //           item.isSigned = true
    //   //           break
    //   //         }
    //   //       }
    //   //     })
    //   //     state.recruitList = recruitList
    //   //   }
    //   // }
    // },
    // // 记录用户信息, 并更新登录状态
    // RECORD_USER_INFO: (state, {token, mobile}) => {
    //   // if (mobile) {
    //   //   state.userInfo.mobile = mobile
    //   // }
    //   // if (token) {
    //   //   state.userInfo.token = token
    //   // }
    //   //
    //   // // 获取用户已报名的设置, 修改 'recruitList.isSigned'
    //   // Indocator.present()
    //   // getUserDataAndChangeState(mobile, token).then(() => {
    //   //   Indocator.dismiss()
    //   // })
    // },
    // // 保存用户位置
    // RECORD_CITY_LOCATION: (state, {lat, lng, cityCode}) => {
    //   // if (lat) {
    //   //   state.city.lat = lat
    //   // }
    //   // if (lng) {
    //   //   state.city.lng = lng
    //   // }
    //   // if (cityCode) {
    //   //   state.city.cityCode = cityCode
    //   // }
    // }
  },
  getters: {
    // // 是否登录
    // isLogin (store) {
    //   return !!store.userInfo.mobile || !!store.userInfo.token
    // }
  }
})
export default store

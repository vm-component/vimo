/**
 * Created by Hsiang on 2017/4/21.
 * content相关的路由
 */
export default [
  {
    path: '/scroll',
    name: 'scroll',
    component (resolve) {
      require(['@/pages/scroll/scroll.vue'], resolve)
    }
  },
  {
    path: '/normal_scroll',
    name: 'normalScroll',
    component (resolve) {
      require(['@/pages/scroll/normal-scroll.vue'], resolve)
    }
  },
  {
    path: '/city_scroll',
    name: 'cityScroll',
    component (resolve) {
      require(['@/pages/scroll/city-scroll.vue'], resolve)
    }
  },
  {
    path: '/user_center_scroll',
    name: 'userCenterScroll',
    component (resolve) {
      require(['@/pages/scroll/user-center.vue'], resolve)
    }
  }
]

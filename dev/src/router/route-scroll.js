/**
 * Created by Hsiang on 2017/4/21.
 * content相关的路由
 */
export default [
  {
    path: '/scroll',
    name: 'scroll',
    component (resolve) {
      require(['@/example/scroll/scroll.vue'], resolve)
    }
  },
  {
    path: '/normal_scroll',
    name: 'normalScroll',
    component (resolve) {
      require(['@/example/scroll/normal-scroll.vue'], resolve)
    }
  }
]

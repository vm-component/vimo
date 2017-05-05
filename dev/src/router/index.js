import { Indicator } from 'vimo/components/indicator'
import Vue from 'vue'
import Router from 'vue-router'
import options from './route-opt.js'
const router = new Router(options)
Vue.use(Router)
/**
 * 全局EventBus事件:
 *
 * 页面级切换, 而不是子页面(tab/segment/modal)的切换. 页面切换伴随着nav及content的动画.
 * 这里定义, 在一级路由发生切换时, 才算做页面切换, 子路由的切换不是页面切换
 *
 * onRouteChangeBefore: 页面变化前的事件.
 * onRouteChangeAfter: 页面变化后的事件.
 *
 * */
// router.beforeEach((to, from, next) => {
//   Vue.nextTick(() => {
//     if (Vue.prototype.$history.canGoBack() && Vue.prototype.$history.getDirection() === 'forward') {
//       Indicator.present()
//     }
//   })
//   next()
// })
// //
// router.afterEach((to, from) => {
//   Vue.nextTick(() => {
//     'use strict'
//     Indicator.dismiss()
//   })
// })

export default router

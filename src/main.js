// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import routerFactory from './router.js';
import attachFastClick from 'fastclick';
new attachFastClick(document.body);

let router = routerFactory(Vue);
// import './register'

// 组件注册
import Components from './components'
Vue.use(Components, {
  // 组件初始化参数
  a: 1,
  b: 1,
});

/**
 * $router全局化，便于外部js调用
 * */
// window.$router = routerFactory(Vue);

/* eslint-disable no-new */
import mixin from './mixins/baseMethodMixin'

// 全局组件继承
// let Component = Vue.extend({
//
//   hello:'hello to here'
// });
//
// new Component({
//   el: '#app',
//   router,
//   template: '<App/>',
//   mounted () {
//     console.log('root this;')
//     console.log(this)
//   },
//   components: {App}
// });

import { ClickBlock } from "./util/click-block"

Vue.nextTick(function () {
  let clickBlcok = new ClickBlock();
  console.log(clickBlcok)

  clickBlcok.activate(true, 4000)

})

import { QueryParams, setupQueryParams } from './platform/query-params'
import { setupPlatform } from './platform/platform'
import { providePlatformConfigs } from './platform/platform-registry'

let platformConfigs = providePlatformConfigs();
let queryParams = new QueryParams();
queryParams.parseUrl(window.location.href);

// let queryParams = setupQueryParams(window.location.href)

let platform = setupPlatform(platformConfigs, queryParams, navigator.userAgent, navigator.platform, 'ltr', 'zh');


console.debug('platform')
console.log(platform)
console.log(platform.versions());
console.log(platform.version());

new Vue({
  el: '#app',
  // mixins: [mixin],
  router,
  template: '<App/>',
  mounted () {
    // console.log('root this;')
    // console.log(this)
  },
  components: {App}
});

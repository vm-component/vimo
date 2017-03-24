// 配置
import PLATFORM_CONFIGS from './config/platform-configs'
import APP_CONFIGS from './config/app-configs'
import router from './router'
import Vue from 'vue'
import App from './App'
import attachFastClick from 'fastclick'
import { initVimo } from 'vimo'

/* eslint-disable no-new */
new attachFastClick(document.body)
// Vue.config.productionTip = false;
// 平台基础安装
initVimo(APP_CONFIGS, PLATFORM_CONFIGS, function (data) {
  console.debug('****  Platform ready info: ' + data + '  ****')
})

// backdrop
let comp = require('vimo/components/backdrop')
let BackdropComponent = comp.BackdropComponent
let BackdropInstance = comp.BackdropInstance
// icon
let Icon = (require('vimo/components/icon')).Icon
// 弹出层
let ActionSheet = (require('vimo/components/action-sheet')).ActionSheet
let Loading = (require('vimo/components/loading')).Loading
let Alert = (require('vimo/components/alert')).Alert
let Toast = (require('vimo/components/toast')).Toast
let Modal = (require('vimo/components/modal')).Modal

Vue.component(BackdropComponent.name, BackdropComponent)
Vue.component(Icon.name, Icon)
Vue.prototype.$backdrop = BackdropInstance
Vue.prototype.$actionSheet = ActionSheet
Vue.prototype.$loading = Loading
Vue.prototype.$alert = Alert
Vue.prototype.$toast = Toast
Vue.prototype.$modal = Modal

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  mounted () {},
  created () {},
  components: {App}
})
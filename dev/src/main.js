import axios from 'axios'
import 'ionicons/dist/css/ionicons.css'
import vimo from 'vimo'
// 全局组件
import { ActionSheet } from 'vimo/components/action-sheet'
import { Alert } from 'vimo/components/alert'
import { Backdrop } from 'vimo/components/backdrop'
import { Button } from 'vimo/components/button'
import { Column, Grid, Row } from 'vimo/components/grid'
import { Icon } from 'vimo/components/icon'
import { Indicator } from 'vimo/components/indicator'
import { Loading } from 'vimo/components/loading'
import { Modal } from 'vimo/components/modal'
import { Navbar } from 'vimo/components/navbar'
import { Spinner } from 'vimo/components/spinner'
import { Toast } from 'vimo/components/toast'
import { Buttons, Title, Toolbar } from 'vimo/components/toolbar'
import Vue from 'vue'

import VueI18n from 'vue-i18n'
import App from './App.vue'
import AttachFastClick from './assets/js/fastclick'
import APP_CONFIGS from './config/app-configs'
import PLATFORM_CONFIGS from './config/platform-configs'
import geo from './geolocation/vm-geo'
import log from './log'
import router from './router'
import storage from './storage/vm-storage'
Vue.use(VueI18n)

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'cn', // set locale
  fallbackLocale: 'cn',
  messages: {
    cn: require('./lang/cn').default,
    en: require('./lang/en').default
  }
})

Vue.use(geo, {
  enableHighAccuracy: true, // 是否要求高精度地理位置信息
  maximumAge: 10000,         // 设置缓存时间为1s，1s后重新获取地理位置信息
  timeout: 15000,            // 5s未返回信息则返回错误
  fallBack: 'aMap',         // 条件允许优先使用原生获取, 如果在IOS下是使用的是HTTP获取, 则使用备选, 这里是aMap
  qMap: {
    key: 'OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77', // official example app key, please use geo.register() to replace
    name: 'qqMapName'
  },
  bMap: {
    key: 'yFKaMEQnAYc1hA0AKaNyHGd4HTQgTNvO'
  },
  aMap: {
    key: '8d1ba642a3a3046d1ee087e0f8b490a2'
  }
})

Vue.use(storage, {
  prefix: 'vimo-'
})

Vue.use(log, {
  needLogPage: true // 初始化是否显示log页面
})

Vue.prototype.$axios = axios

/* eslint-disable no-new */
new AttachFastClick(document.body)

// Vue.config.productionTip = false;
// 平台基础安装
Vue.use(vimo, {
  custConf: APP_CONFIGS,
  pltConf: PLATFORM_CONFIGS,
  router: router
})

Vue.component(Backdrop.name, Backdrop)
Vue.component(Icon.name, Icon)
Vue.component(Grid.name, Grid)
Vue.component(Row.name, Row)
Vue.component(Column.name, Column)
Vue.component(Spinner.name, Spinner)
Vue.component(Button.name, Button)
Vue.component(Navbar.name, Navbar)
Vue.component(Toolbar.name, Toolbar)
Vue.component(Title.name, Title)
Vue.component(Buttons.name, Buttons)

Vue.prototype.$actionSheet = ActionSheet
Vue.prototype.$loading = Loading
Vue.prototype.$alert = Alert
Vue.prototype.$toast = Toast
Vue.prototype.$modal = Modal
Vue.prototype.$indicator = Indicator

if (process.env.NODE_ENV === 'development') {

} else {

}

new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  created () {
    this.$platform.ready().then((data) => {
    }, () => {})
  },
  components: {App}
})

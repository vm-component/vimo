import Vue from 'vue'
import App from './App.vue'
import AttachFastClick from 'fastclick'
import APP_CONFIGS from './config/app-configs'
import PLATFORM_CONFIGS from './config/platform-configs'
import 'ionicons/dist/css/ionicons.css'
import vimo from '../../components/dist'
import VueI18n from 'vue-i18n'
import vmGeo from 'vm-geo'
import vmStorage from 'vm-storage'
import router from './router'
import store from './store.js'

if (process.env.NODE_ENV === 'development') {
  Vue.config.productionTip = false
  Vue.config.silent = false
} else {
  Vue.config.productionTip = true
  Vue.config.silent = true
}

// 平台基础安装
Vue.use(vimo, {
  custConf: APP_CONFIGS,
  pltConf: PLATFORM_CONFIGS,
  router: router
})

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
Vue.use(vmGeo, {
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
Vue.use(vmStorage)

// 安装 LandscapePrompt 横屏时提示用户
Vue.use(vimo.LandscapePrompt)

// eslint-disable-next-line no-new
new AttachFastClick(document.body)
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  created () {
    this.$platform.ready().then((data) => {
      console.log(`Platform Ready && Init Info: ${data}`)
    }, (data) => {
      console.error(`Platform Ready && Init Info: ${data}`)
    })
  },
  components: {App}
})

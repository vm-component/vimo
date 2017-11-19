import Vue from 'vue'
import App from './App.vue'
import AttachFastClick from 'fastclick'
import APP_CONFIGS from './config/app-configs'
import PLATFORM_CONFIGS from './config/platform-configs'
import Vimo from '../../src/index'
import VueI18n from 'vue-i18n'
import vmGeo from 'vm-geo'
import vmStorage from 'vm-storage'
import router from './router'

if (process.env.NODE_ENV === 'development') {
  Vue.config.productionTip = false
  Vue.config.silent = false
} else {
  Vue.config.productionTip = true
  Vue.config.silent = true
}

// 全局引用
Vue.use(Vimo, {
  appConf: APP_CONFIGS,
  pltConf: PLATFORM_CONFIGS,
  router: router
})

// 平台基础安装
// Vimo.core(Vue, {
//   appConf: APP_CONFIGS,
//   pltConf: PLATFORM_CONFIGS,
//   router: router
// })
//
// Vue.use(Vimo.App)
// Vue.use(Vimo.Header)
// Vue.use(Vimo.Footer)
// Vue.use(Vimo.Content)
// Vue.use(Vimo.Nav)
// Vue.use(Vimo.Navbar)
// Vue.use(Vimo.Page)
// Vue.use(Vimo.List)
// Vue.use(Vimo.Item)
// Vue.use(Vimo.Menu)
// Vue.use(Vimo.Grid)
// Vue.use(Vimo.Column)
// Vue.use(Vimo.Row)
// Vue.use(Vimo.Button)
// Vue.use(Vimo.Buttons)
// Vue.use(Vimo.Title)

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

// eslint-disable-next-line no-new
new AttachFastClick(document.body)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  created () {
    this.$platform.ready().then((data) => {
      console.log(`Platform Ready && Init Info: ${data}`)
      // alert(`Platform Ready && Init Info: ${data}`)
    }, (data) => {
      console.error(`Platform Ready && Init Info: ${data}`)
      // alert(`Platform Ready && Init Info: ${data}`)
    })

    window.setTimeout(() => {
      // alert(`window.WebViewJavascriptBridge: ${JSON.stringify(Object.keys(window.WebViewJavascriptBridge))}`)
    }, 1000)
  },
  components: {App}
})

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
// 测试
import './lib/dt-jssdk/index'

// import './lib/dingtalk/index'
// import methods from './lib/dingtalk/methods'

// document.addEventListener('online', function (e, other) {
//   console.log('document.addEventListener')
//   console.log(e)
//   console.log(other)
// })
//
// window.WebViewJavascriptBridge.eventTrigger('online',function (data) {
//   console.log('window.WebViewJavascriptBridge.eventTrigger')
//   console.log(data)
// })
//
// window.WebViewJavascriptBridge = {
//
//   init: function () {
//     console.debug('WebViewJavascriptBridge.init')
//   },
//   /**
//    * 事件列表
//    * */
//   eventList: {},
//   /**
//    * mock模拟触发的函数
//    * @private
//    * */
//   eventTrigger: function (eventName, callbacks) {
//     let eventCallback = this.eventList[eventName]
//     eventCallback && eventCallback({
//       eventName: eventName
//     }, callbacks)
//   },
//   /**
//    * 事件注册
//    * @param {string} eventName -
//    * @param {function} callbacks -
//    * */
//   registerHandler: function (eventName, callbacks) {
//     this.eventList[eventName] = callbacks
//   },
//   /**
//    * 函数调用相关
//    * @param {string} namespace - 命名空间: 'device.notification.alert'
//    * @param {object} params - 参数
//    * @param {function} responseHandler - 方法的执行函数: alert的执行方法
//    * */
//   callHandler: function (namespace, params, responseHandler) {
//     console.log(`namespace: ${JSON.stringify(namespace)}`)
//     console.log(`params: ${JSON.stringify(params)}`)
//
//     let result = null
//     let namespaceArrs = namespace.split('.')
//     let classify = namespaceArrs[0]
//     for (let i = 0; methods[classify].length > i; i++) {
//       let item = methods[classify][i]
//       if (item.namespace === namespace) {
//         result = item.mockSuccessResult || 'without mockSuccessResult'
//       }
//     }
//
//     responseHandler && responseHandler({
//       errorCode: '0', // 0:success -1:cancel other:error
//       result: result // alert的数据
//     })
//   }
// }

console.log(window.dd)

window.dd.config({
  appId: 'appId',
  corpId: 'corpId',
  nonceStr: '123123123',
  signature: '123',
  timeStamp: new Date().getTime(),
  type: 0
})

window.dd.ready(function (data) {
  console.log(`window.dd.ready: ${JSON.stringify(data)}`)
})

if (process.env.NODE_ENV === 'development') {
  Vue.config.productionTip = false
  Vue.config.silent = false

  let vmLog = require('./lib/vm-log')
  Vue.use(vmLog)
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


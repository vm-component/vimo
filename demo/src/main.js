import 'ionicons/dist/css/ionicons.css'
import AttachFastClick from 'fastclick'
import Install from 'vimo/components/install.js'
import Vue from 'vue'
import Root from './Root.vue'
import router from './router/index'
import register from './register'
import appConfig from './config'
import appPlatform from './platform'
import i18n from './i18n'
import store from './store/index'

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new AttachFastClick(document.body)

let VConsole = require('vconsole')
// eslint-disable-next-line no-new
new VConsole()

Vue.use(Install, {
  custConf: appConfig,
  pltConf: appPlatform
})

register()

new Vue({
  i18n,
  router,
  store,
  render: h => h(Root)
}).$mount('#app')

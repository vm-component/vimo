import Vue from 'vue'
import AttachFastClick from 'fastclick'
import APP_CONFIGS from './config/app-configs'
import PLATFORM_CONFIGS from './config/platform-configs'
import 'ionicons/dist/css/ionicons.css'
import router from './router'
import store from './store.js'
import AppComponent from './App.vue'
import InstallComponent from './Component'
import { App, Content, Footer, Header, Install, Nav, Navbar, Page } from 'vimo'
import './util/polyfill'
import '@babel/polyfill'

// -----------------
// 平台基础安装
Vue.use(Install, {
  custConf: APP_CONFIGS,
  pltConf: PLATFORM_CONFIGS,
  router: router
})

// 全局注册的组件(核心组件)
Vue.component(App.name, App)
Vue.component(Nav.name, Nav)
Vue.component(Navbar.name, Navbar)
Vue.component(Page.name, Page)
Vue.component(Header.name, Header)
Vue.component(Content.name, Content)
Vue.component(Footer.name, Footer)
// -----------------
InstallComponent(Vue)
// -----------------

if (process.env.NODE_ENV === 'development') {
  /**
   * 开发环境
   * */
  Vue.config.productionTip = true
  // 安装vconsole
  let VConsole = require('vconsole')
  // eslint-disable-next-line no-new
  new VConsole()
} else {

}
// eslint-disable-next-line no-new
new AttachFastClick(document.body)
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  template: '<AppComponent/>',
  created () {
    window.VM.platform.ready().then((data) => {
      window.VM.platform.setNavbarTitle({
        title: 'Test title'
      })
      console.debug(`Platform Ready && Init Info: ${data}`)
    }, (data) => {
      console.error(`Platform Ready && Init Info: ${data}`)
    })
  },
  components: { AppComponent }
})

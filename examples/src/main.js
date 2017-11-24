import Vue from 'vue'
import AttachFastClick from 'fastclick'
import APP_CONFIGS from './config/app-configs'
import PLATFORM_CONFIGS from './config/platform-configs'
import 'ionicons/dist/css/ionicons.css'
import Vimo from 'vimo/install'
import router from './router'
import store from './store.js'
import AppComponent from './App.vue'
import InstallComponent from './Component'
import { App, Content, Footer, Header, Nav, Navbar, Page } from 'vimo'

// -----------------
// 平台基础安装
Vue.use(Vimo, {
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

// eslint-disable-next-line no-new
new AttachFastClick(document.body)
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  template: '<AppComponent/>',
  created () {
    this.$platform.ready().then((data) => {
      console.log(`Platform Ready && Init Info: ${data}`)
    }, (data) => {
      console.error(`Platform Ready && Init Info: ${data}`)
    })
  },
  components: {AppComponent}
})

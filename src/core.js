import { setupConfig } from './config/config'
import { setupHistory } from './config/history'
import { setupPlatform } from './config/platform'

import App from './components/app/app.vue'
import Header from './components/page/header.vue'
import Footer from './components/page/footer.vue'
import Nav from './components/nav/nav.vue'
import Page from './components/page/page.vue'
import Content from './components/content/content.vue'
import Navbar from './components/navbar/navbar.vue'

const VERSION = require('../package.json').version
const addLogo = (vimoVer, vueVer) => {
  // logo
  var vimoLogo = {
    info: 'Powered by Vimo@' + vimoVer + ' and based on Vue@' + vueVer + ' \n源代码请访问GitHub https://github.com/nostaff/Vimo'
  }
  window.console && console.info && console.info(vimoLogo.info)
}

export default function core (Vue, options) {
  const eventBus = new Vue()

  // 全局事件总线（各个组件共用）中央事件总线
  Vue.prototype.$eventBus = eventBus

  // init config (config/platform/history)
  const platform = setupPlatform(options.pltConf)
  const config = setupConfig(options.custConf, platform)
  const history = setupHistory(options.router, config, platform)

  // 全局注册
  window.VM = {
    platform,
    config,
    history,
    router: options.router || {},
    version: VERSION,
    vm: Vue
  }

  Vue.prototype.$config = config
  Vue.prototype.$platform = platform
  Vue.prototype.$history = history // 监听route变化, 内建历史记录

  // 全局注册的组件(核心组件)
  Vue.component(App.name, App)
  Vue.component(Nav.name, Nav)
  Vue.component(Navbar.name, Navbar)
  Vue.component(Page.name, Page)
  Vue.component(Header.name, Header)
  Vue.component(Content.name, Content)
  Vue.component(Footer.name, Footer)

  // add logo
  addLogo(VERSION, Vue.version)

  // ready event for VimoReady
  var ev = document.createEvent('HTMLEvents')
  ev.initEvent('VimoReady', false, false)
  document.dispatchEvent(ev)
}
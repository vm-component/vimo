import { setupConfig } from './components/base/config'
import { setupHistory } from './components/base/history'
import { setupPlatform } from './components/base/platform'

import App from './components/base/app/app.vue'
import Header from './components/base/app/header.vue'
import Footer from './components/base/app/footer.vue'
import Nav from './components/base/nav/nav.vue'
import Page from './components/base/page/page.vue'
import Content from './components/base/content/content.vue'
import Navbar from './components/base/navbar/navbar.vue'

const VERSION = require('../package.json').version
const addLogo = (vimoVer, vueVer) => {
  // logo
  var vimoLogo = {
    info: 'Powered by Vimo@' + vimoVer + ' and based on Vue@' + vueVer + ' \n源代码请访问GitHub https://github.com/vm-component/Vimo'
  }
  window.console && console.info && console.info(vimoLogo.info)
}

export default function core (Vue, options) {
  const eventBus = new Vue()

  // 全局事件总线（各个组件共用）中央事件总线
  Vue.prototype.$eventBus = eventBus

  // init base (config/platform/history)
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
import { setupConfig } from './base/config'
import { History } from './base/history'
import { setupPlatform } from './base/platform'
// Core
import { App, Footer, Header } from './components/app'
import { Content } from './components/content'
import { Nav } from './components/nav'
import { Page } from './components/page'
// polyfill
import './util/polyfill'

/**
 * @name initVimo
 * @description Vimo框架安装
 */
const VERSION = '0.3.7'
export default {
  installed: false,
  version: VERSION,
  install (Vue, options = {}) {
    window.VM = {}
    // init base (config/platform)
    setupConfig(options.custConf, setupPlatform(options.pltConf))

    // 全局事件总线（各个组件共用）中央事件总线
    Vue.prototype.$eventBus = new Vue()
    Vue.prototype.$config = window.VM.config
    Vue.prototype.$platform = window.VM.platform
    // 监听route变化, 内建历史记录
    Vue.prototype.$history = window.VM.history = new History(Vue, options.router)

    // 安装必要组件
    if (!window.VM) {
      console.error('Component install need VM!::<Function>install()')
      return false
    }

    // 全局注册的组件(核心组件)
    Vue.component(App.name, App)
    Vue.component(Nav.name, Nav)
    Vue.component(Page.name, Page)
    Vue.component(Header.name, Header)
    Vue.component(Content.name, Content)
    Vue.component(Footer.name, Footer)

    // add logo
    addLogo(VERSION, Vue.version)

    window.VM.version = VERSION
  }
}

function addLogo (vimoVer, vueVer) {
  // logo
  var vimoLogo = {
    info: '源代码请访问GitHub https://github.com/DTFE/Vimo \nPowered by Vue' + vueVer,
    logo: '\n'
    + '  __      __ _____ __  __  ____   \n'
    + '  \\ \\    / /|_   _|  \\/  |/ __ \\  \n'
    + '   \\ \\  / /   | | | \\  / | |  | | \n'
    + '    \\ \\/ /    | | | |\\/| | |  | | \n'
    + '     \\  /    _| |_| |  | | |__| | \n'
    + '      \\/    |_____|_|  |_|\\____/  v' + vimoVer
  }
  window.console && console.info && console.info(vimoLogo.logo + '\n' + vimoLogo.info)
}
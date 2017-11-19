import { setupConfig } from './config/config'
import { setupHistory } from './config/history'
import { setupPlatform } from './config/platform'

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

  console.log(options)
  // 全局事件总线（各个组件共用）中央事件总线
  Vue.prototype.$eventBus = eventBus

  // init config (config/platform/history)
  const platform = setupPlatform(options.pltConf)
  const config = setupConfig(options.appConf, platform)
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

  // add logo
  addLogo(VERSION, Vue.version)

  // ready event for VimoReady
  // var ev = document.createEvent('HTMLEvents')
  // ev.initEvent('VimoReady', false, false)
  // document.dispatchEvent(ev)
}
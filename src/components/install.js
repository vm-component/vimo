import { version } from '../../package.json'

import Config from 'tp-config'
import { setupPlatform } from 'tp-platform'

const addLogo = (vimoVer, vueVer) => {
  // logo
  var vimoLogo = {
    info: 'Powered by Vimo@' + vimoVer + ' and based on Vue@' + vueVer + ' \n源代码请访问GitHub https://github.com/vm-component/vimo'
  }
  window.console && console.info && console.info(vimoLogo.info)
}

export default function install (Vue, options) {
  if (!options) {
    throw new Error('options ??')
  }
  const platform = setupPlatform(options.pltConf || {})
  const platformSettings = platform.settings()
  const config = new Config(Object.assign({}, options.custConf || {}, platformSettings))
  // 全局注册
  window.VM = {
    platform,
    config,
    version: version,
    vm: Vue
  }

  Vue.prototype.$config = config
  Vue.prototype.$platform = platform

  // add logo
  addLogo(version, Vue.version)

  // ready event for VimoReady
  var event = document.createEvent('CustomEvent')
  event.initCustomEvent('VimoReady', true, false, '')
  document.dispatchEvent(event)
}

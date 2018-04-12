// import { setupConfig } from '../.backup/config/config'
// import { setupHistory } from '../.backup/history/history'
// import { setupPlatform } from '../.backup/platform/platform'
// import { version } from '../../package.json'
//
// const addLogo = (vimoVer, vueVer) => {
//   // logo
//   var vimoLogo = {
//     info: 'Powered by Vimo@' + vimoVer + ' and based on Vue@' + vueVer + ' \n源代码请访问GitHub https://github.com/vm-component/vimo'
//   }
//   window.console && console.info && console.info(vimoLogo.info)
// }
//
// export default function install (Vue, options) {
//   // init base (config/platform/history)
//   const platform = setupPlatform(options.pltConf)
//   const config = setupConfig(options.custConf, platform)
//   const history = setupHistory(options.router, config, platform)
//
//   // 全局注册
//   window.VM = {
//     platform,
//     config,
//     history,
//     router: options.router || {},
//     version: version,
//     vm: Vue
//   }
//
//   // Vue.prototype.$config = config
//   // Vue.prototype.$platform = platform
//   // Vue.prototype.$history = history // 监听route变化, 内建历史记录
//
//   // add logo
//   // addLogo(version, Vue.version)
//
//   // ready event for VimoReady
//   var ev = document.createEvent('HTMLEvents')
//   ev.initEvent('VimoReady', false, false)
//   document.dispatchEvent(ev)
// }

/**
 * Created by Hsiang on 2017/2/22.
 * @name initVimo
 * @description Vimo框架安装
 */
module.exports = {
  initVimoPlatform,
  initVimoModules,
  initVimoComponents,
};

/**
 * @function initVimoPlatform
 * @description
 * 初始化Vimo平台
 * 在导出vimo组件之前,需要初始化完毕config和platform两个模块
 * 两个模块的实例将挂载在:
 * window.VM = {
 *    config,
 *    platform,
 * }
 * */
function initVimoPlatform (CUSTOMER_CONFIGS, PLATFORM_CONFIGS, callback) {
  let setupConfig = require('./base/config');
  let setupPlatform = require('./base/platform');
  setupConfig(CUSTOMER_CONFIGS, setupPlatform(PLATFORM_CONFIGS));
  callback && callback()
}

// import geolocation from '/**/./geolocation/geoStart'
// import log from './log/log'
// import './util/iscroll'

/**
 * @function initVimoComponents
 * @description
 * vimo组件安装, 包括模块及页面组件
 *
 * */
function initVimoModules (Vue) {
  let Storage = require('vm-storage');
  // let Log = require('./log');
  Vue.use(Storage, {
    prefix: 'vvmm-'
  });
  // // 日志服务
  // Vue.use(Log, {
  //   isDev: false, // 开发模式,
  //   needLogPage: false, // 打开日志界面
  // })
  // Vue.use(geolocation);
  // logo
  var vimoLogo = {
    info: "源代码请访问GitHub https://github.com/DTFE/Vimo \nPowered by Vue2.x",
    logo: "\n"
    + "  __      __ _____ __  __  ____   \n"
    + "  \\ \\    / /|_   _|  \\/  |/ __ \\  \n"
    + "   \\ \\  / /   | | | \\  / | |  | | \n"
    + "    \\ \\/ /    | | | |\\/| | |  | | \n"
    + "     \\  /    _| |_| |  | | |__| | \n"
    + "      \\/    |_____|_|  |_|\\____/    "
  };
  window.console && console.info && console.info(vimoLogo.logo + "\n" + vimoLogo.info)
}

function initVimoComponents (Vue,options) {
  let components = require('./components')
  Vue.use(components,options)
}




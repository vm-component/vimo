/**
 * Created by Hsiang on 2017/2/22.
 *
 * @name initVimo
 * @description Vimo框架安装
 *
 * 在这里完成config/platform的初始化工作,
 * 之后完成component的全局安装工作
 *
 * CUSTOMER_CONFIG: 为用户自定义配置
 *
 */
console.time("Platform初始化时间");
import { setupPlatform } from './platform/platform'
import { setupConfig } from './config/config'
import Storage from './storage/storage'

import './util/iscroll'
// import _console  from './console/console'

// import vueLogger from 'vue-logger'
import log from './log/log'



// 用户配置
const CUSTOMER_CONFIG = {
  // ...
};

// 初始化platform/初始化config
setupConfig(CUSTOMER_CONFIG, setupPlatform());
console.timeEnd("Platform初始化时间");

export const initVimo = function (Vue) {

  // Vue.use(_console);
  // Vue.use(vueLogger, { prefix: new Date(), dev: true })
  Vue.use(log,{
    isDev:true,
    needLogPage:true,
  })


  console.time("Component引用时间");
  let component = require('./components')
  console.timeEnd("Component引用时间");

  // Vue.use(_console);
  console.time("Storage安装时间");
  Vue.use(Storage);
  console.timeEnd("Storage安装时间");

  console.time("Component安装时间");
  component.install(Vue, CUSTOMER_CONFIG);
  console.timeEnd("Component安装时间");


  // logo
  var vimoLogo = {
    info: "源代码请访问GitHub https://github.com/DTFE/Vimo \nPowered by Vue2.1",
    logo: "\n"
    + "  __      __ _____ __  __  ____   \n"
    + "  \\ \\    / /|_   _|  \\/  |/ __ \\  \n"
    + "   \\ \\  / /   | | | \\  / | |  | | \n"
    + "    \\ \\/ /    | | | |\\/| | |  | | \n"
    + "     \\  /    _| |_| |  | | |__| | \n"
    + "      \\/    |_____|_|  |_|\\____/    "
  };
  window.console && console.info && console.info(vimoLogo.logo + "\n" + vimoLogo.info)

  // console.debug('VimoInstall success!')
  // console.debug(VM.platform)
  // console.debug(VM.config)

}





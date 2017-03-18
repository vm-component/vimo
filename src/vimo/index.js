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
 * CUSTOMER_CONFIG: 为用户自定义配置
 * CUSTOMER_CONFIG: 为用户自定义配置
 *
 */
console.time("Platform初始化时间");
import { setupPlatform } from './platform/platform'
import { setupConfig } from './config/config'
import geolocation from './geolocation/geoStart'


import Storage from 'vm-storage'



import log from './log/log'
import './util/iscroll'


// 用户配置
const CUSTOMER_CONFIG = {
  // ...
};

// 初始化platform/初始化config
setupConfig(CUSTOMER_CONFIG, setupPlatform());
console.timeEnd("Platform初始化时间");

export const initVimo = function (Vue) {

  // 日志服务

  // Vue.use(log,{
  //   isDev:true, // 开发模式,
  //   needLogPage:true, // 打开日志界面
  // })


  console.time("Component引用时间");
  let component = require('./components')
  console.timeEnd("Component引用时间");

  // Vue.use(_console);
  console.time("Storage安装时间");
  Vue.use(Storage);
  console.timeEnd("Storage安装时间");

  console.time("geolocation安装时间");
  Vue.use(geolocation);
  console.timeEnd("geolocation安装时间");

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





/**
 * Created by Hsiang on 2017/2/22.
 * @name initVimo
 * @description Vimo框架安装
 */
import Vue from 'vue';
import { setupConfig } from './base/config'
import { setupPlatform } from './base/platform'
import { NavContorller } from "./components/nav-controller"
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
 * @param {object} custConf - 用户业务配置
 * @param {object} pltConf - 平台配置
 * @param {function} callback - 平台初始化完毕的回调, 这时, platform完成了initialize中定义的过程
 * */
export function initVimo (custConf, pltConf, callback) {
  // init base (config/platform)
  setupConfig(custConf, setupPlatform(pltConf));

  // 全局事件总线（各个组件共用）中央事件总线
  Vue.prototype.$eventBus = new Vue();
  Vue.prototype.$config = VM && VM.config;
  Vue.prototype.$platform = VM && VM.platform;
  // 内建历史记录, 监听route变化并发出Nav切换事件
  Vue.prototype.$nav = new NavContorller(Vue);

  // 安装必要组件
  let components = require('./components/index.js').components;
  Vue.use(components)

  // add logo
  addLogo();

  VM.platform.ready().then(function (data) {
    callback && callback(data)
  });
}

function addLogo () {
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
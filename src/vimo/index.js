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

import { setupPlatform } from './platform/platform'
import { setupConfig } from './config/config'

import './util/iscroll'
import _console  from './console/console'
// 用户配置
const CUSTOMER_CONFIG = {
  // ...
};
// 初始化platform/初始化config
setupConfig(CUSTOMER_CONFIG, setupPlatform());

export const initVimo = function (Vue) {
  let component = require('./components')
  Vue.use(_console);
  component.install(Vue, CUSTOMER_CONFIG);
  // console.debug('VimoInstall success!')
  // console.debug(VM.platform)
  // console.debug(VM.config)
}

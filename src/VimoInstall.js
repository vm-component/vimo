/**
 * Created by Hsiang on 2017/2/19.
 * 首先完成平台的初始化
 */

import { setupPlatform } from './platform/platform'
import { setupConfig } from './config/config'
module.export = (function () {
  // 用户配置
  const CUSTOMER_CONFIG = {};
  // 初始化platform/初始化config
  setupConfig(CUSTOMER_CONFIG, setupPlatform());
  console.debug('VimoInstall success!')
  console.debug(VM.platform)
  console.debug(VM.config)
})();

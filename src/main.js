// 配置
import PLATFORM_CONFIGS from './config/platform-configs'
import APP_CONFIGS from './config/app-configs'
import router from './router'
import Vue from 'vue'
import App from './App'
import attachFastClick from 'fastclick'
import { initVimo } from 'vimo'

/* eslint-disable no-new */

new attachFastClick(document.body)
// Vue.config.productionTip = false;
// 平台基础安装
initVimo(APP_CONFIGS, PLATFORM_CONFIGS, function (data) {
  console.debug('****  Platform ready info: ' + data + '  ****')

  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    mounted () {},
    created () {},
    components: {App}
  })

})


/* eslint-disable no-undef,no-unused-expressions */
/**
 * 因为mocha是异步执行describe测试，所以vimo的安装在当前文件中进行，保证只引入一次，就能获取window.VM全局变量
 * */
import 'ionicons/dist/css/ionicons.css'
import Vue from 'vue'
import vimo from '../../../components/dist'
import APP_CONFIGS from '../../../examples/src/config/app-configs'
import PLATFORM_CONFIGS from '../../../examples/src/config/platform-configs'
import router from '../../../examples/src/router'

Vue.use(vimo, {
  custConf: APP_CONFIGS,
  pltConf: PLATFORM_CONFIGS,
  router: router
})
Vue.config.devtools = false
Vue.config.silent = true
Vue.config.errorHandler = (err) => !~err.toString().indexOf('$el') && console.error(err)

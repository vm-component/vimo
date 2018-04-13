import 'ionicons/dist/css/ionicons.css'
import Vue from 'vue'
import Root from './Root.vue'
import router from './router'
import register from './register'
import appConfig from './config'
import appPlatform from './platform'
import Install from 'vimo/components/install.js'

Vue.config.productionTip = false

Vue.use(Install, {
  custConf: appConfig,
  pltConf: appPlatform
})

register()

new Vue({
  router,
  render: h => h(Root)
}).$mount('#app')

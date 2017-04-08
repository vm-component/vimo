// 配置

import router from './router'
import Vue from 'vue'
import App from './App'
import PLATFORM_CONFIGS from './config/platform-configs'
import APP_CONFIGS from './config/app-configs'
import attachFastClick from 'fastclick'
import vimo from 'vimo'

import { ActionSheet } from 'vimo/components/action-sheet'
import { Loading } from 'vimo/components/loading'
import { Alert } from 'vimo/components/alert'
import { Toast } from 'vimo/components/toast'
import { Modal } from 'vimo/components/modal'
import { Icon } from 'vimo/components/icon'
import { Backdrop } from 'vimo/components/backdrop'
import { Grid, Row, Column } from 'vimo/components/grid'

import 'ionicons/dist/css/ionicons.css'

/* eslint-disable no-new */
new attachFastClick(document.body)
// Vue.config.productionTip = false;
// 平台基础安装
Vue.use(vimo, {
  custConf: APP_CONFIGS,
  pltConf: PLATFORM_CONFIGS,
  router: router,
})

Vue.component(Backdrop.name, Backdrop)
Vue.component(Icon.name, Icon)
Vue.component(Grid.name, Grid)
Vue.component(Row.name, Row)
Vue.component(Column.name, Column)

Vue.prototype.$actionSheet = ActionSheet
Vue.prototype.$loading = Loading
Vue.prototype.$alert = Alert
Vue.prototype.$toast = Toast
Vue.prototype.$modal = Modal

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  created () {
    this.$platform.ready().then((data) => {
      console.debug(data)
    })
  },
  mounted () {},
  components: {App}
})
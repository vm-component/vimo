/* eslint-disable no-new */
import AttachFastClick from './assets/js/fastclick'
import 'ionicons/dist/css/ionicons.css'

import vimo from 'vimo'
// 全局组件
import { ActionSheet } from 'vimo/components/action-sheet'
import { Alert } from 'vimo/components/alert'
import { Backdrop } from 'vimo/components/backdrop'
import { Button } from 'vimo/components/button'
import { Column, Grid, Row } from 'vimo/components/grid'
import { Icon } from 'vimo/components/icon'
import { Indicator } from 'vimo/components/indicator'
import { Loading } from 'vimo/components/loading'
import { Modal } from 'vimo/components/modal'
import { Navbar } from 'vimo/components/navbar'
import { Spinner } from 'vimo/components/spinner'
import { Toast } from 'vimo/components/toast'
import { Buttons, Title, Toolbar } from 'vimo/components/toolbar'
import Vue from 'vue'
import App from './App.vue'
import APP_CONFIGS from './config/app-configs'
import PLATFORM_CONFIGS from './config/platform-configs'
import router from './router'
new AttachFastClick(document.body)

// Vue.config.productionTip = false;
// 平台基础安装
Vue.use(vimo, {
  custConf: APP_CONFIGS,
  pltConf: PLATFORM_CONFIGS,
  router: router
})

Vue.component(Backdrop.name, Backdrop)
Vue.component(Icon.name, Icon)
Vue.component(Grid.name, Grid)
Vue.component(Row.name, Row)
Vue.component(Column.name, Column)
Vue.component(Spinner.name, Spinner)
Vue.component(Button.name, Button)
Vue.component(Navbar.name, Navbar)
Vue.component(Toolbar.name, Toolbar)
Vue.component(Title.name, Title)
Vue.component(Buttons.name, Buttons)

Vue.prototype.$actionSheet = ActionSheet
Vue.prototype.$loading = Loading
Vue.prototype.$alert = Alert
Vue.prototype.$toast = Toast
Vue.prototype.$modal = Modal
Vue.prototype.$indicator = Indicator

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

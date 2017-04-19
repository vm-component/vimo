// 配置

import router from './router'
import Vue from 'vue'
import App from './App'
import PLATFORM_CONFIGS from './config/platform-configs'
import APP_CONFIGS from './config/app-configs'
import AttachFastClick from 'fastclick'
import vimo from 'vimo'
// 全局组件
import { ActionSheet } from 'vimo/components/action-sheet'
import { Loading } from 'vimo/components/loading'
import { Alert } from 'vimo/components/alert'
import { Toast } from 'vimo/components/toast'
import { Modal } from 'vimo/components/modal'
import { Icon } from 'vimo/components/icon'
import { Backdrop } from 'vimo/components/backdrop'
import { Spinner } from 'vimo/components/spinner'
import { Column, Grid, Row } from 'vimo/components/grid'
import { Button } from 'vimo/components/button'
import { Navbar } from 'vimo/components/navbar'
import { Toolbar, ToolbarButtons, ToolbarTitle } from 'vimo/components/toolbar'

import 'ionicons/dist/css/ionicons.css'

/* eslint-disable no-new */
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
Vue.component(ToolbarTitle.name, ToolbarTitle)
Vue.component(ToolbarButtons.name, ToolbarButtons)

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

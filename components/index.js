/**
 * Created by Hsiang on 2017/1/13.
 *
 * 此文件完成以下任务：
 * 1. 基础组件初始化及注册
 *
 */
// Core
import { App, Header, Footer } from './app'
import { Content } from './content'
import { Page } from './page'
import { Nav } from './nav'
import { Grid, Row, Col } from './grid'
import { BackdropComponent, BackdropInstance } from './backdrop'
import { Spinner } from './spinner'
import { Button } from './button'
import { Navbar } from './navbar'
import { Toolbar, ToolbarTitle, ToolbarButtons } from './toolbar'
import { Icon } from './icon'

// 实例化调用部分
import { ActionSheet } from './action-sheet'
import { Loading } from './loading'
import { Alert } from './alert'
import { Toast } from './toast'
import { Modal } from './modal'

// install安装必要+核心组件, 其余的自己传到组件中
const install = (Vue) => {
  if (!window.VM) {
    console.error('Component install need VM!::<Function>install')
    return false
  }

  // 全局注册的组件(核心组件)
  Vue.component(App.name, App)
  Vue.component(Header.name, Header)
  Vue.component(Footer.name, Footer)
  Vue.component(Content.name, Content)
  Vue.component(Page.name, Page)
  Vue.component(Nav.name, Nav)
  Vue.component(Grid.name, Grid)
  Vue.component(Row.name, Row)
  Vue.component(Col.name, Col)
  Vue.component(BackdropComponent.name, BackdropComponent)
  Vue.component(Spinner.name, Spinner)
  Vue.component(Button.name, Button)
  Vue.component(Navbar.name, Navbar)
  Vue.component(Toolbar.name, Toolbar)
  Vue.component(ToolbarTitle.name, ToolbarTitle)
  Vue.component(ToolbarButtons.name, ToolbarButtons)
  Vue.component(Icon.name, Icon)

  // 实例化调用部分
  Vue.prototype.$actionSheet = ActionSheet
  Vue.prototype.$loading = Loading
  Vue.prototype.$backdrop = BackdropInstance
  Vue.prototype.$alert = Alert
  Vue.prototype.$toast = Toast
  Vue.prototype.$modal = Modal
}

export const components = {
  version: '0.0.1',
  message: 'Install Basic Components!',
  install
}
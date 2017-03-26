/**
 * @name initVimo
 * @description Vimo框架安装
 */
import { setupConfig } from './base/config'
import { setupPlatform } from './base/platform'
import { NavContorller } from './components/nav-controller'

// Core
import { App, Header, Footer } from './components/app'
import { Content } from './components/content'
import { Page } from './components/page'
import { Nav } from './components/nav'
import { Grid, Row, Col } from './components/grid'
import { Spinner } from './components/spinner'
import { Button } from './components/button'
import { Navbar } from './components/navbar'
import { Toolbar, ToolbarTitle, ToolbarButtons } from './components/toolbar'

export default {
  version: '0.1.1',
  installed: false,
  install (Vue, options = {}) {

    // init base (config/platform)
    setupConfig(options.custConf, setupPlatform(options.pltConf));

    // 全局事件总线（各个组件共用）中央事件总线
    Vue.prototype.$eventBus = new Vue()
    Vue.prototype.$config = window.VM && window.VM.config
    Vue.prototype.$platform = window.VM && window.VM.platform
    // 内建历史记录, 监听route变化并发出Nav切换事件
    Vue.prototype.$history = new NavContorller(Vue)

    // 安装必要组件
    if (!window.VM) {
      console.error('Component install need VM!::<Function>install()')
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
    Vue.component(Spinner.name, Spinner)
    Vue.component(Button.name, Button)
    Vue.component(Navbar.name, Navbar)
    Vue.component(Toolbar.name, Toolbar)
    Vue.component(ToolbarTitle.name, ToolbarTitle)
    Vue.component(ToolbarButtons.name, ToolbarButtons)

    // add logo
    addLogo()
  }
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
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// ------- Install
import './VimoInstall'

//
import Vue from 'vue';
import App from './App';
import routerFactory from './router.js';
import attachFastClick from 'fastclick';
import Components from './components';

new attachFastClick(document.body);
let router = routerFactory(Vue);

/**
 * $router全局化，便于外部js调用
 * */
// window.$router = routerFactory(Vue);

/* eslint-disable no-new */

// 全局组件继承
// let Component = Vue.extend({
//
//   hello:'hello to here'
// });
//
// new Component({
//   el: '#app',
//   router,
//   template: '<App/>',
//   mounted () {
//     console.log('root this;')
//     console.log(this)
//   },
//   components: {App}
// });

// import { ClickBlock } from "./util/click-block"
//
// Vue.nextTick(function () {
//   let clickBlcok = new ClickBlock();
//
//   clickBlcok.activate(true, 4000)
//
// })

// import { providePlatformConfigs } from './platform/platform-registry'
// import { setupPlatform } from './platform/platform'
// import { setupConfig } from './config/config'
// import { registerModeConfigs } from './config/mode-registry'

// /**
//  * //providePlatformConfigs() -> platform-registry.js
//  *
//  * 需要在这里完成platform和config的初始化
//  * setupPlatform() -> platform.js
//  * setupConfig() -> config.js
//  * setupComponent() -> 初始化组件
//  *
//  * 之后完成平台特性注册
//  * registerModeConfigs() -> mode-registry.js
//  * // registerTransitions()
//  * // setupProvideEvents()
//  * // setupTapClick()
//  * */

// // 用户配置
// const CUSTOMER_CONFIG = {};
// let platformConfigs = providePlatformConfigs();
// // 初始化平台
// let platform = setupPlatform(platformConfigs);
// // config初始化
// let config = setupConfig(CUSTOMER_CONFIG, platform);
// // 注册ios/md/wp三个平台的默认配置
// registerModeConfigs(config)

// VM.platform.ready().then((data) => {
//
//
// });

Vue.use(Components, {});

VM.platform.ready().then(function (data) {
  console.debug('****  Platform ready info: ' + data + '  ****');
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    mounted () {},
    components: {App}
  });
})



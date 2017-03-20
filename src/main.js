/**
 * @name 主入口
 * @description
 *
 * 在这里完成初始化工作及页面启动, hello
 *
 * */
// 配置
import { PLATFORM_CONFIGS } from './config/platform-configs'
import { APP_CONFIGS } from './config/app-configs'
import Vue from 'vue';
import App from './App';
import attachFastClick from 'fastclick';
import routerFactory from './router.js';
import { initVimoPlatform, initVimoModules, initVimoComponents } from './vimo'
let router = routerFactory(Vue);
new attachFastClick(document.body);

// 平台基础安装
initVimoPlatform(APP_CONFIGS, PLATFORM_CONFIGS, function () {
  // 模块安装
  initVimoModules(Vue);
  // 组件安装
  initVimoComponents(Vue, {
    componentList: [],
  });
});

VM.platform.ready().then(function (data) {
  console.debug('****  Platform ready info: ' + data + '  ****');
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    mounted () {
      this.$localStorage.setItem('hello', 'songtao')
    },
    components: {App}
  });
})

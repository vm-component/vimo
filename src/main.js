/**
 * @name 主入口
 * @description
 *
 * 在这里完成初始化工作及页面启动, hello
 *
 * */

import Vue from 'vue';
import { initVimo } from './vimo/index.js'
import App from './App';
import routerFactory from './router.js';
import attachFastClick from 'fastclick';


/**
 * 完成安装及初始化工作
 * */
initVimo(Vue);
new attachFastClick(document.body);
let router = routerFactory(Vue);



/**
 * 平台初始化完毕后触发ready回调
 * */
VM.platform.ready().then(function (data) {
  console.debug('****  Platform ready info: ' + data + '  ****');
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    mounted () {
    },
    components: {App}
  });
})





// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import routerFactory from './router.js';
import attachFastClick from 'fastclick';
new attachFastClick(document.body);

let router = routerFactory(Vue);
// import './register'


// 组件注册
import Components from './components'
Vue.use(Components,{
  // 组件初始化参数
  a:1,
  b:1,
});


/**
 * $router全局化，便于外部js调用
 * */
// window.$router = routerFactory(Vue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  mounted: function () {
    // console.log('root this;')
    // console.log(this)
  },
  components: {App}
});

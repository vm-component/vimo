/**
 * Created by Hsiang on 16/12/12.
 * 路由
 */
'use strict';
import VueRouter from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'index',
    // meta: {
    //   inMenu: true,
    // },
    component: require('./views/index.vue'),
  },
  {
    path: '/introduce',
    name: 'introduce',
    component: require('./views/introduce.vue'),
  },
  {
    path: '/app',
    name: 'app',
    // meta: {
    //   inMenu: true, // 当前点击是否对
    // },
    component: require('./views/app.vue'),
  },
  {
    path: '/action-sheet',
    name: 'actionSheet',
    meta: {
      inMenu: true,
    },
    component: require('./views/action-sheet.vue'),
  },
  {
    path: '/backdrop',
    name: 'backdrop',
    component: require('./views/backdrop.vue'),
  },
  {
    path: '/button',
    name: 'button',
    component: require('./views/button.vue'),
  },
  {
    path: '/icon',
    name: 'icon',
    component: require('./views/icon.vue'),
  },
  {
    path: '/alert',
    name: 'alert',
    component: require('./views/alert.vue'),
  },
  {
    path: '/toast',
    name: 'toast',
    component: require('./views/toast.vue'),
  },
  {
    path: '/spinner',
    name: 'spinner',
    component: require('./views/spinner.vue'),
  },
  {
    path: '/loading',
    name: 'loading',
    component: require('./views/loading.vue'),
  },
  {
    path: '/toolbar',
    name: 'toolbar',
    component: require('./views/toolbar.vue'),
  },
  {
    path: '/segment',
    name: 'segment',
    component: require('./views/segment.vue'),
  },
  {
    path: '/searchbar',
    name: 'searchbar',
    component: require('./views/searchbar.vue'),
  },
  {
    path: '/list',
    name: 'list',
    component: require('./views/list.vue'),
  },
  {
    path: '/tabs',
    name: 'tabs',
    component: require('./views/tabs.vue'),
  },
  {
    path: '/content',
    name: 'content',
    component: require('./views/content.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash', //  hash 模式  history 模式
  base: '/', // 默认值: "/",应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
  routes: routes // （缩写）相当于 routes: routes
});

function routerFactory (Vue) {
  Vue.use(VueRouter);

  router.beforeEach((to, from, next) => {
    // 如果路由切换的时候Menu是开启的($currentMenuId)，
    // 则掉起$closeMenu()，之后监听ionClose事件，
    // 再执行next();
    if(!!Vue.prototype.$actionSheet && Vue.prototype.$actionSheet.isActive){
      Vue.prototype.$actionSheet.dismiss().then(function () {
        // next()
      },function () {
        // next(false)
      });
      next()
    }else if (!!Vue.prototype.$menu && !!Vue.prototype.$menu.currentMenuId) {
      Vue.prototype.$menu.close().then(function () {
        next();
      },function () {
        next(false);
      });
    }else{
      next();
    }
  });

  return router
}
module.exports = routerFactory



/**
 * Created by Hsiang on 16/12/12.
 *
 * @name router
 * @description
 *
 * 生成路由实例的工厂函数
 *
 */
'use strict';
import VueRouter from 'vue-router';

/**
 * 路由配置表
 * */
const routes = [
  // index
  {
    path: '/',
    name: 'index',
    meta: {
      root: true,
    },
    component: require('./views/index.vue'),
  },

  {
    path: '/components',
    name: 'components',
    component: require('./views/components.vue'),
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
    path: '/modal',
    name: 'modal',
    component: require('./views/modal.vue'),
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
    path: '/input',
    name: 'input',
    component: require('./views/input.vue'),
  },
  {
    path: '/grid',
    name: 'grid',
    component: require('./views/grid.vue'),
  },

  // cards
  {
    path: '/cards',
    name: 'cards',
    component: require('./views/cards.vue'),
  },
  {
    path: '/basicCards',
    name: 'cards.basicCards',
    component: require('./views/cards/basicCards.vue'),
  },
  {
    path: '/listsInCards',
    name: 'cards.listsInCards',
    component: require('./views/cards/listsInCards.vue'),
  },
  {
    path: '/advancedCards',
    name: 'cards.advancedCards',
    component: require('./views/cards/advancedCards.vue'),
  },

  {
    path: '/searchbar',
    name: 'searchbar',
    component: require('./views/searchbar.vue'),
  },
  //list组件系列
  {
    path: '/list',
    name: 'list',
    component: require('./views/list.vue'),
  },
  {
    path: '/listForAll',
    name: 'list.listForAll',
    component: require('./views/list/listForAll.vue'),
  },
  {
    path: '/basicList',
    name: 'list.basicList',
    component: require('./views/list/basicList.vue'),
  },
  {
    path: '/noLine',
    name: 'list.noLine',
    component: require('./views/list/noLine.vue'),
  },
  {
    path: '/insetList',
    name: 'list.insetList',
    component: require('./views/list/insetList.vue'),
  },
  {
    path: '/listDividers',
    name: 'list.listDividers',
    component: require('./views/list/listDividers.vue'),
  },
  {
    path: '/listHeaders',
    name: 'list.listHeaders',
    component: require('./views/list/listHeaders.vue'),
  },
  {
    path: '/iconList',
    name: 'list.iconList',
    component: require('./views/list/iconList.vue'),
  },
  {
    path: '/avatarList',
    name: 'list.avatarList',
    component: require('./views/list/avatarList.vue'),
  },
  {
    path: '/multi-lineList',
    name: 'list.multi-lineList',
    component: require('./views/list/multi-lineList.vue'),
  },
  {
    path: '/slidingList',
    name: 'list.slidingList',
    component: require('./views/list/slidingList.vue'),
  },
  {
    path: '/thumbnailList',
    name: 'list.thumbnailList',
    component: require('./views/list/ThumbnailList.vue'),
  },
  // Tabs
  {
    path: '/tabs',
    name: 'tabs',
    component: require('./views/tabs.vue'),
    redirect: {name: 'tabs.tab2'},
    children: [
      {
        path: 'tab1',
        name: 'tabs.tab1',
        component: require('./views/tabs/tab1.vue'),
      },
      {
        path: 'tab2',
        name: 'tabs.tab2',
        component: require('./views/tabs/tab2.vue'),
      },
      {
        path: 'tab3',
        name: 'tabs.tab3',
        component: require('./views/tabs/tab3.vue'),
      }
    ]
  },

  {
    path: '/fab',
    name: 'fab',
    component: require('./views/fab.vue'),
  },

  {
    path: '/content',
    name: 'content',
    component: require('./views/content.vue'),
  },
  {
    path: '/demo',
    name: 'demo',
    component: require('./views/demo.vue'),
  },
];

/**
 * 初始化实例
 * */
const router = new VueRouter({
  mode: 'hash', //  hash 模式  history 模式
  base: '/', // 默认值: "/",应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
  routes: routes // （缩写）相当于 routes: routes
});

/**
 * 路由安装及钩子配置
 * */
function routerFactory (Vue) {
  Vue.use(VueRouter);

  Vue.prototype.$history = [];
  /**
   * 全局EventBus事件:
   *
   * 页面级切换, 而不是子页面的切换. 页面切换伴随着nav及content的动画.
   * 这里定义, 在一级路由发生切换时, 才算做页面切换, 子路由的切换不是页面切换
   *
   *
   * onPageIn: 页面进入的事件.
   * onPageBack: 页面离开的事件.
   *
   * */
  router.beforeEach((to, from, next) => {
      let _current = router.currentRoute;
      let _isFromPage = from.matched.length === 1;
      let _isToPage = to.matched.length === 1;

      let localHistoryRecordLength = Vue.prototype.$history.length;

      if (localHistoryRecordLength === 0) {
        /**
         * 当本地维护的历时记录为空, 意味着页面为首次进入, 并未初始化,
         * 此时, 可能我们是从app中的某个页面进入的, 如果后退的话相当于onPageIn, 会产生错乱,
         * 因此, 当从app中的某个页面进入时, 需要判断下history.length
         * */
        // 页面当前没有前进后退
        if (to.meta.root) {
          // 当前进入的是首页
          recordHistory();
        } else {
          // 第一次进入的不是首页则将首页注入为第一个,
          router.push('/');
        }
      } else if (localHistoryRecordLength === 1) {
        recordHistory();
      } else if (localHistoryRecordLength > 1) {
        let _back1Path = Vue.prototype.$history[localHistoryRecordLength - 1];
        let _back2Path = Vue.prototype.$history[localHistoryRecordLength - 2];
        if (to.name != _back2Path.name) {
          recordHistory();
        } else {
          discardHistory();
        }
      }

      function recordHistory () {
        Vue.prototype.$history.push(to);
        if (_isFromPage || _isToPage) {
          !!Vue.prototype.$eventBus && Vue.prototype.$eventBus.$emit('onPageIn', {to, from});
          console.debug('**** onPageIn ****')
        }
      }

      function discardHistory () {
        //激活了浏览器的后退,这里只需要更新状态
        Vue.prototype.$history.pop();
        if (_isFromPage || _isToPage) {
          console.debug('**** onPageBack ****')
          !!Vue.prototype.$eventBus && Vue.prototype.$eventBus.$emit('onPageBack', {to, from});
        }
      }

      function getRoot () {
        router.options

      }

      let a = [];
      Vue.prototype.$history.forEach(function (item) {
        a.push(item.name);
      });
      console.log(a)
      console.log(history.length)

      next();
    }
  )
  ;

  router.afterEach((to, from) => {

  });

  return router
}
module.exports = routerFactory;



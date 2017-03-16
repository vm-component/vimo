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
    path: '/grid',
    name: 'grid',
    component  (resolve) {
      require(['./views/grid.vue'], resolve)
    },
  },

  // ----  menu ----
  {
    path: '/introduce',
    name: 'introduce',
    component  (resolve) {
      require(['./views/introduce.vue'], resolve)
    },
  },
  {
    path: '/howToStart',
    name: 'howToStart',
    component  (resolve) {
      require(['./views/how-to-start.vue'], resolve)
    },
  },
  {
    path: '/equipment',
    name: 'equipment',
    component  (resolve) {
      require(['./views/equipment.vue'], resolve)
    },
  },

  // ----  component ----

  // ----  component/base ----
  {
    path: '/app',
    name: 'app',
    component  (resolve) {
      require(['./views/app.vue'], resolve)
    },
  },
  {
    path: '/content',
    name: 'content',
    component  (resolve) {
      require(['./views/content.vue'], resolve)
    },
  },
  {
    path: '/toolbar',
    name: 'toolbar',
    component  (resolve) {
      require(['./views/toolbar.vue'], resolve)
    },
  },

  // ----  component/弹出层组件 ----
  {
    path: '/action-sheet',
    name: 'actionSheet',
    component  (resolve) {
      require(['./views/action-sheet.vue'], resolve)
    },
  },
  {
    path: '/alert',
    name: 'alert',
    component  (resolve) {
      require(['./views/alert.vue'], resolve)
    },
  },
  {
    path: '/backdrop',
    name: 'backdrop',
    component  (resolve) {
      require(['./views/backdrop.vue'], resolve)
    },
  },
  {
    path: '/loading',
    name: 'loading',
    component  (resolve) {
      require(['./views/loading.vue'], resolve)
    },
  },
  {
    path: '/modal',
    name: 'modal',
    component  (resolve) {
      require(['./views/modal.vue'], resolve)
    },
  },
  {
    path: '/toast',
    name: 'toast',
    component  (resolve) {
      require(['./views/toast.vue'], resolve)
    },
  },

  // ----  component/通用组件 ----

  {
    path: '/button',
    name: 'button',
    component  (resolve) {
      require(['./views/button.vue'], resolve)
    },
  },
  {
    path: '/icon',
    name: 'icon',
    component  (resolve) {
      require(['./views/icon.vue'], resolve)
    },
  },
  {
    path: '/spinner',
    name: 'spinner',
    component  (resolve) {
      require(['./views/spinner.vue'], resolve)
    },
  },
  {
    path: '/fab',
    name: 'fab',
    component  (resolve) {
      require(['./views/fab.vue'], resolve)
    },
  },
  {
    path: '/img',
    name: 'img',
    component  (resolve) {
      require(['./views/img.vue'], resolve)
    },
  },
  {
    path: '/swiper',
    name: 'swiper',
    component  (resolve) {
      require(['./views/swiper.vue'], resolve)
    },
  },

  // cards
  {
    path: '/cards',
    name: 'cards',
    component  (resolve) {
      require(['./views/cards.vue'], resolve)
    },
  },
  {
    path: '/basicCards',
    name: 'cards.basicCards',
    component  (resolve) {
      require(['./views/cards/basicCards.vue'], resolve)
    },
  },
  {
    path: '/listsInCards',
    name: 'cards.listsInCards',
    component  (resolve) {
      require(['./views/cards/listsInCards.vue'], resolve)
    },
  },
  {
    path: '/advancedCards',
    name: 'cards.advancedCards',
    component  (resolve) {
      require(['./views/cards/advancedCards.vue'], resolve)
    },
  },

  // ----  component/Form组件 ----
  {
    path: '/searchbar',
    name: 'searchbar',
    component  (resolve) {
      require(['./views/searchbar.vue'], resolve)
    },
  },
  {
    path: '/input',
    name: 'input',
    component  (resolve) {
      require(['./views/input.vue'], resolve)
    },
  },
  {
    path: '/toggle',
    name: 'toggle',
    component  (resolve) {
      require(['./views/toggle.vue'], resolve)
    },
  },
  {
    path: '/range',
    name: 'range',
    component  (resolve) {
      require(['./views/range.vue'], resolve)
    },
  },

  // ----  component/list组件系列 ----

  {
    path: '/list',
    name: 'list',
    component  (resolve) {
      require(['./views/list.vue'], resolve)
    },
  },
  {
    path: '/infinite-scroll',
    name: 'infinite-scroll',
    component  (resolve) {
      require(['./views/infinite-scroll.vue'], resolve)
    },
  },
  {
    path: '/refresher',
    name: 'refresher',
    component  (resolve) {
      require(['./views/refresher.vue'], resolve)
    },
  },
  {
    path: '/listForAll',
    name: 'list.listForAll',
    component  (resolve) {
      require(['./views/list/listForAll.vue'], resolve)
    },
  },
  {
    path: '/basicList',
    name: 'list.basicList',
    component  (resolve) {
      require(['./views/list/basicList.vue'], resolve)
    },
  },
  {
    path: '/noLine',
    name: 'list.noLine',
    component  (resolve) {
      require(['./views/list/noLine.vue'], resolve)
    },
  },
  {
    path: '/insetList',
    name: 'list.insetList',
    component  (resolve) {
      require(['./views/list/insetList.vue'], resolve)
    },
  },
  {
    path: '/listDividers',
    name: 'list.listDividers',
    component  (resolve) {
      require(['./views/list/listDividers.vue'], resolve)
    },
  },
  {
    path: '/listHeaders',
    name: 'list.listHeaders',
    component  (resolve) {
      require(['./views/list/listHeaders.vue'], resolve)
    },
  },
  {
    path: '/iconList',
    name: 'list.iconList',
    component  (resolve) {
      require(['./views/list/iconList.vue'], resolve)
    },
  },
  {
    path: '/avatarList',
    name: 'list.avatarList',
    component  (resolve) {
      require(['./views/list/avatarList.vue'], resolve)
    },
  },
  {
    path: '/multi-lineList',
    name: 'list.multi-lineList',
    component  (resolve) {
      require(['./views/list/multi-lineList.vue'], resolve)
    },
  },
  {
    path: '/slidingList',
    name: 'list.slidingList',
    component  (resolve) {
      require(['./views/list/slidingList.vue'], resolve)
    },
  },
  {
    path: '/thumbnailList',
    name: 'list.thumbnailList',
    component  (resolve) {
      require(['./views/list/ThumbnailList.vue'], resolve)
    },
  },

  // ----  component/Tabs组件 ----
  {
    path: '/segment',
    name: 'segment',
    component  (resolve) {
      require(['./views/segment.vue'], resolve)
    },
  },
  {
    path: '/tabs',
    name: 'tabs',
    component  (resolve) {
      require(['./views/tabs.vue'], resolve)
    },
  },
  {
    path: '/tabsBottom',
    name: 'tabs.tabsBottom',
    component  (resolve) {
      require(['./views/tabs/tabsBottom.vue'], resolve)
    },
    redirect: {name: 'tabsBottom.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'tabsBottom.demoTab1',
        component  (resolve) {
          require(['./views/tabs/demoTab1.vue'], resolve)
        },
      },
      {
        path: 'demoTab2',
        name: 'tabsBottom.demoTab2',
        component  (resolve) {
          require(['./views/tabs/demoTab2.vue'], resolve)
        },
      },
      {
        path: 'demoTab3',
        name: 'tabsBottom.demoTab3',
        component  (resolve) {
          require(['./views/tabs/demoTab3.vue'], resolve)
        },
      }
    ]
  },
  {
    path: '/tabsTop',
    name: 'tabs.tabsTop',
    component  (resolve) {
      require(['./views/tabs/tabsTop.vue'], resolve)
    },
    redirect: {name: 'tabsTop.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'tabsTop.demoTab1',
        component  (resolve) {
          require(['./views/tabs/demoTab1.vue'], resolve)
        },
      },
      {
        path: 'demoTab2',
        name: 'tabsTop.demoTab2',
        component  (resolve) {
          require(['./views/tabs/demoTab2.vue'], resolve)
        },
      },
      {
        path: 'demoTab3',
        name: 'tabsTop.demoTab3',
        component  (resolve) {
          require(['./views/tabs/demoTab3.vue'], resolve)
        },
      }
    ]
  },
  {
    path: '/iconOnly',
    name: 'tabs.iconOnly',
    component  (resolve) {
      require(['./views/tabs/iconOnly.vue'], resolve)
    },
    redirect: {name: 'iconOnly.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'iconOnly.demoTab1',
        component  (resolve) {
          require(['./views/tabs/demoTab1.vue'], resolve)
        },
      },
      {
        path: 'demoTab2',
        name: 'iconOnly.demoTab2',
        component  (resolve) {
          require(['./views/tabs/demoTab2.vue'], resolve)
        },
      },
      {
        path: 'demoTab3',
        name: 'iconOnly.demoTab3',
        component  (resolve) {
          require(['./views/tabs/demoTab3.vue'], resolve)
        },
      }
    ]
  },
  {
    path: '/iconLeft',
    name: 'tabs.iconLeft',
    component  (resolve) {
      require(['./views/tabs/iconLeft.vue'], resolve)
    },
    redirect: {name: 'iconLeft.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'iconLeft.demoTab1',
        component  (resolve) {
          require(['./views/tabs/demoTab1.vue'], resolve)
        },
      },
      {
        path: 'demoTab2',
        name: 'iconLeft.demoTab2',
        component  (resolve) {
          require(['./views/tabs/demoTab2.vue'], resolve)
        },
      },
      {
        path: 'demoTab3',
        name: 'iconLeft.demoTab3',
        component  (resolve) {
          require(['./views/tabs/demoTab3.vue'], resolve)
        },
      }
    ]
  },
  {
    path: '/titleOnly',
    name: 'tabs.titleOnly',
    component  (resolve) {
      require(['./views/tabs/titleOnly.vue'], resolve)
    },
    redirect: {name: 'titleOnly.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'titleOnly.demoTab1',
        component  (resolve) {
          require(['./views/tabs/demoTab1.vue'], resolve)
        },
      },
      {
        path: 'demoTab2',
        name: 'titleOnly.demoTab2',
        component  (resolve) {
          require(['./views/tabs/demoTab2.vue'], resolve)
        },
      },
      {
        path: 'demoTab3',
        name: 'titleOnly.demoTab3',
        component  (resolve) {
          require(['./views/tabs/demoTab3.vue'], resolve)
        },
      }
    ]
  },
  {
    path: '/iconBottom',
    name: 'tabs.iconBottom',
    component  (resolve) {
      require(['./views/tabs/iconBottom.vue'], resolve)
    },
    redirect: {name: 'iconBottom.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'iconBottom.demoTab1',
        component  (resolve) {
          require(['./views/tabs/demoTab1.vue'], resolve)
        },
      },
      {
        path: 'demoTab2',
        name: 'iconBottom.demoTab2',
        component  (resolve) {
          require(['./views/tabs/demoTab2.vue'], resolve)
        },
      },
      {
        path: 'demoTab3',
        name: 'iconBottom.demoTab3',
        component  (resolve) {
          require(['./views/tabs/demoTab3.vue'], resolve)
        },
      }
    ]
  },
  {
    path: '/tabHighLight',
    name: 'tabs.tabHighLight',
    component  (resolve) {
      require(['./views/tabs/tabHighLight.vue'], resolve)
    },
    redirect: {name: 'tabHighLight.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'tabHighLight.demoTab1',
        component  (resolve) {
          require(['./views/tabs/demoTab1.vue'], resolve)
        },
      },
      {
        path: 'demoTab2',
        name: 'tabHighLight.demoTab2',
        component  (resolve) {
          require(['./views/tabs/demoTab2.vue'], resolve)
        },
      },
      {
        path: 'demoTab3',
        name: 'tabHighLight.demoTab3',
        component  (resolve) {
          require(['./views/tabs/demoTab3.vue'], resolve)
        },
      }
    ]
  },

  // 模块
  {
    path: '/storage',
    name: 'storage',
    component: require('./views/storage.vue'),
  },
  {
    path: '/position',
    name: 'position',
    component: require('./views/position.vue'),
  },

  // demo
  {
    path: '/demo',
    name: 'demo',
    component: require('./views/demo.vue'),
  },
  {
    path: '/gl-input',
    name: 'gl-input',
    component: require('./views/gl-input.vue'),
  },

  {
    path: '/ghost',
    name: 'ghostvue',
    component: require('./views/ghost.vue'),
  },
  {
    path: '/floattop',
    name: 'floattop',
    component: require('./views/floattop.vue'),
  },
  {
    path: '/log',
    name: 'log',
    component: require('./vimo/log/log.vue'),
  },

];

/**
 * 初始化实例
 * */
const router = new VueRouter({
  mode: 'hash', //   "hash" | "history" | "abstract";
  base: '/', // 默认值: "/",应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
  routes: routes // （缩写）相当于 routes: routes
});

/**
 * 路由安装及钩子配置
 * */
function routerFactory (Vue) {
  Vue.use(VueRouter);

  /**
   * 全局EventBus事件:
   *
   * 页面级切换, 而不是子页面(tab/segment/modal)的切换. 页面切换伴随着nav及content的动画.
   * 这里定义, 在一级路由发生切换时, 才算做页面切换, 子路由的切换不是页面切换
   *
   * onRouteChangeBefore: 页面变化前的事件.
   * onRouteChangeAfter: 页面变化后的事件.
   *
   * */
  router.beforeEach((to, from, next) => {
      Vue.prototype.$eventBus.$emit('onRouteChangeBefore', {to, from});
      next();
    }
  );

  router.afterEach((to, from) => {
    Vue.prototype.$eventBus.$emit('onRouteChangeAfter', {to, from});
  });

  return router
}
module.exports = routerFactory;



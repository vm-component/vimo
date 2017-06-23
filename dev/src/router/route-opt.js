/**
 * 路由配置表
 * */

import cardRoutes from './route-card'
import contentRoutes from './route-content'
import listRoutes from './route-list'
import pickerRoutes from './route-picker'
import scrollRoutes from './route-scroll'
import segmentRoutes from './route-segment'
import tabsRoutes from './route-tabs'

let routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      root: true
    },
    component: require('@/example/index.vue')
  },
  {
    path: '/demo',
    name: 'demo',
    meta: {
      root: true
    },
    component: require('@/example/demo/demo.vue')
  },
  {
    path: '/components',
    name: 'components',
    component: require('@/example/components.vue')
  },
  {
    path: '/grid',
    name: 'grid',
    component (resolve) {
      require(['@/example/grid.vue'], resolve)
    }
  },

  // ----  menu ----
  {
    path: '/introduce',
    name: 'introduce',
    component (resolve) {
      require(['@/example/introduce.vue'], resolve)
    }
  },
  {
    path: '/howToStart',
    name: 'howToStart',
    component (resolve) {
      require(['@/example/how-to-start.vue'], resolve)
    }
  },
  {
    path: '/config',
    name: 'config',
    component (resolve) {
      require(['@/example/config.vue'], resolve)
    }
  },
  {
    path: '/history',
    name: 'history',
    component (resolve) {
      require(['@/example/history.vue'], resolve)
    }
  },

  // ----  component ----
  // ----  component/base ----
  {
    path: '/app',
    name: 'app',
    component (resolve) {
      require(['@/example/app.vue'], resolve)
    }
  },
  {
    path: '/nav',
    name: 'nav',
    component: require('@/example/nav.vue')
  },
  {
    path: '/platform',
    name: 'platform',
    component: require('@/example/platform.vue')
  },
  {
    path: '/cross-platform',
    name: 'crossPlatform',
    component: require('@/example/cross-platform.vue')
  },
  {
    path: '/toolbar',
    name: 'toolbar',
    component (resolve) {
      require(['@/example/toolbar.vue'], resolve)
    }
  },

  // ----  component/弹出层组件 ----
  {
    path: '/action-sheet',
    name: 'actionSheet',
    component (resolve) {
      require(['@/example/action-sheet.vue'], resolve)
    }
  },
  {
    path: '/alert',
    name: 'alert',
    component (resolve) {
      require(['@/example/alert.vue'], resolve)
    }
  },
  {
    path: '/popover',
    name: 'popover',
    component: require('@/example/popover/popover.vue')
  },

  {
    path: '/backdrop',
    name: 'backdrop',
    component (resolve) {
      require(['@/example/backdrop.vue'], resolve)
    }
  },
  {
    path: '/loading',
    name: 'loading',
    component (resolve) {
      require(['@/example/loading.vue'], resolve)
    }
  },
  {
    path: '/indicator',
    name: 'indicator',
    component (resolve) {
      require(['@/example/indicator.vue'], resolve)
    }
  },
  {
    path: '/modal',
    name: 'modal',
    component (resolve) {
      require(['@/example/modal/modal.vue'], resolve)
    }
  },
  {
    path: '/toast',
    name: 'toast',
    component (resolve) {
      require(['@/example/toast.vue'], resolve)
    }
  },

  // ----  component/通用组件 ----

  {
    path: '/button',
    name: 'button',
    component (resolve) {
      require(['@/example/button.vue'], resolve)
    }
  },
  {
    path: '/icon',
    name: 'icon',
    component (resolve) {
      require(['@/example/icon.vue'], resolve)
    }
  },
  {
    path: '/spinner',
    name: 'spinner',
    component (resolve) {
      require(['@/example/spinner.vue'], resolve)
    }
  },
  {
    path: '/badge',
    name: 'badge',
    component (resolve) {
      require(['@/example/badge.vue'], resolve)
    }
  },
  {
    path: '/fab',
    name: 'fab',
    component (resolve) {
      require(['@/example/fab.vue'], resolve)
    }
  },
  {
    path: '/img',
    name: 'img',
    component (resolve) {
      require(['@/example/img.vue'], resolve)
    }
  },
  {
    path: '/slides',
    name: 'slides',
    component (resolve) {
      require(['@/example/slides.vue'], resolve)
    }
  },
  {
    path: '/slides-lite',
    name: 'slidesLite',
    component (resolve) {
      require(['@/example/slides-lite.vue'], resolve)
    }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component (resolve) {
      require(['@/example/feedback.vue'], resolve)
    }
  },
  {
    path: '/scroll-segment',
    name: 'scrollSegment',
    component (resolve) {
      require(['@/example/scroll-segment.vue'], resolve)
    }
  },
  {
    path: '/notice-bar',
    name: 'noticeBar',
    component (resolve) {
      require(['@/example/notice-bar.vue'], resolve)
    }
  },
  {
    path: '/separation',
    name: 'separation',
    component (resolve) {
      require(['@/example/separation.vue'], resolve)
    }
  },
  {
    path: '/slide-box',
    name: 'slideBox',
    component (resolve) {
      require(['@/example/slide-box.vue'], resolve)
    }
  },
  {
    path: '/deeplink',
    name: 'deeplink',
    component (resolve) {
      require(['@/example/deeplink/deeplink.vue'], resolve)
    }
  },
  {
    path: '/oia-page',
    name: 'oiaPage',
    component (resolve) {
      require(['@/example/deeplink/oia-page.vue'], resolve)
    }
  },
  {
    path: '/preview-image',
    name: 'previewImage',
    component (resolve) {
      require(['@/example/preview-image.vue'], resolve)
    }
  },
  {
    path: '/city-selector',
    name: 'citySelector',
    component (resolve) {
      require(['@/example/city-selector/city-selector.vue'], resolve)
    }
  },

  // ----  component/Form组件 ----

  {
    path: '/toggle',
    name: 'toggle',
    component (resolve) {
      require(['@/example/toggle.vue'], resolve)
    }
  },
  {
    path: '/checkbox',
    name: 'checkbox',
    component (resolve) {
      require(['@/example/checkbox.vue'], resolve)
    }
  },
  {
    path: '/radio',
    name: 'radio',
    component (resolve) {
      require(['@/example/radio.vue'], resolve)
    }
  },
  {
    path: '/select',
    name: 'select',
    component (resolve) {
      require(['@/example/select.vue'], resolve)
    }
  },
  {
    path: '/searchbar',
    name: 'searchbar',
    component (resolve) {
      require(['@/example/searchbar.vue'], resolve)
    }
  },
  {
    path: '/input',
    name: 'input',
    component (resolve) {
      require(['@/example/input.vue'], resolve)
    }
  },

  {
    path: '/range',
    name: 'range',
    component (resolve) {
      require(['@/example/range.vue'], resolve)
    }
  },
  // ----  数据加载 ----
  {
    path: '/infinite-scroll',
    name: 'infinite-scroll',
    component (resolve) {
      require(['@/example/infinite-scroll.vue'], resolve)
    }
  },
  {
    path: '/refresher',
    name: 'refresher',
    component (resolve) {
      require(['@/example/refresher.vue'], resolve)
    }
  },

  // 模块
  {
    path: '/storage',
    name: 'storage',
    component (resolve) {
      require(['@/example/storage.vue'], resolve)
    }
  },
  {
    path: '/geo',
    name: 'geo',
    component (resolve) {
      require(['@/example/geo.vue'], resolve)
    }
  },
  {
    path: '/log',
    name: 'log',
    component (resolve) {
      require(['@/example/log.vue'], resolve)
    }
  },

  // demo
  {
    path: '/gl-input',
    name: 'gl-input',
    component (resolve) {
      require(['@/example/gl-input.vue'], resolve)
    }
  },

  {
    path: '/ghost',
    name: 'ghostvue',
    component (resolve) {
      require(['@/example/ghost.vue'], resolve)
    }
  },
  {
    path: '/floattop',
    name: 'floattop',
    component (resolve) {
      require(['@/example/floattop.vue'], resolve)
    }
  }
]

routes = routes.concat(contentRoutes)
routes = routes.concat(segmentRoutes)
routes = routes.concat(tabsRoutes)
routes = routes.concat(listRoutes)
routes = routes.concat(cardRoutes)
routes = routes.concat(scrollRoutes)
routes = routes.concat(pickerRoutes)

export default {
  mode: 'hash', //   "hash" | "history" | "abstract";
  base: '/', // 默认值: "/",应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
  routes: routes // （缩写）相当于 routes: routes
}

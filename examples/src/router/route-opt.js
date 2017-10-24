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
import inputRoutes from './route-input'
import textareaRoutes from './route-textarea'

let routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      root: true
    },
    component: require('@/pages/index.vue')
  },
  {
    path: '/components',
    name: 'components',
    component: require('@/pages/components.vue')
  },
  {
    path: '/grid',
    name: 'grid',
    component (resolve) {
      require(['@/pages/grid.vue'], resolve)
    }
  },

  // ----  menu ----
  {
    path: '/introduce',
    name: 'introduce',
    component (resolve) {
      require(['@/pages/introduce.vue'], resolve)
    }
  },
  {
    path: '/howToStart',
    name: 'howToStart',
    component (resolve) {
      require(['@/pages/how-to-start.vue'], resolve)
    }
  },
  {
    path: '/config',
    name: 'config',
    component (resolve) {
      require(['@/pages/config.vue'], resolve)
    }
  },
  {
    path: '/history',
    name: 'history',
    component (resolve) {
      require(['@/pages/history.vue'], resolve)
    }
  },

  // ----  component ----
  // ----  component/base ----
  {
    path: '/app',
    // name: 'app',
    component (resolve) {
      require(['@/pages/app.vue'], resolve)
    }
  },
  {
    path: '/nav',
    name: 'nav',
    component (resolve) {
      require(['@/pages/nav.vue'], resolve)
    }
  },
  {
    path: '/platform',
    name: 'platform',
    component (resolve) {
      require(['@/pages/platform.vue'], resolve)
    }
  },
  {
    path: '/cross-platform',
    name: 'crossPlatform',
    component (resolve) {
      require(['@/pages/cross-platform.vue'], resolve)
    }
  },

  {
    path: '/toolbar',
    name: 'toolbar',
    component (resolve) {
      require(['@/pages/toolbar.vue'], resolve)
    }
  },

  // ----  component/弹出层组件 ----
  {
    path: '/action-sheet',
    name: 'actionSheet',
    component (resolve) {
      require(['@/pages/action-sheet.vue'], resolve)
    }
  },
  {
    path: '/alert',
    name: 'alert',
    component (resolve) {
      require(['@/pages/alert.vue'], resolve)
    }
  },
  {
    path: '/popover',
    name: 'popover',
    component: require('@/pages/popover/popover.vue')
  },

  {
    path: '/backdrop',
    name: 'backdrop',
    component (resolve) {
      require(['@/pages/backdrop.vue'], resolve)
    }
  },
  {
    path: '/loading',
    name: 'loading',
    component (resolve) {
      require(['@/pages/loading.vue'], resolve)
    }
  },
  {
    path: '/indicator',
    name: 'indicator',
    component (resolve) {
      require(['@/pages/indicator.vue'], resolve)
    }
  },
  {
    path: '/modal',
    name: 'modal',
    component (resolve) {
      require(['@/pages/modal/modal.vue'], resolve)
    }
  },
  {
    path: '/toast',
    name: 'toast',
    component (resolve) {
      require(['@/pages/toast.vue'], resolve)
    }
  },

  // ----  component/通用组件 ----

  {
    path: '/button',
    name: 'button',
    component (resolve) {
      require(['@/pages/button.vue'], resolve)
    }
  },
  {
    path: '/icon',
    name: 'icon',
    component (resolve) {
      require(['@/pages/icon.vue'], resolve)
    }
  },
  {
    path: '/spinner',
    name: 'spinner',
    component (resolve) {
      require(['@/pages/spinner.vue'], resolve)
    }
  },
  {
    path: '/badge',
    name: 'badge',
    component (resolve) {
      require(['@/pages/badge.vue'], resolve)
    }
  },
  {
    path: '/fab',
    name: 'fab',
    component (resolve) {
      require(['@/pages/fab.vue'], resolve)
    }
  },
  {
    path: '/img',
    name: 'img',
    component (resolve) {
      require(['@/pages/img.vue'], resolve)
    }
  },
  {
    path: '/slides',
    name: 'slides',
    component (resolve) {
      require(['@/pages/slides.vue'], resolve)
    }
  },
  {
    path: '/slides-lite',
    name: 'slidesLite',
    component (resolve) {
      require(['@/pages/slides-lite.vue'], resolve)
    }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component (resolve) {
      require(['@/pages/feedback.vue'], resolve)
    }
  },
  {
    path: '/scroll-segment',
    name: 'scrollSegment',
    component (resolve) {
      require(['@/pages/scroll-segment.vue'], resolve)
    }
  },
  {
    path: '/notice-bar',
    name: 'noticeBar',
    component (resolve) {
      require(['@/pages/notice-bar.vue'], resolve)
    }
  },
  {
    path: '/separation',
    name: 'separation',
    component (resolve) {
      require(['@/pages/separation.vue'], resolve)
    }
  },
  {
    path: '/slide-box',
    name: 'slideBox',
    component (resolve) {
      require(['@/pages/slide-box.vue'], resolve)
    }
  },
  {
    path: '/deeplink',
    name: 'deeplink',
    component (resolve) {
      require(['@/pages/deeplink/deeplink.vue'], resolve)
    }
  },
  {
    path: '/oia-page',
    name: 'oiaPage',
    component (resolve) {
      require(['@/pages/deeplink/oia-page.vue'], resolve)
    }
  },
  {
    path: '/preview-image',
    name: 'previewImage',
    component (resolve) {
      require(['@/pages/preview-image.vue'], resolve)
    }
  },
  {
    path: '/choose-city',
    name: 'chooseCity',
    component (resolve) {
      require(['@/pages/choose-city.vue'], resolve)
    }
  },
  {
    path: '/sheet',
    name: 'sheet',
    component (resolve) {
      require(['@/pages/sheet.vue'], resolve)
    }
  },
  {
    path: '/pop-sheet',
    name: 'popSheet',
    component (resolve) {
      require(['@/pages/pop-sheet.vue'], resolve)
    }
  },
  // ----  component/Form组件 ----

  {
    path: '/toggle',
    name: 'toggle',
    component (resolve) {
      require(['@/pages/toggle.vue'], resolve)
    }
  },
  {
    path: '/checkbox',
    name: 'checkbox',
    component (resolve) {
      require(['@/pages/checkbox.vue'], resolve)
    }
  },
  {
    path: '/radio',
    name: 'radio',
    component (resolve) {
      require(['@/pages/radio.vue'], resolve)
    }
  },
  {
    path: '/select',
    name: 'select',
    component (resolve) {
      require(['@/pages/select.vue'], resolve)
    }
  },
  {
    path: '/searchbar',
    name: 'searchbar',
    component (resolve) {
      require(['@/pages/searchbar.vue'], resolve)
    }
  },

  {
    path: '/range',
    name: 'range',
    component (resolve) {
      require(['@/pages/range.vue'], resolve)
    }
  },
  // ----  数据加载 ----
  {
    path: '/infinite-scroll',
    name: 'infinite-scroll',
    component (resolve) {
      require(['@/pages/infinite-scroll.vue'], resolve)
    }
  },
  {
    path: '/refresher',
    name: 'refresher',
    component (resolve) {
      require(['@/pages/refresher.vue'], resolve)
    }
  },

  // 模块
  {
    path: '/storage',
    name: 'storage',
    component (resolve) {
      require(['@/pages/storage.vue'], resolve)
    }
  },
  {
    path: '/geo',
    name: 'geo',
    component (resolve) {
      require(['@/pages/geo.vue'], resolve)
    }
  },
  {
    path: '/log',
    name: 'log',
    component (resolve) {
      require(['@/pages/log.vue'], resolve)
    }
  }

  // demo
  // {
  //   path: '/snake-box',
  //   name: 'snakeBox',
  //   component (resolve) {
  //     require(['@/pages/snake-box.vue'], resolve)
  //   }
  // },

  // {
  //   path: '/ghost',
  //   name: 'ghostvue',
  //   component (resolve) {
  //     require(['@/pages/ghost.vue'], resolve)
  //   }
  // },
  // {
  //   path: '/floattop',
  //   name: 'floattop',
  //   component (resolve) {
  //     require(['@/pages/floattop.vue'], resolve)
  //   }
  // }
]

routes = routes.concat(contentRoutes)
routes = routes.concat(segmentRoutes)
routes = routes.concat(tabsRoutes)
routes = routes.concat(listRoutes)
routes = routes.concat(cardRoutes)
routes = routes.concat(scrollRoutes)
routes = routes.concat(pickerRoutes)
routes = routes.concat(inputRoutes)
routes = routes.concat(textareaRoutes)

export default {
  mode: 'hash',
  routes: routes // （缩写）相当于 routes: routes
}

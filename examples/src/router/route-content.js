/**
 * Created by Hsiang on 2017/4/21.
 * content相关的路由
 */
export default [
  {
    path: '/content',
    name: 'content',
    component (resolve) {
      require(['@/pages/content/content.vue'], resolve)
    }
  },
  {
    path: '/content_context',
    name: 'contentContext',
    component (resolve) {
      require(['@/pages/content/context.vue'], resolve)
    }
  },
  {
    path: '/content_fixed',
    name: 'contentFixed',
    component (resolve) {
      require(['@/pages/content/fixed.vue'], resolve)
    }
  },
  {
    path: '/content_fullscreen',
    name: 'contentFullscreen',
    component (resolve) {
      require(['@/pages/content/fullscreen.vue'], resolve)
    }
  },
  {
    path: '/content_hideBars',
    name: 'contentHideBars',
    component (resolve) {
      require(['@/pages/content/hideBars.vue'], resolve)
    }
  },
  {
    path: '/content_scroll',
    name: 'contentScroll',
    component (resolve) {
      require(['@/pages/content/scroll.vue'], resolve)
    }
  },
  {
    path: '/content_setBarStyle',
    name: 'contentSetBarStyle',
    component (resolve) {
      require(['@/pages/content/setBarStyle.vue'], resolve)
    }
  },
  // {
  //   path: '/content_city',
  //   name: 'contentCity',
  //   component (resolve) {
  //     require(['@/pages/content/city.vue'], resolve)
  //   }
  // }
]

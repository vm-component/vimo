/**
 * Created by Hsiang on 2017/4/21.
 * content相关的路由
 */
export default [
  {
    path: '/content',
    name: 'content',
    component (resolve) {
      require(['@/example/content/content.vue'], resolve)
    }
  },
  {
    path: '/content_context',
    name: 'contentContext',
    component (resolve) {
      require(['@/example/content/context.vue'], resolve)
    }
  },
  {
    path: '/content_fixed',
    name: 'contentFixed',
    component (resolve) {
      require(['@/example/content/fixed.vue'], resolve)
    }
  },
  {
    path: '/content_fullscreen',
    name: 'contentFullscreen',
    component (resolve) {
      require(['@/example/content/fullscreen.vue'], resolve)
    }
  },
  {
    path: '/content_hideBars',
    name: 'contentHideBars',
    component (resolve) {
      require(['@/example/content/hideBars.vue'], resolve)
    }
  },
  {
    path: '/content_scroll',
    name: 'contentScroll',
    component (resolve) {
      require(['@/example/content/scroll.vue'], resolve)
    }
  },
  {
    path: '/content_setBarStyle',
    name: 'contentSetBarStyle',
    component (resolve) {
      require(['@/example/content/setBarStyle.vue'], resolve)
    }
  },
  {
    path: '/content_jsScroll',
    name: 'contentJsScroll',
    component (resolve) {
      require(['@/example/content/jsScroll.vue'], resolve)
    }
  }
]

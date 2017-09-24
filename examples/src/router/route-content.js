/**
 * content相关的路由
 */
export default [
  {
    path: '/content',
    name: 'content',
    component (resolve) {
      require(['@/pages/content/index.vue'], resolve)
    }
  },
  {
    path: '/content-context',
    name: 'contentContext',
    component (resolve) {
      require(['@/pages/content/context.vue'], resolve)
    }
  },
  {
    path: '/content-fixed',
    name: 'contentFixed',
    component (resolve) {
      require(['@/pages/content/fixed.vue'], resolve)
    }
  },
  {
    path: '/content-fullscreen',
    name: 'contentFullscreen',
    component (resolve) {
      require(['@/pages/content/fullscreen.vue'], resolve)
    }
  },
  {
    path: '/content-hideBars',
    name: 'contentHideBars',
    component (resolve) {
      require(['@/pages/content/hideBars.vue'], resolve)
    }
  },
  {
    path: '/content-scroll',
    name: 'contentScroll',
    component (resolve) {
      require(['@/pages/content/scroll.vue'], resolve)
    }
  },
  {
    path: '/content-setBarStyle',
    name: 'contentSetBarStyle',
    component (resolve) {
      require(['@/pages/content/setBarStyle.vue'], resolve)
    }
  }
]

/** this file is generate automatic! */
export default [
  {
    path: '/action-sheet',
    name: 'actionSheet',
    component (resolve) {
      require(['@DemoComponent/action-sheet.vue'], resolve)
    }
  },
  {
    path: '/app',
    name: 'app',
    component (resolve) {
      require(['@DemoComponent/app.vue'], resolve)
    }
  },
  {
    path: '/content',
    name: 'content',
    component (resolve) {
      require(['@DemoComponent/content.vue'], resolve)
    }
  },
  {
    path: '/grid',
    name: 'grid',
    component (resolve) {
      require(['@DemoComponent/grid.vue'], resolve)
    }
  },
  {
    path: '/introduce',
    name: 'introduce',
    component (resolve) {
      require(['@DemoComponent/introduce.vue'], resolve)
    }
  },
  {
    path: '/nav',
    name: 'nav',
    component (resolve) {
      require(['@DemoComponent/nav.vue'], resolve)
    }
  }
]

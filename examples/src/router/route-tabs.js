/**
 * Created by Hsiang on 2017/4/28.
 * segment相关的路由
 */

export default [
  // ----  component/Tabs组件 ----
  {
    path: '/tabs',
    name: 'tabs',
    component (resolve) {
      require(['@/pages/tabs/tabs.vue'], resolve)
    }
  },
  {
    path: '/tabsBottom',
    name: 'tabs.tabsBottom',
    component (resolve) {
      require(['@/pages/tabs/tabsBottom.vue'], resolve)
    },
    redirect: {name: 'tabsBottom.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'tabsBottom.demoTab1',
        component (resolve) {
          require(['@/pages/tabs/demoTab1.vue'], resolve)
        }
      },
      {
        path: 'demoTab2',
        name: 'tabsBottom.demoTab2',
        component (resolve) {
          require(['@/pages/tabs/demoTab2.vue'], resolve)
        }
      },
      {
        path: 'demoTab3',
        name: 'tabsBottom.demoTab3',
        component (resolve) {
          require(['@/pages/tabs/demoTab3.vue'], resolve)
        }
      }
    ]
  },
  {
    path: '/tabsTop',
    name: 'tabs.tabsTop',
    component (resolve) {
      require(['@/pages/tabs/tabsTop.vue'], resolve)
    },
    redirect: {name: 'tabsTop.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'tabsTop.demoTab1',
        component (resolve) {
          require(['@/pages/tabs/demoTab1.vue'], resolve)
        }
      },
      {
        path: 'demoTab2',
        name: 'tabsTop.demoTab2',
        component (resolve) {
          require(['@/pages/tabs/demoTab2.vue'], resolve)
        }
      },
      {
        path: 'demoTab3',
        name: 'tabsTop.demoTab3',
        component (resolve) {
          require(['@/pages/tabs/demoTab3.vue'], resolve)
        }
      }
    ]
  },
  {
    path: '/iconOnly',
    name: 'tabs.iconOnly',
    component (resolve) {
      require(['@/pages/tabs/iconOnly.vue'], resolve)
    },
    redirect: {name: 'iconOnly.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'iconOnly.demoTab1',
        component (resolve) {
          require(['@/pages/tabs/demoTab1.vue'], resolve)
        }
      },
      {
        path: 'demoTab2',
        name: 'iconOnly.demoTab2',
        component (resolve) {
          require(['@/pages/tabs/demoTab2.vue'], resolve)
        }
      },
      {
        path: 'demoTab3',
        name: 'iconOnly.demoTab3',
        component (resolve) {
          require(['@/pages/tabs/demoTab3.vue'], resolve)
        }
      }
    ]
  },
  {
    path: '/iconLeft',
    name: 'tabs.iconLeft',
    component (resolve) {
      require(['@/pages/tabs/iconLeft.vue'], resolve)
    },
    redirect: {name: 'iconLeft.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'iconLeft.demoTab1',
        component (resolve) {
          require(['@/pages/tabs/demoTab1.vue'], resolve)
        }
      },
      {
        path: 'demoTab2',
        name: 'iconLeft.demoTab2',
        component (resolve) {
          require(['@/pages/tabs/demoTab2.vue'], resolve)
        }
      },
      {
        path: 'demoTab3',
        name: 'iconLeft.demoTab3',
        component (resolve) {
          require(['@/pages/tabs/demoTab3.vue'], resolve)
        }
      }
    ]
  },
  {
    path: '/titleOnly',
    name: 'tabs.titleOnly',
    component (resolve) {
      require(['@/pages/tabs/titleOnly.vue'], resolve)
    },
    redirect: {name: 'titleOnly.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'titleOnly.demoTab1',
        component (resolve) {
          require(['@/pages/tabs/demoTab1.vue'], resolve)
        }
      },
      {
        path: 'demoTab2',
        name: 'titleOnly.demoTab2',
        component (resolve) {
          require(['@/pages/tabs/demoTab2.vue'], resolve)
        }
      },
      {
        path: 'demoTab3',
        name: 'titleOnly.demoTab3',
        component (resolve) {
          require(['@/pages/tabs/demoTab3.vue'], resolve)
        }
      }
    ]
  },
  {
    path: '/iconBottom',
    name: 'tabs.iconBottom',
    component (resolve) {
      require(['@/pages/tabs/iconBottom.vue'], resolve)
    },
    redirect: {name: 'iconBottom.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'iconBottom.demoTab1',
        component (resolve) {
          require(['@/pages/tabs/demoTab1.vue'], resolve)
        }
      },
      {
        path: 'demoTab2',
        name: 'iconBottom.demoTab2',
        component (resolve) {
          require(['@/pages/tabs/demoTab2.vue'], resolve)
        }
      },
      {
        path: 'demoTab3',
        name: 'iconBottom.demoTab3',
        component (resolve) {
          require(['@/pages/tabs/demoTab3.vue'], resolve)
        }
      }
    ]
  },
  {
    path: '/tabHighLight',
    name: 'tabs.tabHighLight',
    component (resolve) {
      require(['@/pages/tabs/tabHighLight.vue'], resolve)
    },
    redirect: {name: 'tabHighLight.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'tabHighLight.demoTab1',
        component (resolve) {
          require(['@/pages/tabs/demoTab1.vue'], resolve)
        }
      },
      {
        path: 'demoTab2',
        name: 'tabHighLight.demoTab2',
        component (resolve) {
          require(['@/pages/tabs/demoTab2.vue'], resolve)
        }
      },
      {
        path: 'demoTab3',
        name: 'tabHighLight.demoTab3',
        component (resolve) {
          require(['@/pages/tabs/demoTab3.vue'], resolve)
        }
      }
    ]
  }
]

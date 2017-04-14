/**
 * 路由配置表
 * */
const routes = [
  // index
  {
    path: '/',
    name: 'index',
    meta: {
      root: true
    },
    component: require('@/example/index.vue')
  },

  {
    path: '/components',
    name: 'components',
    component: require('@/example/components.vue')
  },
  {
    path: '/grid',
    name: 'grid',
    component  (resolve) {
      require(['@/example/grid.vue'], resolve)
    }
  },

  // ----  menu ----
  {
    path: '/introduce',
    name: 'introduce',
    component  (resolve) {
      require(['@/example/introduce.vue'], resolve)
    }
  },
  {
    path: '/howToStart',
    name: 'howToStart',
    component  (resolve) {
      require(['@/example/how-to-start.vue'], resolve)
    }
  },
  {
    path: '/equipment',
    name: 'equipment',
    component  (resolve) {
      require(['@/example/equipment.vue'], resolve)
    }
  },

  // ----  component ----
  // ----  component/base ----
  {
    path: '/app',
    name: 'app',
    component  (resolve) {
      require(['@/example/app.vue'], resolve)
    }
  },
  {
    path: '/content',
    name: 'content',
    component  (resolve) {
      require(['@/example/content.vue'], resolve)
    }
  },
  {
    path: '/toolbar',
    name: 'toolbar',
    component  (resolve) {
      require(['@/example/toolbar.vue'], resolve)
    }
  },

  // ----  component/弹出层组件 ----
  {
    path: '/action-sheet',
    name: 'actionSheet',
    component  (resolve) {
      require(['@/example/action-sheet.vue'], resolve)
    }
  },
  {
    path: '/alert',
    name: 'alert',
    component  (resolve) {
      require(['@/example/alert.vue'], resolve)
    }
  },
  {
    path: '/popover',
    name: 'popover',
    component: require('@/example/popover.vue')
  },
  {
    path: '/backdrop',
    name: 'backdrop',
    component  (resolve) {
      require(['@/example/backdrop.vue'], resolve)
    }
  },
  {
    path: '/loading',
    name: 'loading',
    component  (resolve) {
      require(['@/example/loading.vue'], resolve)
    }
  },
  {
    path: '/modal',
    name: 'modal',
    component  (resolve) {
      require(['@/example/modal.vue'], resolve)
    }
  },
  {
    path: '/toast',
    name: 'toast',
    component  (resolve) {
      require(['@/example/toast.vue'], resolve)
    }
  },
  {
    path: '/picker',
    name: 'city-picker',
    component  (resolve) {
      require(['@/example/picker.vue'], resolve)
    }
  },
  // ----  component/通用组件 ----

  {
    path: '/button',
    name: 'button',
    component  (resolve) {
      require(['@/example/button.vue'], resolve)
    }
  },
  {
    path: '/icon',
    name: 'icon',
    component  (resolve) {
      require(['@/example/icon.vue'], resolve)
    }
  },
  {
    path: '/spinner',
    name: 'spinner',
    component  (resolve) {
      require(['@/example/spinner.vue'], resolve)
    }
  },
  {
    path: '/fab',
    name: 'fab',
    component  (resolve) {
      require(['@/example/fab.vue'], resolve)
    }
  },
  {
    path: '/img',
    name: 'img',
    component  (resolve) {
      require(['@/example/img.vue'], resolve)
    }
  },
  {
    path: '/swiper',
    name: 'swiper',
    component  (resolve) {
      require(['@/example/swiper.vue'], resolve)
    }
  },

  // cards
  {
    path: '/cards',
    name: 'cards',
    component  (resolve) {
      require(['@/example/cards.vue'], resolve)
    }
  },
  {
    path: '/basicCards',
    name: 'cards.basicCards',
    component  (resolve) {
      require(['@/example/cards/basicCards.vue'], resolve)
    }
  },
  {
    path: '/listsInCards',
    name: 'cards.listsInCards',
    component  (resolve) {
      require(['@/example/cards/listsInCards.vue'], resolve)
    }
  },
  {
    path: '/advancedCards',
    name: 'cards.advancedCards',
    component  (resolve) {
      require(['@/example/cards/advancedCards.vue'], resolve)
    }
  },

  // ----  component/Form组件 ----

  {
    path: '/toggle',
    name: 'toggle',
    component  (resolve) {
      require(['@/example/toggle.vue'], resolve)
    }
  },
  {
    path: '/checkbox',
    name: 'checkbox',
    component  (resolve) {
      require(['@/example/checkbox.vue'], resolve)
    }
  },
  {
    path: '/radio',
    name: 'radio',
    component  (resolve) {
      require(['@/example/radio.vue'], resolve)
    }
  },
  {
    path: '/searchbar',
    name: 'searchbar',
    component  (resolve) {
      require(['@/example/searchbar.vue'], resolve)
    }
  },
  {
    path: '/input',
    name: 'input',
    component  (resolve) {
      require(['@/example/input.vue'], resolve)
    }
  },

  {
    path: '/range',
    name: 'range',
    component  (resolve) {
      require(['@/example/range.vue'], resolve)
    }
  },

  // ----  component/list组件系列 ----

  {
    path: '/list',
    name: 'list',
    component  (resolve) {
      require(['@/example/list.vue'], resolve)
    }
  },
  {
    path: '/infinite-scroll',
    name: 'infinite-scroll',
    component  (resolve) {
      require(['@/example/infinite-scroll.vue'], resolve)
    }
  },
  {
    path: '/refresher',
    name: 'refresher',
    component  (resolve) {
      require(['@/example/refresher.vue'], resolve)
    }
  },
  {
    path: '/listForAll',
    name: 'list.listForAll',
    component  (resolve) {
      require(['@/example/list/listForAll.vue'], resolve)
    }
  },
  {
    path: '/basicList',
    name: 'list.basicList',
    component  (resolve) {
      require(['@/example/list/basicList.vue'], resolve)
    }
  },
  {
    path: '/noLine',
    name: 'list.noLine',
    component  (resolve) {
      require(['@/example/list/noLine.vue'], resolve)
    }
  },
  {
    path: '/insetList',
    name: 'list.insetList',
    component  (resolve) {
      require(['@/example/list/insetList.vue'], resolve)
    }
  },
  {
    path: '/listDividers',
    name: 'list.listDividers',
    component  (resolve) {
      require(['@/example/list/listDividers.vue'], resolve)
    }
  },
  {
    path: '/listHeaders',
    name: 'list.listHeaders',
    component  (resolve) {
      require(['@/example/list/listHeaders.vue'], resolve)
    }
  },
  {
    path: '/iconList',
    name: 'list.iconList',
    component  (resolve) {
      require(['@/example/list/iconList.vue'], resolve)
    }
  },
  {
    path: '/avatarList',
    name: 'list.avatarList',
    component  (resolve) {
      require(['@/example/list/avatarList.vue'], resolve)
    }
  },
  {
    path: '/multi-lineList',
    name: 'list.multi-lineList',
    component  (resolve) {
      require(['@/example/list/multi-lineList.vue'], resolve)
    }
  },
  {
    path: '/slidingList',
    name: 'list.slidingList',
    component  (resolve) {
      require(['@/example/list/slidingList.vue'], resolve)
    }
  },
  {
    path: '/thumbnailList',
    name: 'list.thumbnailList',
    component  (resolve) {
      require(['@/example/list/ThumbnailList.vue'], resolve)
    }
  },

  // ----  component/Tabs组件 ----
  {
    path: '/segment',
    name: 'segment',
    component  (resolve) {
      require(['@/example/segment.vue'], resolve)
    }
  },
  {
    path: '/tabs',
    name: 'tabs',
    component  (resolve) {
      require(['@/example/tabs.vue'], resolve)
    }
  },
  {
    path: '/tabsBottom',
    name: 'tabs.tabsBottom',
    component  (resolve) {
      require(['@/example/tabs/tabsBottom.vue'], resolve)
    },
    redirect: {name: 'tabsBottom.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'tabsBottom.demoTab1',
        component  (resolve) {
          require(['@/example/tabs/demoTab1.vue'], resolve)
        }
      },
      {
        path: 'demoTab2',
        name: 'tabsBottom.demoTab2',
        component  (resolve) {
          require(['@/example/tabs/demoTab2.vue'], resolve)
        }
      },
      {
        path: 'demoTab3',
        name: 'tabsBottom.demoTab3',
        component  (resolve) {
          require(['@/example/tabs/demoTab3.vue'], resolve)
        }
      }
    ]
  },
  {
    path: '/tabsTop',
    name: 'tabs.tabsTop',
    component  (resolve) {
      require(['@/example/tabs/tabsTop.vue'], resolve)
    },
    redirect: {name: 'tabsTop.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'tabsTop.demoTab1',
        component  (resolve) {
          require(['@/example/tabs/demoTab1.vue'], resolve)
        }
      },
      {
        path: 'demoTab2',
        name: 'tabsTop.demoTab2',
        component  (resolve) {
          require(['@/example/tabs/demoTab2.vue'], resolve)
        }
      },
      {
        path: 'demoTab3',
        name: 'tabsTop.demoTab3',
        component  (resolve) {
          require(['@/example/tabs/demoTab3.vue'], resolve)
        }
      }
    ]
  },
  {
    path: '/iconOnly',
    name: 'tabs.iconOnly',
    component  (resolve) {
      require(['@/example/tabs/iconOnly.vue'], resolve)
    },
    redirect: {name: 'iconOnly.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'iconOnly.demoTab1',
        component  (resolve) {
          require(['@/example/tabs/demoTab1.vue'], resolve)
        }
      },
      {
        path: 'demoTab2',
        name: 'iconOnly.demoTab2',
        component  (resolve) {
          require(['@/example/tabs/demoTab2.vue'], resolve)
        }
      },
      {
        path: 'demoTab3',
        name: 'iconOnly.demoTab3',
        component  (resolve) {
          require(['@/example/tabs/demoTab3.vue'], resolve)
        }
      }
    ]
  },
  {
    path: '/iconLeft',
    name: 'tabs.iconLeft',
    component  (resolve) {
      require(['@/example/tabs/iconLeft.vue'], resolve)
    },
    redirect: {name: 'iconLeft.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'iconLeft.demoTab1',
        component  (resolve) {
          require(['@/example/tabs/demoTab1.vue'], resolve)
        }
      },
      {
        path: 'demoTab2',
        name: 'iconLeft.demoTab2',
        component  (resolve) {
          require(['@/example/tabs/demoTab2.vue'], resolve)
        }
      },
      {
        path: 'demoTab3',
        name: 'iconLeft.demoTab3',
        component  (resolve) {
          require(['@/example/tabs/demoTab3.vue'], resolve)
        }
      }
    ]
  },
  {
    path: '/titleOnly',
    name: 'tabs.titleOnly',
    component  (resolve) {
      require(['@/example/tabs/titleOnly.vue'], resolve)
    },
    redirect: {name: 'titleOnly.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'titleOnly.demoTab1',
        component  (resolve) {
          require(['@/example/tabs/demoTab1.vue'], resolve)
        }
      },
      {
        path: 'demoTab2',
        name: 'titleOnly.demoTab2',
        component  (resolve) {
          require(['@/example/tabs/demoTab2.vue'], resolve)
        }
      },
      {
        path: 'demoTab3',
        name: 'titleOnly.demoTab3',
        component  (resolve) {
          require(['@/example/tabs/demoTab3.vue'], resolve)
        }
      }
    ]
  },
  {
    path: '/iconBottom',
    name: 'tabs.iconBottom',
    component  (resolve) {
      require(['@/example/tabs/iconBottom.vue'], resolve)
    },
    redirect: {name: 'iconBottom.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'iconBottom.demoTab1',
        component  (resolve) {
          require(['@/example/tabs/demoTab1.vue'], resolve)
        }
      },
      {
        path: 'demoTab2',
        name: 'iconBottom.demoTab2',
        component  (resolve) {
          require(['@/example/tabs/demoTab2.vue'], resolve)
        }
      },
      {
        path: 'demoTab3',
        name: 'iconBottom.demoTab3',
        component  (resolve) {
          require(['@/example/tabs/demoTab3.vue'], resolve)
        }
      }
    ]
  },
  {
    path: '/tabHighLight',
    name: 'tabs.tabHighLight',
    component  (resolve) {
      require(['@/example/tabs/tabHighLight.vue'], resolve)
    },
    redirect: {name: 'tabHighLight.demoTab1'},
    children: [
      {
        path: 'demoTab1',
        name: 'tabHighLight.demoTab1',
        component  (resolve) {
          require(['@/example/tabs/demoTab1.vue'], resolve)
        }
      },
      {
        path: 'demoTab2',
        name: 'tabHighLight.demoTab2',
        component  (resolve) {
          require(['@/example/tabs/demoTab2.vue'], resolve)
        }
      },
      {
        path: 'demoTab3',
        name: 'tabHighLight.demoTab3',
        component  (resolve) {
          require(['@/example/tabs/demoTab3.vue'], resolve)
        }
      }
    ]
  },

  // 模块
  {
    path: '/storage',
    name: 'storage',
    component  (resolve) {
      require(['@/example/storage.vue'], resolve)
    }
  },
  {
    path: '/position',
    name: 'position',
    component  (resolve) {
      require(['@/example/position.vue'], resolve)
    }
  },

  // demo
  {
    path: '/demo',
    name: 'demo',
    component  (resolve) {
      require(['@/example/demo.vue'], resolve)
    }
  },
  {
    path: '/gl-input',
    name: 'gl-input',
    component  (resolve) {
      require(['@/example/gl-input.vue'], resolve)
    }
  },

  {
    path: '/ghost',
    name: 'ghostvue',
    component  (resolve) {
      require(['@/example/ghost.vue'], resolve)
    }
  },
  {
    path: '/floattop',
    name: 'floattop',
    component  (resolve) {
      require(['@/example/floattop.vue'], resolve)
    }
  }
]

export default {
  mode: 'hash', //   "hash" | "history" | "abstract";
  base: '/', // 默认值: "/",应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
  routes: routes // （缩写）相当于 routes: routes
}


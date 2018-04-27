/**
 * Created by Hsiang on 2017/4/21.
 * content相关的路由
 */
export default [
  // ----  component/list组件系列 ----
  {
    path: '/list',
    name: 'list',
    component (resolve) {
      require(['@/pages/list/list.vue'], resolve)
    }
  },
  {
    path: '/listForAll',
    name: 'list.listForAll',
    component (resolve) {
      require(['@/pages/list/listForAll.vue'], resolve)
    }
  },
  {
    path: '/basicList',
    name: 'list.basicList',
    component (resolve) {
      require(['@/pages/list/basicList.vue'], resolve)
    }
  },
  {
    path: '/noLine',
    name: 'list.noLine',
    component (resolve) {
      require(['@/pages/list/noLine.vue'], resolve)
    }
  },
  {
    path: '/insetList',
    name: 'list.insetList',
    component (resolve) {
      require(['@/pages/list/insetList.vue'], resolve)
    }
  },
  {
    path: '/listDividers',
    name: 'list.listDividers',
    component (resolve) {
      require(['@/pages/list/listDividers.vue'], resolve)
    }
  },
  {
    path: '/listHeaders',
    name: 'list.listHeaders',
    component (resolve) {
      require(['@/pages/list/listHeaders.vue'], resolve)
    }
  },
  {
    path: '/iconList',
    name: 'list.iconList',
    component (resolve) {
      require(['@/pages/list/iconList.vue'], resolve)
    }
  },
  {
    path: '/avatarList',
    name: 'list.avatarList',
    component (resolve) {
      require(['@/pages/list/avatarList.vue'], resolve)
    }
  },
  {
    path: '/multi-lineList',
    name: 'list.multi-lineList',
    component (resolve) {
      require(['@/pages/list/multi-lineList.vue'], resolve)
    }
  },
  {
    path: '/slidingList',
    name: 'list.slidingList',
    component (resolve) {
      require(['@/pages/list/slidingList.vue'], resolve)
    }
  },
  {
    path: '/reorder',
    name: 'list.reorder',
    component (resolve) {
      require(['@/pages/list/reorder.vue'], resolve)
    }
  },

  {
    path: '/thumbnailList',
    name: 'list.thumbnailList',
    component (resolve) {
      require(['@/pages/list/thumbnailList.vue'], resolve)
    }
  },
  {
    path: '/collapseList',
    name: 'list.collapse',
    component (resolve) {
      require(['@/pages/list/collapse.vue'], resolve)
    }
  }
]

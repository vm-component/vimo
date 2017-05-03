/**
 * Created by Hsiang on 2017/4/21.
 * content相关的路由
 */
export default [
  // ----  component/list组件系列 ----
  {
    path: '/list',
    name: 'list',
    component  (resolve) {
      require(['@/example/list/list.vue'], resolve)
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
    path: '/reorder',
    name: 'list.reorder',
    component  (resolve) {
      require(['@/example/list/reorder.vue'], resolve)
    }
  },

  {
    path: '/thumbnailList',
    name: 'list.thumbnailList',
    component  (resolve) {
      require(['@/example/list/ThumbnailList.vue'], resolve)
    }
  },

]
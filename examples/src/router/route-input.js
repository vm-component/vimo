export default [
  {
    path: '/input',
    name: 'input',
    component (resolve) {
      require(['@/pages/input/index.vue'], resolve)
    }
  },
  {
    path: '/input-normal',
    name: 'input.normal',
    component (resolve) {
      require(['@/pages/input/normal.vue'], resolve)
    }
  },
  {
    path: '/input-valid',
    name: 'input.valid',
    component (resolve) {
      require(['@/pages/input/valid.vue'], resolve)
    }
  },
  {
    path: '/input-limit',
    name: 'input.limit',
    component (resolve) {
      require(['@/pages/input/limit.vue'], resolve)
    }
  },
  {
    path: '/input-event',
    name: 'input.event',
    component (resolve) {
      require(['@/pages/input/event.vue'], resolve)
    }
  }
]

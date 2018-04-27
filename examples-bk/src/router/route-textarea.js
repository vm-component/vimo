export default [
  {
    path: '/textarea',
    name: 'textarea',
    component (resolve) {
      require(['@/pages/textarea/index.vue'], resolve)
    }
  },
  {
    path: '/textarea-normal',
    name: 'textarea.normal',
    component (resolve) {
      require(['@/pages/textarea/normal.vue'], resolve)
    }
  },
  {
    path: '/textarea-event',
    name: 'textarea.event',
    component (resolve) {
      require(['@/pages/textarea/event.vue'], resolve)
    }
  },
  {
    path: '/textarea-valid',
    name: 'textarea.valid',
    component (resolve) {
      require(['@/pages/textarea/valid.vue'], resolve)
    }
  }
]

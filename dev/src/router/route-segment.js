/**
 * Created by Hsiang on 2017/4/28.
 * segment相关的路由
 */
export default [
  {
    path: '/segment',
    name: 'segment',
    component  (resolve) {
      require(['@/example/segment/segment.vue'], resolve)
    }
  },
  {
    path: '/segment_normal',
    name: 'segmentNormal',
    component  (resolve) {
      require(['@/example/segment/normal.vue'], resolve)
    }
  },
  {
    path: '/segment_animate',
    name: 'segmentAnimate',
    component  (resolve) {
      require(['@/example/segment/animate.vue'], resolve)
    }
  },
  {
    path: '/segment_with_swiper',
    name: 'segmentWithSwiper',
    component  (resolve) {
      require(['@/example/segment/with-swiper.vue'], resolve)
    }
  },
  {
    path: '/segment_async',
    name: 'segmentAsync',
    component  (resolve) {
      require(['@/example/segment/async.vue'], resolve)
    }
  },
  {
    path: '/segment_no_value',
    name: 'segmentNoValue',
    component  (resolve) {
      require(['@/example/segment/no-value.vue'], resolve)
    }
  }
]
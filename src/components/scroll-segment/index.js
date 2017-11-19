import ScrollSegmentButton from './scroll-segment-button.vue'
import ScrollSegment from './scroll-segment.vue'

ScrollSegment.install = function (Vue) {
  Vue.component(ScrollSegment.name, ScrollSegment)
  Vue.component(ScrollSegmentButton.name, ScrollSegmentButton)
}

export default ScrollSegment

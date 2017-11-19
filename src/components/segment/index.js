import SegmentButton from './segment-button.vue'
import Segment from './segment.vue'

Segment.install = function (Vue) {
  Vue.component(Segment.name, Segment)
  Vue.component(SegmentButton.name, SegmentButton)
}

export default Segment

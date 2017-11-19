import SlideLite from './slide.vue'
import SlidesLite from './slides.vue'

SlidesLite.install = function (Vue) {
  Vue.component(SlidesLite.name, SlidesLite)
  Vue.component(SlideLite.name, SlideLite)
}

export default SlidesLite

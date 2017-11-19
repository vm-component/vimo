import Slide from './slide.vue'
import Slides from './slides.vue'

Slides.install = function (Vue) {
  Vue.component(Slides.name, Slides)
  Vue.component(Slide.name, Slide)
}

export default Slides

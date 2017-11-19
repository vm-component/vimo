import Refresher from './refresher.vue'
import RefresherContent from './refresher-content.vue'

Refresher.install = function (Vue) {
  Vue.component(Refresher.name, Refresher)
  Vue.component(RefresherContent.name, RefresherContent)
}

export default Refresher

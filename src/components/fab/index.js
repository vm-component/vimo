import Fab from './fab.vue'
import FabButton from './fab-button.vue'
import FabList from './fab-list.vue'

Fab.install = function (Vue) {
  Vue.component(Fab.name, Fab)
  Vue.component(FabButton.name, FabButton)
  Vue.component(FabList.name, FabList)
}

export default Fab

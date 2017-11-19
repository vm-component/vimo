import Toolbar from './toolbar.vue'
import Title from './toolbar-title.vue'
import Buttons from './toolbar-buttons.vue'

Toolbar.install = function (Vue) {
  Vue.component(Toolbar.name, Toolbar)
}

Buttons.install = function (Vue) {
  Vue.component(Buttons.name, Buttons)
}

Title.install = function (Vue) {
  Vue.component(Title.name, Title)
}

export { Toolbar, Title, Buttons }

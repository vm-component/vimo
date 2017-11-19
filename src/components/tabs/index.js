import Tab from './tab.vue'
import Tabs from './tabs.vue'

Tabs.install = function (Vue) {
  Vue.component(Tabs.name, Tabs)
  Vue.component(Tab.name, Tab)
}

export default Tabs

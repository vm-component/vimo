import ItemCollapse from './item-collapse.vue'
import ItemCollapseGroup from './item-collapse-group.vue'

/* istanbul ignore next */
ItemCollapse.install = function (Vue) {
  Vue.component(ItemCollapse.name, ItemCollapse)
  Vue.component(ItemCollapseGroup.name, ItemCollapseGroup)
}

export default ItemCollapse

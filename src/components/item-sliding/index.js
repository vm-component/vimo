import ItemSliding from './item-sliding.vue'
import ItemOptions from './item-options.vue'

/* istanbul ignore next */
ItemSliding.install = function (Vue) {
  Vue.component(ItemSliding.name, ItemSliding)
  Vue.component(ItemOptions.name, ItemOptions)
}

export default ItemSliding

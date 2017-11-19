import Item from './item.vue'
import ItemDivider from './item-divider.vue'
import ItemGroup from './item-group.vue'
import ListHeader from './list-header.vue'

/* istanbul ignore next */
Item.install = function (Vue) {
  Vue.component(Item.name, Item)
}

ItemDivider.install = function (Vue) {
  Vue.component(ItemDivider.name, ItemDivider)
}

ItemGroup.install = function (Vue) {
  Vue.component(ItemGroup.name, ItemGroup)
}

ListHeader.install = function (Vue) {
  Vue.component(ListHeader.name, ListHeader)
}

export { Item, ListHeader, ItemDivider, ItemGroup }

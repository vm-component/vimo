import Option from './option.vue'
import Select from './select.vue'

Select.install = function (Vue) {
  Vue.component(Select.name, Select)
  Vue.component(Option.name, Option)
}

export default Select

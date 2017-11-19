import Input from './input.vue'
import Textarea from './textarea.vue'

/* istanbul ignore next */
Input.install = function (Vue) {
  Vue.component(Input.name, Input)
}

Textarea.install = function (Vue) {
  Vue.component(Textarea.name, Textarea)
}

export { Input, Textarea }

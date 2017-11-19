import Picker from './picker.js'
import { vueUse } from '../../util/plugins'

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const VuePlugin = {
  install (Vue) {
    Vue.prototype.$picker = Picker
  }
}

vueUse(VuePlugin)

export default Picker
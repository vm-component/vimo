import Picker from './picker.js'
import { vueUse } from '../../util/plugins'

Picker.install = function (Vue) {
  Vue.prototype.$picker = Picker
}

vueUse(Picker)

export default Picker

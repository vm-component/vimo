import Popover from './popover.js'
import { vueUse } from '../../util/plugins'

Popover.install = function (Vue) {
  Vue.prototype.$popover = Popover
}

vueUse(Popover)

export default Popover

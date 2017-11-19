import Indicator from './indicator.js'
import { vueUse } from '../../util/plugins'

Indicator.install = function (Vue) {
  Vue.prototype.$indicator = Indicator
}

vueUse(Indicator)

export default Indicator

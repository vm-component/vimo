import Alert from './alert.js'
import { vueUse } from '../../util/plugins'

Alert.install = function (Vue) {
  Vue.prototype.$alert = Alert
}

vueUse(Alert)

export default Alert

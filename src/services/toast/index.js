import Toast from './toast.js'
import { vueUse } from '../../util/plugins'

Toast.install = function (Vue) {
  Vue.prototype.$toast = Toast
}

vueUse(Toast)

export default Toast

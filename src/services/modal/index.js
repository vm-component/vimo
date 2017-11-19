import Modal from './modal.js'
import { vueUse } from '../../util/plugins'

Modal.install = function (Vue) {
  Vue.prototype.$modal = Modal
}

vueUse(Modal)

export default Modal

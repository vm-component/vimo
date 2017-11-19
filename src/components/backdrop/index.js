import Backdrop from './backdrop.vue'

/* istanbul ignore next */
Backdrop.install = function (Vue) {
  Vue.component(Backdrop.name, Backdrop)
}

export default Backdrop

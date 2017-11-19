import Loading from './loading.js'
import { vueUse } from '../../util/plugins'

Loading.install = function (Vue) {
  Vue.prototype.$loading = Loading
}

vueUse(Loading)

export default Loading

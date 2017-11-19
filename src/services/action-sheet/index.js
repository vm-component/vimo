import ActionSheet from './action-sheet.js'
import { vueUse } from '../../util/plugins'

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const VuePlugin = {
  install (Vue) {
    Vue.prototype.$actionSheet = ActionSheet
  }
}

vueUse(VuePlugin)

export default ActionSheet
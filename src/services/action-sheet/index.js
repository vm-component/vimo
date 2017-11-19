import ActionSheet from './action-sheet.js'
import { vueUse } from '../../util/plugins'

ActionSheet.install = function (Vue) {
  Vue.prototype.$actionSheet = ActionSheet
}

vueUse(ActionSheet)

export default ActionSheet

/**
 * Created by Hsiang on 2016/12/23.
 */
import Vue from 'vue'
import actionSheetComponent from './action-sheet.vue'
import { getPresentDismissIns } from '../../util/getPresentDismissIns'
import { getInsertPosition } from '../../util/getInsertPosition'
const ActionSheet = Vue.extend(actionSheetComponent)

// ---------- functions ----------

function ActionSheetFactory (options) {
  let el = getInsertPosition('sheetPortal').appendChild(document.createElement('div'))
  return new ActionSheet({el, propsData: options})
}

export default getPresentDismissIns(ActionSheetFactory)
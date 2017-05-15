/**
 * Created by Hsiang on 2017/5/13.
 */
import Vue from 'vue'
import { getInsertPosition } from '../../util/getInsertPosition'
import { getPresentDismissIns } from '../../util/getPresentDismissIns'
import pickerComponent from './picker.vue'
const Picker = Vue.extend(pickerComponent)

// ---------- functions ----------

function PickerFactory (options) {
  let el = getInsertPosition('sheetPortal').appendChild(document.createElement('div'))
  return new Picker({el, propsData: options})
}

let methods = getPresentDismissIns(PickerFactory)
methods.resetColumn = (index) => {
  methods._i && methods._i.resetColumn(index)
}

export default methods

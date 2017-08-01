import Vue from 'vue'
import { getInsertPosition } from '../../util/getInsertPosition'
import pickerComponent from './region-picker.vue'
const Picker = Vue.extend(pickerComponent)

// ---------- functions ----------

function PickerFactory (options) {
  let el = getInsertPosition('sheetPortal').appendChild(document.createElement('div'))
  return new Picker({el, propsData: options})
}

export default {
  _i: null, // instance
  present(options){
    return new Promise((resolve) => {
      this._i = PickerFactory(options)
      // 自动开启
      this._i.present().then(() => { resolve() })
    })
  }
}
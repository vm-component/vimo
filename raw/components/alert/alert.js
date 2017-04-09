/**
 * Created by Hsiang on 2016/12/23.
 */
import Vue from 'vue'
import alertComponent from './alert.vue'
import { getPresentDismissIns } from '../../util/getPresentDismissIns'
import { getInsertPosition } from '../../util/getInsertPosition'
const Alert = Vue.extend(alertComponent)

// ---------- functions ----------

function AlertFactory (options) {
  let el = getInsertPosition('alertPortal').appendChild(document.createElement('div'))
  return new Alert({el, propsData: options})
}

export default getPresentDismissIns(AlertFactory)
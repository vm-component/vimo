/**
 * Created by Hsiang on 2017/5/8.
 */
import Vue from 'vue'
import { getInsertPosition } from '../../util/getInsertPosition'
import { getPresentDismissIns } from '../../util/getPresentDismissIns'
import popoverComponent from './popover.vue'
const Popover = Vue.extend(popoverComponent)

// ---------- functions ----------

function PopoverFactory (options) {
  let el = getInsertPosition('alertPortal').appendChild(document.createElement('div'))
  return new Popover({el, propsData: options})
}

export default getPresentDismissIns(PopoverFactory)
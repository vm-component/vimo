/**
 * Created by Hsiang on 2016/12/26.
 */
import Vue from 'vue'
import { isString } from '../../util/util'
import loadingComponent from './loading.vue'
import { getPresentDismissIns } from '../../util/getPresentDismissIns'
import { getInsertPosition } from '../../util/getInsertPosition'
const Loading = Vue.extend(loadingComponent)

// -------- function --------

function LoadingFactory (options) {
  let el = getInsertPosition('loadingPortal').appendChild(document.createElement('div'))
  if (isString(options)) {
    options = {content: options}
  }
  return new Loading({el, propsData: options})
}

export default getPresentDismissIns(LoadingFactory)
/**
 * Created by Hsiang on 2017/4/24.
 */

/**
 * @component Indicator
 * @description
 *
 * ## 弹出层 / Indicator组件(小Loading)
 *
 * Indicator组件调用不需要传入参数, 只需要在不需要他的时候调用`dismiss()`方法即可, 他的默认最大开启时间为10000ms. 这部分可在config中通过`maxIndicatorDuration`配置.
 *
 * @see component:Loading
 *
 * @demo http://xiangsongtao.com/vimo/#/indicator
 * @usage
 * // 开启300ms后关闭
 * openIndicator300 () {
 *      this.$indicator.present()
 *      setTimeout(() => {
 *        this.$indicator.dismiss()
 *      }, 300)
 * },
 * */

import Vue from 'vue'
import { getInsertPosition } from '../../util/getInsertPosition'
import { isString } from '../../util/util'
import loadingComponent from '../loading/loading.vue'
const Loading = Vue.extend(loadingComponent)

// -------- function --------

function LoadingFactory (options) {
  let el = getInsertPosition('loadingPortal').appendChild(document.createElement('div'))
  if (isString(options)) {
    options = {content: options}
  }
  return new Loading({el, propsData: options})
}

const options = {
  cssClass: 'indicator',
  showBackdrop: false,
  duration: window.VM && window.VM.config.get('maxIndicatorDuration', 10000),
  mode: 'ios'
}

function getPresentDismissIns () {
  return {
    _i: null, // instance 组件实例

    /**
     * 开启组件
     * @desc
     * 如果上一个实例是开启状态, 则自动关闭后开启新的
     * @return {Promise} - 开启动画结束的promise
     * */
    present () {
      return new Promise((resolve) => {
        if (this._i) {
          if (this._i.isActive) {
            resolve()
          } else {
            this._i = LoadingFactory(options)
            this._i.present().then(() => { resolve() })
          }
        } else {
          this._i = LoadingFactory(options)
          this._i.present().then(() => { resolve() })
        }
      })
    },

    /**
     * 关闭组件
     * @return {Promise} - 关闭动画结束的promise
     * */
    dismiss () {
      return new Promise((resolve) => {
        if (this._i && this._i.isActive) {
          this._i.dismiss().then(() => { resolve() })
        } else {
          resolve()
        }
      })
    }
  }
}

export default getPresentDismissIns()
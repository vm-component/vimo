/**
 * Created by Hsiang on 2016/12/26.
 */
import Vue from 'vue'
import { isNumber, isObject, isPresent, isString } from '../../util/util'
import loadingComponent from './loading.vue'
const LoadingConstructor = Vue.extend(loadingComponent)
const DOM_INSERT_POSITION = 'loadingPortal' // the DOM position of component insert to
const DOM_INSERT_POSITION_FALLBACK = 'app'// fallback position

// -------- function --------
class Loading extends LoadingConstructor {
  constructor (options) {
    super(options)
    // params
    if (isObject(options)) {
      for (let key in options)  this[key] = options[key]
    }
  }
}

function LoadingFactory (options) {

  let _insertPosition
  let el = null
  let spinner = window.VM && window.VM.config.get('spinner', 'ios') || 'ios'
  let content = null
  let duration = 0
  let cssClass = null
  let showBackdrop = true
  let dismissOnPageChange = false
  let mode = window.VM && window.VM.config.get('mode', 'ios') || 'ios'

  // get data
  _insertPosition = document.getElementById(DOM_INSERT_POSITION) || document.getElementById(DOM_INSERT_POSITION_FALLBACK) || document.body
  el = _insertPosition.appendChild(document.createElement('div'))

  if (isString(options)) {
    content = options
  }

  if (isObject(options)) {
    spinner = isPresent(options.spinner) ? options.spinner.trim() : null
    content = isPresent(options.content) ? options.content.trim() : null
    duration = isNumber(options.duration) ? parseInt(options.duration) : duration
    cssClass = isPresent(options.cssClass) ? options.cssClass.trim() : null
    showBackdrop = !!options.showBackdrop
    dismissOnPageChange = !!options.dismissOnPageChange
    mode = isPresent(options.mode) ? options.mode.trim() : mode
  }

  return new Loading({
    el, spinner, content, duration, cssClass, showBackdrop, dismissOnPageChange, mode
  })
}

// 这个不是单例，每次开启获取最新loading实例，并缓存在_i上
export default {
  _i: null, // instance
  present(options){
    if (this._i && this._i.isActive) {
      this._i.dismiss().then(() => {
        this._i = LoadingFactory(options)
        // 自动开启
        this._i.present()
        return this._i
      })
    } else {
      this._i = LoadingFactory(options)
      // 自动开启
      this._i.present()
      return this._i
    }
  },
  dismiss(){
    return this._i && this._i.dismiss()
  }
}

import LoadingComponent from '../loading/loading.vue'
import GeneratePopUpInstance from '../../util/GeneratePopUpInstance.js'
import { isBlank, isBoolean, isObject, isString } from '../../util/type'

let debounce = require('lodash.debounce')
let throttle = require('lodash.throttle')
let startTime

class LoadingInstance extends GeneratePopUpInstance {
  normalizeOptions (options = {}) {
    if (isString(options)) {
      options = {content: options}
    }

    let defaultOptions = {
      isReverse: false,
      dismissOnPageChange: false
    }

    if (isBlank(options)) {
      options = defaultOptions
    }

    if (isObject(options)) {
      options = Object.assign({}, defaultOptions, options)
    }

    if (isBoolean(options)) {
      options = {
        isReverse: options,
        dismissOnPageChange: false
      }
    }

    let cssClass = 'indicator'
    if (options.isReverse) {
      cssClass += ' reverse'
    }

    options.cssClass = cssClass
    options.showBackdrop = false
    options.scrollControl = false
    options.dismissOnPageChange = true
    options.mode = 'ios'
    options.spinner = 'ios'
    options.duration = 10000
    return options
  }
}

let _present = LoadingInstance.prototype.present
let _dismiss = LoadingInstance.prototype.dismiss
let _dismissDebounce = debounce(_dismiss, 500)
let _presentDebounce = debounce(throttle(_present, 500, {
  leading: true, // 首次触发, 之后不再触发
  trailing: false
}), 20)

LoadingInstance.prototype.present = function () {
  // console.log('1 [LoadingInstance.prototype.present]')
  // console.log(this)
  startTime = new Date().getTime()
  _presentDebounce.call(this, ...arguments)
}

LoadingInstance.prototype.dismiss = function () {
  // console.log('2 [LoadingInstance.prototype.dismiss]')
  // console.log(this)
  let now = new Date().getTime()
  // console.log(`当前持续时间: ${now - startTime}ms`)
  if ((now - startTime < 20)) {
    // console.log('3 [LoadingInstance.prototype.dismiss] _debouncedPresent.cancel()')
    _presentDebounce.cancel()
  } else {
    // console.log('4 [LoadingInstance.prototype.dismiss] _dismissDebounce.call(this)')
    _dismissDebounce.call(this)
  }
}

export default new LoadingInstance(LoadingComponent, 'loadingPortal')

import LoadingComponent from '../loading/loading.vue'
import GeneratePopUpInstance from '../../util/GeneratePopUpInstance.js'
import { isBlank, isBoolean, isObject, isString } from '../../util/type'

var debounce = require('lodash.debounce')
var throttle = require('lodash.throttle')

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

let _dismiss = LoadingInstance.prototype.dismiss
let _debouncedDismiss = debounce(_dismiss, 500)
LoadingInstance.prototype.dismiss = _debouncedDismiss

let _present = LoadingInstance.prototype.present
let _debouncedPresent = throttle(_present, 500, {
  leading: true, // 首次触发, 之后不再触发
  trailing: false
})
LoadingInstance.prototype.present = _debouncedPresent

export default new LoadingInstance(LoadingComponent, 'loadingPortal')

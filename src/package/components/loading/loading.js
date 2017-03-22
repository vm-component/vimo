/**
 * Created by Hsiang on 2016/12/26.
 */
import Vue from 'vue';
import { isNumber, isObject, isPresent } from '../../util/util';
const loadingComponent = require('./loading.vue');
const LoadingConstructor = Vue.extend(loadingComponent);
const DOM_INSERT_POSITION = 'loadingPortal'; // the DOM position of component insert to
const DOM_INSERT_POSITION_FALLBACK = 'app';// fallback position

// -------- function --------
class Loading extends LoadingConstructor {
  constructor (options) {
    super(options);
    // params
    if (isObject(options)) {
      for (let key in options)  this[key] = options[key]
    }
  }
}

function LoadingFactory (options) {
  let _insertPosition;
  let el = null;
  let spinner = window.VM && window.VM.config.get('spinner', 'ios') || 'ios';
  let content;
  let duration = 0;
  let cssClass;
  let showBackdrop;
  let dismissOnPageChange;
  let mode = window.VM && window.VM.config.get('mode', 'ios') || 'ios';

  // get data
  _insertPosition = document.getElementById(DOM_INSERT_POSITION) || document.getElementById(DOM_INSERT_POSITION_FALLBACK) || document.body;
  el = _insertPosition.appendChild(document.createElement('div'));
  spinner = isPresent(options.spinner) ? options.spinner.trim() : null;
  content = isPresent(options.content) ? options.content.trim() : null;
  duration = isNumber(options.duration) ? parseInt(options.duration) : duration;
  cssClass = isPresent(options.cssClass) ? options.cssClass.trim() : null;
  showBackdrop = !!options.showBackdrop;
  dismissOnPageChange = !!options.dismissOnPageChange;
  mode = isPresent(options.mode) ? options.mode.trim() : mode;

  return new Loading({
    el, spinner, content, duration, cssClass, showBackdrop, dismissOnPageChange, mode
  })
}

export default  {
  present(options){
    let _instance = Vue.prototype._loading;
    if (_instance && _instance.isActive) {
      _instance.dismiss().then(() => {
        _instance = LoadingFactory(options);
        Vue.prototype._loading = _instance;
        // 自动开启
        _instance.present();
        return _instance;
      });
    } else {
      _instance = LoadingFactory(options);
      Vue.prototype._loading = _instance;
      // 自动开启
      _instance.present();
      return _instance;
    }
  },
  dismiss(){
    return Vue.prototype._loading.dismiss();
  }
}

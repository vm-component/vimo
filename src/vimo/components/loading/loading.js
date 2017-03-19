/**
 * Created by Hsiang on 2016/12/26.
 *
 * 关于实例化的方法请参考actionSheet的处理
 *
 * 单例模式实例化调用, 一次只能开启一个实例, 开启之前需要判断
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
  let spinner;
  let content;
  let duration = 4000;
  let cssClass;
  let showBackdrop;
  let dismissOnPageChange;
  let mode = VM && VM.config.get('mode', 'ios') || 'ios';

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

export default function (options) {
  let _instance = LoadingFactory(options);
  // 自动开启
  _instance.present();
  return _instance;
};


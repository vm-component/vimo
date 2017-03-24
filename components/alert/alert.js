/**
 * Created by Hsiang on 2016/12/23.
 */
import Vue from 'vue';
import { isArray, isObject, isPresent } from '../../util/util';

const alertComponent = require('./alert.vue');
const AlertConstructor = Vue.extend(alertComponent);
const DOM_INSERT_POSITION = 'alertPortal'; // the DOM position of component insert to
const DOM_INSERT_POSITION_FALLBACK = 'app'; // fallback position
// ---------- functions ----------

class Alert extends AlertConstructor {
  constructor (options) {
    super(options);
    // params
    if (isObject(options)) {
      for (let key in options)  this[key] = options[key]
    }
  }
}

function AlertFactory (options) {
  let _insertPosition;
  let el = null;
  let title;
  let subTitle;
  let message;
  let cssClass;
  let buttons;
  let inputs;
  let enableBackdropDismiss;
  let mode = window.VM && window.VM.config.get('mode', 'ios') || 'ios';

  // get data
  _insertPosition = document.getElementById(DOM_INSERT_POSITION) || document.getElementById(DOM_INSERT_POSITION_FALLBACK) || document.body;
  el = _insertPosition.appendChild(document.createElement('div'));
  title = isPresent(options.title) ? options.title.trim() : null;
  subTitle = isPresent(options.subTitle) ? options.subTitle.trim() : null;
  message = isPresent(options.message) ? options.message.trim() : null;
  cssClass = isPresent(options.cssClass) ? options.cssClass.trim() : null;
  isArray(options.buttons) ? ( buttons = options.buttons) : ( buttons = []);
  isArray(options.inputs) ? ( inputs = options.inputs) : ( inputs = []);
  enableBackdropDismiss = !!options.enableBackdropDismiss;
  mode = isPresent(options.mode) ? options.mode.trim() : mode;

  return new Alert({
    el, title, subTitle, message, cssClass, buttons, inputs, enableBackdropDismiss, mode
  })
}

export default function (options) {
  let _instance = AlertFactory(options);
  // 自动开启
  _instance.present();
  return _instance;
};








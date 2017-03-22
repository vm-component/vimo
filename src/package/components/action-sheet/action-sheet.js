/**
 * Created by Hsiang on 2016/12/23.
 */
import Vue from 'vue';
import actionSheetComponent from './action-sheet.vue';
import { isArray, isObject, isPresent } from '../../util/util';
const ActionSheetConstructor = Vue.extend(actionSheetComponent);
const DOM_INSERT_POSITION = 'sheetPortal'; // the DOM position of component insert to
const DOM_INSERT_POSITION_FALLBACK = 'app'; // fallback position

// ---------- functions ----------

class ActionSheet extends ActionSheetConstructor {
  constructor (options) {
    super(options);
    // params
    if (isObject(options)) {
      for (let key in options)  this[key] = options[key]
    }
  }
}

function ActionSheetFactory (options) {
  let _insertPosition;
  let el = null;
  let title;
  let subTitle;
  let cssClass;
  let buttons;
  let enableBackdropDismiss;
  let mode = window.VM && window.VM.config.get('mode', 'ios') || 'ios';

  // get data
  _insertPosition = document.getElementById(DOM_INSERT_POSITION) || document.getElementById(DOM_INSERT_POSITION_FALLBACK) || document.body;
  el = _insertPosition.appendChild(document.createElement('div'));
  title = isPresent(options.title) ? options.title.trim() : null;
  subTitle = isPresent(options.subTitle) ? options.subTitle.trim() : null;
  cssClass = isPresent(options.cssClass) ? options.cssClass.trim() : null;
  isArray(options.buttons) ? ( buttons = options.buttons) : ( buttons = []);
  enableBackdropDismiss = !!options.enableBackdropDismiss;
  mode = isPresent(options.mode) ? options.mode.trim() : mode;

  return new ActionSheet({
    el, title, subTitle, cssClass, buttons, enableBackdropDismiss, mode
  })
}

export function ActionSheet(options) {
  let _instance = ActionSheetFactory(options);
  // 自动开启
  _instance.present();
  return _instance;
};

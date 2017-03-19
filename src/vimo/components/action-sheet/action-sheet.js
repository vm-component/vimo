/**
 * @module Component/ActionSheet
 * @description
 *
 * ActionSheet是一个从底部弹出的按钮表单，一般都是由很多Button组成。当用户点击确认完毕后关闭.
 *
 * 它显示在应用内容的顶层，必须由用户手动关闭，然后他们才能恢复与应用的互动。
 * 有一些简单的方法可以取消操作表，例如点击背景幕或者点击桌面上的退出键,
 * 也就是说, ActionSheet能监听url的变化做出关闭的动作。
 *
 * 如果选择后需要翻页, 希望能在promise回调中执行, 保证ActionSheet的动画能正常关闭, 保证流畅度.
 *
 * @property {String} [title]                     - ActionSheet的标题
 * @property {string} [subTitle]                  - ActionSheet的副标题
 * @property {string} [cssClass]                  - Additional classes for custom styles, separated by spaces
 * @property {Array} [buttons]                   - button数组，包含全部role
 * @property {Boolean} [enableBackdropDismiss=true]  - 允许点击backdrop关闭actionsheet
 * @property {string} [mode=ios]                     - 样式模式
 *
 * @example
 *
 const _this = this;
 let _actionSheet = _this.$actionSheet({
    title: '请选择操作',
    subTitle: '注意，选择后不能撤销！',
    cssClass: '  ActionSheetCssClass1 ActionSheetCssClass2  ',
    enableBackdropDismiss: true,
    buttons: [
      {
        text: '删除',
        role: 'destructive',
        icon: 'trash',
        cssClass: '  DestructiveBtnCssClass1 DestructiveBtnCssClass2 ',
        handler: () => {
          console.log('Destructive clicked');
        }
      },
      {
        text: '分享',
        icon: 'share',
        handler: () => {
          console.log('Archive1 clicked');
        }
      },
      {
        text: '播放',
        icon: 'play',
        handler: () => {
          console.log('Archive4 clicked');
        }
      },
      {
        text: '取消',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          _actionSheet.dismiss().then(function (data) {
            console.debug('promise的退出方式')
          });
        }
      }
    ]
  })
 *
 */

/**
 * @function dismiss
 * @description
 * Close ActionSheet Component
 *
 * @return {Promise} Return Promise when animate finished
 *
 * */

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
  let mode = 'ios';

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
    el, title, subTitle, cssClass, buttons, enableBackdropDismiss,mode
  })
}

export default function (options) {
  let _instance = ActionSheetFactory(options);
  // 自动开启
  _instance.present();
  return _instance;
};

/**
 * Created by Hsiang on 2016/12/18.
 *
 * ！！！！！不支持组件式调用！！！！！
 *
 * 使用实例方式调用actionSheet，故需要在此文件中模拟组件使用过程
 * 此文件是实例化函数，
 * 可以为实例绑定方法，但是方法应该隶属于组件(action-sheet.vue)自己
 * 全局共用一个实例，挂在到 Vue.prototype._actionSheet 上
 *
 * 注意，如果想在一个ActionSheet的button中打开另一个ActionSheet(扯淡的需求)，
 * 那就在dismiss()的promise中初始化并打开吧
 *
 * 在页面动画过程中, 页面会进入短暂的 冻结状态
 */
import Vue from 'vue';
import actionSheetComponent from './action-sheet.vue';
import { urlChange } from '../../util/dom';
const ActionSheetConstructor = Vue.extend(actionSheetComponent);
let _insertPosition;

ActionSheetConstructor.prototype.present = present;
ActionSheetConstructor.prototype.dismiss = dismiss;

// ---------- functions ----------

/**
 * 开启的外部函数, 内部_present用于控制组件开闭,
 * 外部present用于初始化传参
 * @param {object} options
 * */
function present (options) {
  const _this = this;
  if(_this.isActive){
    console.debug('actionSheet实例当前只能开启一个!')
    return
  }
  // 初始化参数

  // 参数传入
  _this.title = !!options.title ? options.title.trim() : '';
  _this.subTitle = !!options.subTitle ? options.subTitle.trim() : '';
  _this.cssClass = !!options.cssClass ? options.cssClass.trim() : '';
  _this.buttons = options.buttons;
  _this.enableBackdropDismiss = !!options.enableBackdropDismiss;

  // 重置
  _this.isActive = false;
  _this.enabled = false;
  _this.normalButtons = [];
  _this.cancelButton = null;

  _insertPosition = document.getElementById('overlayPortal');
  if (!!_insertPosition) {
    _insertPosition.appendChild(_this.$el);
  } else {
    document.body.appendChild(_this.$el);
  }

  // 地址切换就执行dismiss()
  urlChange(function () {
    _this.isActive && _this.dismiss();
  });

  return this._present()
};

/**
 * 关闭
 * */
function dismiss () {
  return this._dismiss()
}

/**
 * 获取示例，保持单利状态
 */
function getAnInstance () {
  if (!Vue.prototype._actionSheet) {
    Vue.prototype._actionSheet = new ActionSheetConstructor({
      el: document.createElement('div')
    })
  }
  return Vue.prototype._actionSheet
};

export default getAnInstance;

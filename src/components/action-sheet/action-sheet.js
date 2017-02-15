/**
 * Created by Hsiang on 2016/12/18.
 *
 * ！！！！！不支持组件式调用！！！！！
 *
 * 使用实例方式调用ActionSheet，故需要在此文件中模拟组件使用过程
 * 此文件是实例化函数，
 * 可以为实例绑定方法，但是方法应该隶属于组件(action-sheet.vue)自己
 * 全局共用一个实例，挂在到window上,暂时这样
 *
 * 注意，如果想在一个ActionSheet的button中打开另一个ActionSheet(扯淡的需求)，
 * 那就在dismiss()的promise中初始化并打开吧
 */
import Vue from 'vue';
import actionSheetComponent from './action-sheet.vue'
const actionSheetConstructor = Vue.extend(actionSheetComponent);
let _insertPosition;

/**
 * 使用create创建ActionSheet的实例，与IONIC保持一致
 * */
let ActionSheet = {
  isOpen:false,
  create (options = {}) {
    // 获取实例
    let instance = new actionSheetConstructor({
      el: document.createElement('div')
    });
    // 参数传入
    instance.title = !!options.title ? options.title.trim() : '';
    instance.subTitle = !!options.subTitle ? options.subTitle.trim() : '';
    instance.cssClass = !!options.cssClass ? options.cssClass.trim() : '';
    instance.enableBackdropDismiss = !!options.enableBackdropDismiss;
    instance.buttons = options.buttons;

    // 插入DOM中
    _insertPosition = Vue.prototype.$getPortal();
    if (!!_insertPosition) {
      document.getElementById('app').insertBefore(instance.$el, _insertPosition.nextSibling);
    } else {
      document.body.appendChild(instance.$el);
    }
    return instance;
  }
};

export default ActionSheet;

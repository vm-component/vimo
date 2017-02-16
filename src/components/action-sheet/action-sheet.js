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
import actionSheetComponent from './action-sheet.vue'
const ActionSheetConstructor = Vue.extend(actionSheetComponent);
let _insertPosition;
let instance;

/**
 * 获取示例，保持单利状态
 */
let getAnInstance = () => {
  if(!Vue.prototype._actionSheet){
    Vue.prototype._actionSheet = new ActionSheetConstructor({
      el: document.createElement('div')
    })
  }
  return Vue.prototype._actionSheet
};


function actionSheetInstance (options = {}) {
  // 获取实例
  instance = getAnInstance();

  // 参数传入
  instance.title = !!options.title ? options.title.trim() : '';
  instance.subTitle = !!options.subTitle ? options.subTitle.trim() : '';
  instance.cssClass = !!options.cssClass ? options.cssClass.trim() : '';
  instance.buttons = options.buttons;
  instance.enableBackdropDismiss = !!options.enableBackdropDismiss;

  // 重置
  instance.isActive = false;
  instance.enabled = false;
  instance.normalButtons = [];
  instance.cancelButton = null;

  // 插入DOM中
  _insertPosition = document.getElementById('overlayPortal');
  if (!!_insertPosition) {
    _insertPosition.appendChild(instance.$el);
  } else {
    document.body.appendChild(instance.$el);
  }

  instance.present();
  return instance;
}

export default actionSheetInstance;

/**
 * Created by Hsiang on 2016/12/23.
 * 关于设计构思参考actionSheet设计
 */

import Vue from 'vue';
const alertComponent = require('./alert.vue');
const AlertConstructor = Vue.extend(alertComponent);
let _insertPosition;
let instance;
/**
 * 获取示例，保持单利状态
 */
let getAnInstance = () => {
  if(!Vue.prototype._alert){
    Vue.prototype._alert = new AlertConstructor({
      el: document.createElement('div')
    })
  }
  return Vue.prototype._alert
};

/**
 * 初始化实例
 * @param {object} options - 传参指纹
 * */
function alertInstance (options = {}) {
  instance = getAnInstance();

  // 参数传入
  instance.title = !!options.title ? options.title.trim() : '';
  instance.subTitle = !!options.subTitle ? options.subTitle.trim() : '';
  instance.message = !!options.message ? options.message.trim() : '';
  instance.cssClass = !!options.cssClass ? options.cssClass.trim() : '';
  instance.buttons = options.buttons;
  instance.inputs = options.inputs;
  instance.enableBackdropDismiss = !!options.enableBackdropDismiss;
  instance.inputsForDispaly = [];

  // 重置
  instance.isActive = false;
  instance.enabled = false;
  instance.inputType = null;
  instance.activeId = null;
  instance.isAlertTop = false;

  // 插入DOM中
  _insertPosition = Vue.prototype.$getPortal('ALERT');
  if (!!_insertPosition) {
    document.getElementById('app').insertBefore(instance.$el, _insertPosition.nextSibling);
  } else {
    document.body.appendChild(instance.$el);
  }

  instance.present();
  return instance;
}

export default alertInstance;

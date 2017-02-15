/**
 * Created by Hsiang on 2016/12/23.
 */

import Vue from 'vue';
const alert = require('./alert.vue');
const alertConstructor = Vue.extend(alert);

// 实例方法挂载

/**
 * Present(呈现) the alert instance.
 * @returns {Promise} Returns a promise which is resolved when the transition has completed.
 */
alertConstructor.prototype.present = function () {
  // this为组件实例，调用组件自己的方法。
  return this.present();
};

/**
 * Dismiss(撤销) the alert instance.
 * @returns {Promise} Returns a promise which is resolved when the transition has completed.
 */
alertConstructor.prototype.dismiss = function () {
  return this.dismiss();
};

/**
 * @param {string} title alert title
 */
alertConstructor.prototype.setTitle = function (title) {
  this.setTitle(title);
};

/**
 * @param {string} subTitle alert subtitle
 */
alertConstructor.prototype.setSubTitle = function (subTitle) {
  this.setSubTitle(subTitle);
};

/**
 * @param {object} button alert button
 */
alertConstructor.prototype.addButton = function (button) {
  this.addButton(button);
};

/**
 * 获取示例，保持单利状态
 */
let getAnInstance = () => {
  return new alertConstructor({
    el: document.createElement('div')
  })
};

/**
 * 使用create创建Alert的实例，与IONIC保持一致
 * */
let Alert = {
  create: function (options = {}) {

    let instance = getAnInstance();

    // 参数传入
    instance.title = !!options.title ? options.title.trim() : '';
    instance.subTitle = !!options.subTitle ? options.subTitle.trim() : '';
    instance.message = !!options.message ? options.message.trim() : '';
    instance.cssClass = !!options.cssClass ? options.cssClass.trim() : '';
    instance.enableBackdropDismiss = !!options.enableBackdropDismiss;
    instance.buttons = options.buttons;
    instance.inputs = options.inputs;

    // 插入DOM中
    document.body.appendChild(instance.$el);
    return instance;
  }
};

export default Alert;

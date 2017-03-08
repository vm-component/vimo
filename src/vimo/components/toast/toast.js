/**
 * Created by Hsiang on 2017/2/7.
 *
 * 类实例化调用, 注意: toast不是单例模式, 但是类似于单例模式的调用,
 *
 * 组件关闭使用两种方式控制, 二选一:
 * 1. duration 过期时间
 * 2. showCloseButton 关闭按钮
 *
 * 关闭动画完毕后,执行onDismiss注册的函数
 *
 * dismissOnPageChange默认是false状态,
 *
 */

import Vue from 'vue';
let toastComponent = require('./toast.vue');
const ToastConstructor = Vue.extend(toastComponent);
const POSITIONS = ['top', 'middle', 'bottom'];
const noop = function () {};
let _insertPosition = null;
let _toastList = [];

// ---------- functions ----------

/**
 * 创建ToastInstance, 并且根据传参指纹构建对象
 * @param {object/string} arg0
 * @param {number} arg1?
 * */
function prepareInstance (arg0, arg1) {
  let options = arg0;

  let instance = new ToastConstructor({
    el: document.createElement('div'),
  });

  switch (arguments.length) {
    case 1:

      if (typeof arg0 === 'string') {
        // this.$toast.present("String")
        instance.message = arg0.trim();
        instance.duration = 3000;
      } else if (typeof arg0 === 'object') {
        // this.$toast.present({...})
        instance.message = !!arg0.message && arg0.message.trim();
        instance.duration = !!parseInt(arg0.duration) ? parseInt(arg0.duration) : null;
      }
      break;
    case 2:
      // this.$toast.present("String",1000)
      instance.message = arg0.trim();
      instance.duration = parseInt(arg1);
      break;
  }

  // position
  if (!!options.position && POSITIONS.indexOf(options.position) > -1) {
    instance.position = options.position.trim();
  } else {
    instance.position = 'bottom';
  }

  // cssClass
  instance.cssClass = !!options.cssClass ? options.cssClass.trim() : null;

  // closeButton
  if (!!options.showCloseButton) {
    instance.duration = null;
  }
  instance.showCloseButton = !!options.showCloseButton;
  instance.closeButtonText = !!options.closeButtonText ? options.closeButtonText.trim() : '关闭';

  // onDismiss
  instance.onDismiss = !!options.onDismiss ? options.onDismiss : noop;

  // dismissOnPageChange
  instance.dismissOnPageChange = !!options.dismissOnPageChange;

  // 插入dom
  _insertPosition = document.getElementById('toastPortal');
  if (!!_insertPosition) {
    _insertPosition.appendChild(instance.$el);
  } else {
    document.body.appendChild(instance.$el);
  }

  return instance;
}

/**
 * 对外的Toast构建部分
 * */
function prepareToast () {
  return {
    present (...args) {
      // build instance
      let _instance = prepareInstance(...args);

      // register navigation back event
      if (_toastList.length === 0) {
        Vue.prototype.$eventBus.$on('onRouteChangeBefore',function () {
          _toastList.forEach(function (item) {
            if (item.isActive) {
              if (!item.dismissOnPageChange) {
                return
              }
              if (item.showCloseButton) {
                item.cbClick()
              } else if (item.timer) {
                clearTimeout(item.timer);
                item.timer = null;
                item._dismiss().then(function () {
                  !!item.onDismiss && item.onDismiss()
                })
              }
            }
          });
          _toastList = [];
        })
      }

      // store
      _toastList.push(_instance);
      return _instance._present();
    },
  }
}

export default prepareToast;

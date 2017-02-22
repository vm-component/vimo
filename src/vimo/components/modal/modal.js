/**
 * Created by Hsiang on 2017/2/18.
 *
 * Modal是不是单例组件,
 * 而且Modal可以叠加弹出多次, Model的开关是由Modal自己控制的
 *
 *
 */
import Vue from 'vue';
import modalComponent from './modal.vue';
import { urlChange } from '../../util/dom';
let _modalArr = [];
let _unRegisterUrlChange = null;
const ModalConstructor = Vue.extend(modalComponent);

// ---------- functions ----------

/**
 * 获取实例
 */
function getModalInstance () {
  return new ModalConstructor({
    el: document.getElementById('modalPortal').appendChild(document.createElement('div'))
  })
}

/**
 * 开启Modal方法
 * 如果不懂想下: 桌子(页面)/菜盘(modal)/菜(template)的关系
 * 开启后获取Modal实例, 并将template初始化后挂在到Modal上, 然后注册urlChange事件
 * 在之后记录开启的Modal信息, 然后执行modal实例的_present开启.
 *
 * @param {object} options
 * 传入参数示例:
 * {
 *  template:require('*.vue'),
 *  modalData:{...},
 *  onDismiss(data){....}
 * }
 * */
function present (options = {}) {
  let template = options.template;
  let modalData = options.modalData;
  let onDismiss = options.onDismiss;

  let modalInstance = getModalInstance();
  let templateConstructor;
  let templateInstance;


  // 用户传入数据
  // 初始化用户自定义弹层的页面
  template.modalData = modalData;
  templateConstructor = Vue.extend(template);
  templateInstance = new templateConstructor({
    el: modalInstance.$el.querySelectorAll('.modalPageLoadPort')[0].appendChild(document.createElement('div'))
  });

  if (!_unRegisterUrlChange) {
    _unRegisterUrlChange = urlChange(function () {
      _modalArr.forEach(function (item) {
        item.modalInstance._dismiss();
      })
      _modalArr = [];
      _unRegisterUrlChange = null;
    });
  }

  // record
  _modalArr.push({
    modalInstance:modalInstance,
    template:options.template,
    templateInstance:templateInstance,
    modalData:modalData,
    onDismiss:onDismiss,
  });

  return modalInstance._present();
}

/**
 * 全局注册dismiss方法
 * dismiss关闭最后一次打开的Modal, 并执行onDismiss函数, 就酱
 *
 * @param {any} dataBack -  modal调用dismiss传递向外的数据
 * */
function dismiss (dataBack) {
  // 总是关闭最后一次创建的modal
  let lastModalIndex = _modalArr.length - 1;
  let lastModalInstance = _modalArr[lastModalIndex].modalInstance;
  // 执行注册的onDismiss回调
  _modalArr[lastModalIndex].onDismiss && _modalArr[lastModalIndex].onDismiss(dataBack);

  _modalArr.splice(lastModalIndex, 1);

  // 如果是最后一个则解绑urlChange
  if (_modalArr.length === 0) {
    !!_unRegisterUrlChange && _unRegisterUrlChange();
    _unRegisterUrlChange = null;
  }

  return lastModalInstance._dismiss()
}

function modal () {
  return {
    present,
    dismiss,
  }
}

export default modal

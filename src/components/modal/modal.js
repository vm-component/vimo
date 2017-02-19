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
const ModalConstructor = Vue.extend(modalComponent);


ModalConstructor.prototype.present = present;
ModalConstructor.prototype.dismiss = dismiss;

// ---------- functions ----------


/**
 * 获取实例
 */
function getInstance () {
  return new ModalConstructor({
    el: document.getElementById('modalPortal').appendChild(document.createElement('div'))
  })
}

/**
 * 打开
 * */
function present () {
  _modalArr.push(this);
  console.log('_modalArr')
  console.log(_modalArr)
  return this._present()
}

/**
 * 关闭
 * */
function dismiss (val) {
  console.log('dismiss方法')
  console.log(val)
  console.log('_modalArr')
  console.log(_modalArr)
  return this._dismiss()
}

function modal () {
  return {
    create(CustomerVueComponent, data){
      let instance = getInstance();
      console.log('create')
      console.log(CustomerVueComponent)
      console.log(data)


      CustomerVueComponent.modalData = data;


      let CustomerVueConstructor = Vue.extend(CustomerVueComponent);


      new CustomerVueConstructor({
        el: document.getElementById('modalPageLoadPort').appendChild(document.createElement('div'))
      })

      // setTimeout(function () {
      //   instance.dismiss();
      // },3000)
      // instance.present();

      return instance;
    },

  }
}

export default modal

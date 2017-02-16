/**
 * Created by Hsiang on 2016/2/16.
 *
 * 关于实例化调用请参考actionSheet
 *
 */
import Vue from 'vue';
import backdropComponent from './backdrop.vue'
const BackdropConstructor = Vue.extend(backdropComponent);
let _insertPosition;
let instance;

/**
 * 获取示例，保持单利状态
 */
let getAnInstance = () => {
  if(!Vue.prototype._backdrop){
    Vue.prototype._backdrop = new BackdropConstructor({
      el: document.createElement('div')
    })
  }
  return Vue.prototype._backdrop
};


function backdropInstance () {
  // 获取实例
  instance = getAnInstance();

  // 插入DOM中
  _insertPosition = document.getElementById('backdropPortal');
  if (!!_insertPosition) {
    // document.getElementById('app').insertBefore(instance.$el, _insertPosition.nextSibling);
    _insertPosition.appendChild(instance.$el);
  } else {
    document.body.appendChild(instance.$el);
  }

  return instance;
}

export default backdropInstance;

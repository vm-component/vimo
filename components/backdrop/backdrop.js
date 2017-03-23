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
function getAnInstance () {
  if (!Vue.prototype._backdrop) {
    instance = Vue.prototype._backdrop = new BackdropConstructor({
      el: document.createElement('div')
    })
    // 插入DOM中
    _insertPosition = document.getElementById('backdropPortal');
    if (!!_insertPosition) {
      _insertPosition.appendChild(instance.$el);
    } else {
      document.body.appendChild(instance.$el);
    }
  }
  return Vue.prototype._backdrop
}

/**
 * 开启
 * */
function present (options = null) {
  // 获取实例
  instance = getAnInstance();
  instance.present(options);
}

/**
 * 关闭
 * */
function dismiss () {
  instance.dismiss();
}

// 返回实例
export default  {
  present,
  dismiss,
};

/**
 * Created by Hsiang on 2017/4/24.
 */
import Vue from 'vue'
import { getInsertPosition } from '../../util/getInsertPosition'
import { isString } from '../../util/util'
import loadingComponent from '../loading/loading.vue'
const Loading = Vue.extend(loadingComponent)

// -------- function --------

function LoadingFactory (options) {
  let el = getInsertPosition('loadingPortal').appendChild(document.createElement('div'))
  if (isString(options)) {
    options = {content: options}
  }
  return new Loading({el, propsData: options})
}

const options = {
  cssClass: 'indicator',
  showBackdrop: false,
  duration: 10000,
  mode: 'ios'
}

function getPresentDismissIns () {
  return {
    /**
     * 组件实例
     * */
    _i: null, // instance

    /**
     * 开启
     * @desc
     * 如果上一个实例是开启状态, 则自动关闭后开启新的
     * @param {object} options - 传入参数
     * @return {Promise} - 开启动画结束的promise
     * */
    present(){
      console.log(this._i)
      return new Promise((resolve) => {
        if (this._i) {
          if (this._i.isActive) {
            resolve()
          } else {
            this._i = LoadingFactory(options)
            this._i.present().then(() => {resolve()})
          }
        } else {
          this._i = LoadingFactory(options)
          this._i.present().then(() => {resolve()})
        }
      })
    },

    /**
     * 关闭
     * @return {Promise} - 关闭动画结束的promise
     * */
    dismiss(){
      return new Promise((resolve) => {
        if (this._i && this._i.isActive) {
          this._i.dismiss().then(() => {resolve()})
        } else {
          resolve()
        }
      })
    }
  }
}

export default getPresentDismissIns()
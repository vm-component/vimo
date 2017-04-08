/**
 * Created by Hsiang on 2016/12/26.
 */
import Vue from 'vue'
import { isString } from '../../util/util'
import loadingComponent from './loading.vue'
const Loading = Vue.extend(loadingComponent)
const DOM_INSERT_POSITION = 'loadingPortal' // the DOM position of component insert to
const DOM_INSERT_POSITION_FALLBACK = 'app'// fallback position

// -------- function --------

function LoadingFactory (options) {
  let _insertPosition = document.getElementById(DOM_INSERT_POSITION) || document.getElementById(DOM_INSERT_POSITION_FALLBACK) || document.body
  let el = _insertPosition.appendChild(document.createElement('div'))
  if (isString(options)) {
    options = {
      content: options
    }
  }
  return new Loading({
    el, propsData: options
  })
}

// 这个不是单例，每次开启获取最新loading实例，并缓存在_i上
export default {
  _i: null, // instance
  present(options){
    if (this._i && this._i.isActive) {
      this._i.dismiss().then(() => {
        this._i = LoadingFactory(options)
        // 自动开启
        this._i.present()
        return this._i
      })
    } else {
      this._i = LoadingFactory(options)
      // 自动开启
      this._i.present()
      return this._i
    }
  },
  dismiss(){
    if (this._i && this._i.isActive) {
      return this._i.dismiss()
    } else {
      return new Promise((resolve)=>{
        resolve()
      })
    }
  }
}

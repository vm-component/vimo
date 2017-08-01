/**
 * Created by Hsiang on 2017/4/24.
 */

/**
 * @component Indicator
 * @description
 *
 * ## 弹出层 / Indicator组件(小Loading)
 *
 * Indicator组件调用不需要传入参数, 只需要在不需要他的时候调用`dismiss()`方法即可, 他的默认最大开启时间为10000ms. 这部分可在config中通过`maxIndicatorDuration`配置.
 *
 * ### loading动画事件
 *
 * 200ms
 *
 * ### indicator最短开启时间
 *
 * 500ms
 *
 *
 * @see component:Loading
 *
 * @props {Object} options - 参数
 * @props {Boolean} [isReverse=false] - 是否反色
 * @props {Boolean} [dismissOnPageChange=true] - 页面切换是否关闭
 *
 * @demo https://dtfe.github.io/vimo-demo/#/indicator
 * @usage
 * // 开启300ms后关闭
 * openIndicator300 () {
 *      this.$indicator.present()
 *      setTimeout(() => {
 *        this.$indicator.dismiss()
 *      }, 300)
 * },
 *
 *
 * // 反色
 * openIndicator300 () {
 *      this.$indicator.present(true)
 *      setTimeout(() => {
 *        this.$indicator.dismiss()
 *      }, 300)
 * },
 *
 * */

import Vue from 'vue'
import { getInsertPosition } from '../util/getInsertPosition'
import { isBlank, isBoolean, isObject, isString } from '../util/util'
import loadingComponent from '../loading/loading.vue'
const Loading = Vue.extend(loadingComponent)
const MinTime = 500

// -------- function --------

function LoadingFactory (options) {
  let el = getInsertPosition('loadingPortal').appendChild(document.createElement('div'))
  if (isString(options)) {
    options = {content: options}
  }
  return new Loading({el, propsData: options})
}

export default {
  _i: null, // instance 组件实例
  _startTime: new Date().getTime(),
  _timer: null,
  _count: 0,

  /**
   * 开启组件
   * @desc
   * 如果上一个实例是开启状态, 则自动关闭后开启新的
   * @param {Object|Boolean} options - isReverse
   * @param {Boolean} options.isReverse - 是否反色
   * @param {Boolean} options.dismissOnPageChange - 页面切换是否关闭
   * */
  present (options) {

    let defaultOptions = {
      isReverse: false,
      dismissOnPageChange: true
    }

    if (isBlank(options)) {
      options = defaultOptions
    }

    if (isObject(options)) {
      options = Object.assign({}, defaultOptions, options)
    }

    if (isBoolean(options)) {
      options = {
        isReverse: options,
        dismissOnPageChange: true
      }
    }

    return new Promise((resolve) => {
      if (!this._i) {
        // 当前没人在场
        // console.debug('Indicator 1 当前没人在场: 未开启状态, 准备开启')
        this._startTime = new Date().getTime()
        let cssClass = 'indicator'
        if (options.isReverse) {
          cssClass += ' reverse'
        }
        this._i = LoadingFactory({
          cssClass: cssClass,
          showBackdrop: false,
          dismissOnPageChange: options.dismissOnPageChange,
          mode: 'ios'
        })
        this._i.present().then(() => {
          resolve()
        })
      } else {
        // 当前有人在场
        if (this._i.isActive) {
          // console.debug('Indicator 2 当前有人在场: 状态开启中')
          // 在场表演呢
          if (this._timer) {
            // 存在定时器要她退场
            // console.debug('Indicator 3 存在定时器要她退场: 这里清除定时器')
            this._timer && window.clearTimeout(this._timer)
            this._timer = null
          } else {
            this._count++
            // console.debug('Indicator 4 当前有人在场, 投票++ _count: ' + this._count)
          }
          resolve()
        } else {
          // 当前正在退场
          // console.debug('Indicator 5 当前正在退场: 不管他, 我这里执行一次开启')
          // this._i.isActive = true
          this._i.present().then(() => {
            resolve()
          })
        }
      }
    })
  },

  /**
   * 关闭组件
   * @return {Promise} - 关闭动画结束的promise
   * */
  dismiss () {
    return new Promise((resolve) => {
      if (this._i) {
        // 实例存在
        // console.debug('Indicator 11: 实例存在')
        if (this._count > 0) {
          // 要求多次开启, 关闭时减一票
          this._count--
          // console.debug('Indicator 12: 要求多次开启, 关闭时减一票, 当前count有值: ' + this._count)
        } else {
          if (this._i.isActive) {
            // active状态
            // console.debug('Indicator 13: 组件是active状态: 正常关闭')

            if (this._timer) {
              // console.debug('Indicator 14: 有定时器关闭: 这里不处理')
            } else {
              let now = new Date().getTime()
              let diff = now - this._startTime
              if (diff >= MinTime) {
                // 满足在场的最短时间, 可以关闭, 重置初始状态
                // console.debug('Indicator 15: 超过300ms 正常关闭')
                this._i.dismiss().then(() => {
                  this._i = null
                  this._startTime = null
                  this._timer && window.clearTimeout(this._timer)
                  this._timer = null
                  this._count = 0
                  resolve()
                })
              } else {
                // 不满足在场的最短时间, 保证300ms, 剩余时间定时补足
                let rest = MinTime - diff
                // console.debug('Indicator 16: 为了保证300ms后关闭, 这里进行定时, 剩余关闭时间: ' + rest)
                this._timer = window.setTimeout(() => {
                  this._i.dismiss().then(() => {
                    this._i = null
                    this._startTime = null
                    this._timer && window.clearTimeout(this._timer)
                    this._timer = null
                    this._count = 0
                    resolve()
                  })
                }, rest)
              }
            }
          } else {
            // 退场状态(已经在退场了, 这里不作处理)
            // console.debug('Indicator 17: 退场状态(已经在退场了, 这里不作处理)')
            this._i = null
            this._startTime = null
            this._timer && window.clearTimeout(this._timer)
            this._timer = null
            this._count = 0
            resolve()
          }
        }
      } else {
        // 实例不存在(不存在不需要退场)
        // console.debug('Indicator 18: 实例不存在(不存在不需要退场)')
        this._i = null
        this._startTime = null
        this._timer && window.clearTimeout(this._timer)
        this._timer = null
        this._count = 0
        resolve()
      }
    })
  }
}

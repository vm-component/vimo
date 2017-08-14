/**
 * @component ActionSheet
 * @description
 *
 * ## 弹出层 / ActionSheet确认单组件
 *
 * ### 简介
 *
 * ActionSheet是一个从底部弹出的按钮表单，一般都是由很多Button组成。当用户点击确认完毕后关闭. 可以把它当做**确认单组件**, 或者**单选组件**, 但是按钮建议不超过6个, 如果超过了组件也能正确处理,
 *   比如滚动选择.
 *
 *
 * ### 关于buttons属性
 * - role属性: 可以是cancel(关闭)/destructive(警告/删除)/null, destructive在IOS下有用, 样式为红色字体
 * - icon属性: 具体参考Icon组件的写法
 *
 * ### 注意点
 *
 * - 组件挂载点在App组件中定义, 是在业务页面之上, 且开启loading/toast都不会遮盖他.
 * - 弹出层默认都是根据路由相应的, 当路由切换则弹层自动关闭, 这部分可用`dismissOnPageChange`修改.
 * - 可以点击背景关闭组件, 这个在`enableBackdropDismiss`中定义.
 * - 建议在关闭动画Promise之后处理请他业务, 这样动画会顺滑一些, 这里监听动画的关闭不是使用setTimeout, 而是监听transitionEnd事件, 因此更可靠.
 *
 * @demo #/action-sheet
 * @example
 * this.$actionSheet.present({
   *  title: '请选择操作',
   *  subTitle: '注意，选择后不能撤销！',
   *  cssClass: 'ActionSheetCssClass1 ActionSheetCssClass2',
   *  enableBackdropDismiss: true,
   *  buttons: [
   *    {
   *      text: '删除',
   *      role: 'destructive',
   *      icon: 'trash',
   *      cssClass: '  DestructiveBtnCssClass1 DestructiveBtnCssClass2 ',
   *      handler: () => {
   *        console.log('Destructive clicked');
   *      }
   *    },
   *    {
   *      text: '分享',
   *      icon: 'share',
   *      handler: () => {
   *        console.log('Archive1 clicked');
   *      }
   *    },
   *    {
   *      text: '播放',
   *      icon: 'play',
   *      handler: () => {
   *        console.log('Archive4 clicked');
   *      }
   *    },
   *    {
   *      text: '取消',
   *      role: 'cancel',
   *      icon: 'close',
   *      handler: () => {
   *        this.$actionSheet.dismiss().then(function (data) {
   *          console.debug('promise的退出方式')
   *        });
   *      }
   *    }
   *  ]
   * })
 *
 */
import Vue from 'vue'
import { isArray } from '../util/util'
import { getInsertPosition } from '../util/getInsertPosition'
import actionSheetComponent from './action-sheet.vue'

const ActionSheet = Vue.extend(actionSheetComponent)

// ---------- functions ----------

function ActionSheetFactory (options) {
  let el = getInsertPosition('sheetPortal').appendChild(document.createElement('div'))
  return new ActionSheet({el, propsData: options})
}

function getPresentDismissIns (Factory) {
  return {
    /**
     * 组件实例
     * @private
     * */
    _i: null, // instance

    /**
     * @function present
     * @description
     * 开启ActionSheet组件, 当开启动画过度完毕时触发 `Promise` 的 `resolve` 。
     * @param {object} options - 传入参数
     * @param {String} [options.title]                        - ActionSheet的标题
     * @param {string} [options.subTitle]                     - ActionSheet的副标题
     * @param {string} [options.cssClass]                     - Additional classes for custom styles, separated by
     *   spaces
     * @param {Boolean} [options.enableBackdropDismiss=true]  - 允许点击backdrop关闭actionsheet
     * @param {Boolean} [options.dismissOnPageChange=true]    - 路由切换关闭组件
     * @param {string} [options.mode=ios]                     - 样式模式
     * @param {Array} [options.buttons]                       - button数组，包含全部role
     * @param {Array} options.buttons.text                    - button显示文本
     * @param {Array} options.buttons.icon                    - button显示的icon的name, 具体参考Icon组件
     * @param {Array} options.buttons.role                    - 可以是cancel(关闭)/destructive(警告/删除)/null
     * @param {Array} options.buttons.handler                 - 默认是关闭组件
     * @param {Array} options.buttons.cssClass                - 自定义样式
     * @return {Promise}
     * */
    present (options) {
      let isAlipayReady = !!window.VM && !!window.VM.platform && window.VM.platform.is('alipay') && window.AlipayJSBridge && !options.isH5
      let isDingTalkReady = !!window.VM && !!window.VM.platform && window.VM.platform.is('dingtalk') && window.dd && !options.isH5
      let isDtDreamReady = !!window.VM && !!window.VM.platform && window.VM.platform.is('dtdream') && window.dd && !options.isH5

      // 如果btn太多, 则原生组件放不下
      if (options && options.buttons && isArray(options.buttons) && options.buttons.length < 9) {
        let items = []
        let cancelButton = {
          text: '取消',
          role: 'cancel',
          handler: () => {}
        }
        let destructiveButtonIndex = -1
        for (let i = 0; options.buttons.length > i; i++) {
          if (options.buttons[i].role === 'cancel') {
            cancelButton = options.buttons[i]
            options.buttons.splice(i, 1)
            i--
          } else if (options.buttons[i].role === 'destructive') {
            destructiveButtonIndex = i
            items.push(options.buttons[i].text)
          } else {
            items.push(options.buttons[i].text)
          }
        }

        options.buttons.push(cancelButton)

        if (isAlipayReady) {
          console.info('ActionSheet 组件使用Alipay模式!')
          return new Promise((resolve) => {
            window.AlipayJSBridge && window.AlipayJSBridge.call('actionSheet', {
              title: options.title || '',
              btns: items || [],
              cancelBtn: cancelButton.text || '取消',
              destructiveBtnIndex: destructiveButtonIndex || -1
            }, function (res) {
              // index标示用户点击的按钮，在actionSheet中的位置，从0开始
              if (res.index !== -1) {
                options.buttons[res.index] && options.buttons[res.index].handler && options.buttons[res.index].handler()
              } else {
                cancelButton.handler && cancelButton.handler()
              }
            })

            resolve()
          })
        }

        if (isDingTalkReady) {
          console.info('ActionSheet 组件使用DingTalk模式!')
          return new Promise((resolve) => {
            window.dd.device.notification.actionSheet({
              title: options.title || '',
              cancelButton: cancelButton.text || '取消',
              otherButtons: items || [],
              onSuccess (result) {
                // onSuccess将在点击button之后回调
                // {buttonIndex: 0 //被点击按钮的索引值，Number，从0开始, 取消按钮为-1 }
                if (result.buttonIndex !== -1) {
                  options.buttons[result.buttonIndex] && options.buttons[result.buttonIndex].handler && options.buttons[result.buttonIndex].handler()
                } else {
                  cancelButton.handler && cancelButton.handler()
                }
              }
            })

            resolve()
          })
        }

        if (isDtDreamReady) {
          console.info('ActionSheet 组件使用 DtDream 模式!')
          return new Promise((resolve) => {
            window.dd.device.notification.actionSheet({
              title: options.title || '',
              cancelButton: cancelButton.text || '取消',
              otherButtons: items || [],
              onSuccess (result) {
                // onSuccess将在点击button之后回调
                // {buttonIndex: 0 //被点击按钮的索引值，Number，从0开始, 取消按钮为-1 }
                if (result.buttonIndex !== -1) {
                  options.buttons[result.buttonIndex] && options.buttons[result.buttonIndex].handler && options.buttons[result.buttonIndex].handler()
                } else {
                  cancelButton.handler && cancelButton.handler()
                }
              }
            })
            resolve()
          })
        }
      }

      console.info('ActionSheet 组件使用H5模式!')
      return new Promise((resolve) => {
        if (this._i && this._i.isActive) {
          this._i.dismiss().then(() => {
            this._i = Factory(options)
            // 自动开启
            this._i.present().then(() => { resolve() })
          })
        } else {
          this._i = Factory(options)
          // 自动开启
          this._i.present().then(() => { resolve() })
        }
      })
    },

    /**
     * @function dismiss
     * @description
     * 关闭ActionSheet组件, 当关闭动画过度完毕时触发 `Promise` 的 `resolve` 。
     * @return {Promise}
     * */
    dismiss () {
      return new Promise((resolve) => {
        if (this._i && this._i.isActive) {
          this._i.dismiss().then(() => { resolve() })
        } else {
          resolve()
        }
      })
    }
  }
}

let actionsheetInstance = getPresentDismissIns(ActionSheetFactory)

export default actionsheetInstance

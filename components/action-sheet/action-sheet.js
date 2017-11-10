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
 *
 * import ActionSheet from 'vimo/lib/action-sheet'
 *
 * ActionSheet.present({
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
 *        ActionSheet.dismiss().then((data) => {
 *          console.debug('promise的退出方式')
 *        });
 *      }
 *    }
 *  ]
 * })
 *
 */
import Vue from 'vue'
import actionSheetComponent from './action-sheet.vue'
import getInsertPosition from '../util/getInsertPosition'

const ActionSheet = Vue.extend(actionSheetComponent)

/**
 * 生成ActionSheet实例
 * @param {object} options - 参数
 * @param {Element} options.el - 元素
 * @param {object} options.propsData - prop数据
 * @private
 * */
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
    _i: null,

    /**
     * @function present
     * @description
     * 开启ActionSheet组件, 当开启动画过度完毕时触发 `Promise` 的 `resolve` 。
     * @param {object} options - 传入参数
     * @param {String} [options.title]                        - ActionSheet的标题
     * @param {string} [options.subTitle]                     - ActionSheet的副标题
     * @param {string} [options.cssClass]                     - 自定义样式
     * @param {Boolean} [options.enableBackdropDismiss=true]  - 允许点击backdrop关闭actionsheet
     * @param {Boolean} [options.dismissOnPageChange=true]    - 路由切换关闭组件
     * @param {string} [options.mode=ios]                     - 样式模式
     * @param {string} [options.isH5=false]                   - 强制使用H5组件
     * @param {Array} [options.buttons]                       - button数组，包含全部role
     * @param {Array} options.buttons.text                    - button显示文本
     * @param {Array} options.buttons.icon                    - button显示的icon的name, 具体参考Icon组件
     * @param {Array} options.buttons.role                    - 可以是cancel(关闭)/destructive(警告/删除)/null
     * @param {Array} options.buttons.handler                 - 默认是关闭组件
     * @param {Array} options.buttons.cssClass                - 自定义样式
     * @return {Promise}
     * */
    present (options) {
      return new Promise(resolve => {
        let isHandled =
          !options.isH5 &&
          window.VM &&
          window.VM.platform &&
          window.VM.platform.actionSheet &&
          window.VM.platform.actionSheet(options)
        /* istanbul ignore if */
        if (isHandled) {
          resolve()
        } else {
          /* istanbul ignore if */
          if (this._i && this._i.isActive) {
            this._i.dismiss().then(() => {
              this._i = Factory(options)
              // 自动开启
              this._i.present().then(() => {
                resolve()
              })
            })
          } else {
            // normal present
            this._i = Factory(options)
            this._i.present().then(() => {
              resolve()
            })
          }
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
      return new Promise(resolve => {
        /* istanbul ignore else */
        if (this._i && this._i.isActive) {
          this._i.dismiss().then(() => {
            this._i = null
            resolve()
          })
        } else {
          this._i = null
          resolve()
        }
      })
    }
  }
}

export default getPresentDismissIns(ActionSheetFactory)

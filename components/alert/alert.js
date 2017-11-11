/**
 * @component Alert
 * @description
 *
 * ## 对话框 / Alert对话框组件
 *
 * 对话框作为和用户交互的弹出层组件, 向用户提供操作选择或操作列表, 让使用者作出决定。 这里的对话框可以是: Alert/Confirm/Radios/Checkboxes/Input等.
 *
 * 这里需要注意的是, Select组件使用的就是Radio/Checkboxes这两模式的封装, 但是单选多选两者只能选一个模式出现. 另外, 对于Input类文本输入, 可以混合使用,
 *   比如url，email，text等，如果确认表单过多, 请单独开一页或者用modal组件处理.
 *
 *
 * ### 关于buttons属性的说明
 * - role属性: cancel只在ios下有用, 他会将标记cancel的button做特殊处理, 比如点击背景关闭则触发cancel的handler
 * - cssClass属性: 这个属性用于自定义button的样式, 同理, 外层的cssClass用来定义整个弹层的样式
 * - handler属性: 默认是关闭当前的组件, 可以通过`Alert.dismiss()`返回的Promise做后续处理, 他表示整个动画完毕
 *
 * ### 关于inputs属性的说明
 * - inputs属性内type的属性的填值能改变弹出层的展现形式, 比如: input/checkbox/radio等三种形式.
 * - 上述的三种形式一次只能选择一种, 这个是规定定死的.
 * - 关于input的type类型: text/tel/number/email -> 对应的其余属性可以是: type/name/placeholder/value.
 * - 关于input的type类型: checkbox/radio -> 对应的其余属性可以是: type/value/label/checked/disabled.
 * - 以上如果混用是达不到效果的, 这个是Alert组件的使用约定.
 *
 *
 * ### 使用注意
 *
 * - 建议在关闭弹出层动画后在处理关闭事项, 比如跳转/再次弹出提示等
 * - 弹层组件全部对路由跳转相应, 比如路由切换则弹层自动关闭, 这个可以通过`dismissOnPageChange`设置
 * - button超过三个则纵向排列
 * - 更详细的示例请看demo
 *
 *
 * @demo #/alert
 * @usage
 *
 * import Alert from 'vimo/lib/alert'
 *
 * // Alert
 * Alert.present({
 *    title: 'Alert',
 *    message: '收到这个通知的人希望你今天能搞定这个alert组件',
 *    cssClass: 'alertCssOuterMain  ',
 *    enableBackdropDismiss: true,
 *    buttons: [
 *      {
 *        text: '确定',
 *        handler: (value) => {
 *          Alert.dismiss().then((data) => {
 *            console.debug('button3 click dismiss ')
 *            console.debug(data)
 *          });
 *        }
 *      }
 *    ]
 * });
 *
 * // Input
 * input () {
 *   Alert.present({
 *     title: '登录iTunes Store',
 *     // subTitle: '收到这个通知的人希望你今天能搞定这个alert组件',
 *     message: '请输入您Apple ID"apple@icloud.com"的密码',
 *     cssClass: 'alertCssOuterMain  ',
 *     enableBackdropDismiss: true,
 *     inputs: [
 *       {
 *         type: 'password',
 *         name: 'password',
 *         placeholder: '密码',
 *         value: '',
 *       },
 *     ],
 *     buttons: [
 *       {
 *         text: '取消',
 *         role: 'cancel',
 *         handler: () => {}
 *       },
 *       {
 *         text: '确定',
 *         role: '',
 *         handler: (value) => {
 *           Alert.present({
 *             title: '请确认',
 *             // subTitle: '收到这个通知的人希望你今天能搞定这个alert组件',
 *             message: '您输入的信息：' + JSON.stringify(value),
 *             cssClass: '',
 *             enableBackdropDismiss: true,
 *             buttons: [
 *               {
 *                 text: '确定',
 *                 role: 'cancel',
 *                 handler: (value) => {
 *                   Alert.dismiss().then(function (msg) {
 *                     console.log('alert input2 dismiss promise')
 *                   })
 *                 }
 *               }
 *             ]
 *           }).then(function () {
 *             console.log('alert input2 present promise')
 *           })
 *         }
 *       }
 *     ]
 *   }).then(function () {
 *     console.log('alert input1 present promise')
 *   });
 * }
 *
 */
import Vue from 'vue'
import getInsertPosition from '../util/getInsertPosition'
import AlertComponent from './alert.vue'

const Alert = Vue.extend(AlertComponent)

function AlertFactory (options) {
  let el = getInsertPosition('alertPortal').appendChild(
    document.createElement('div')
  )
  return new Alert({ el, propsData: options })
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
     * 开启组件, 当开启动画过度完毕时触发 `Promise` 的 `resolve` 。
     *
     * @param {object} options - 传入参数
     * @param {String} [options.title]                        - 标题
     * @param {string} [options.subTitle]                     - 副标题
     * @param {string} [options.message]                      - 消息文本
     * @param {string} [options.cssClass]                     - 自定义样式
     * @param {Boolean} [options.enableBackdropDismiss=true]  - 允许点击backdrop关闭组件
     * @param {Boolean} [options.dismissOnPageChange=true]    - 路由切换关闭组件
     * @param {string} [options.mode=ios]                     - 样式模式
     * @param {string} [options.isH5=false]                   - 强制使用H5组件(区别使用Hybrid提供的Alert方法)
     *
     * @param {Array} [options.buttons]                       - button数组，包含全部role
     * @param {Array} options.buttons.text                    - button显示文本
     * @param {Array} options.buttons.icon                    - button显示的icon的name, 具体参考Icon组件
     * @param {Array} options.buttons.role                    - 可以是cancel(关闭)/destructive(警告/删除)/null
     * @param {Array} options.buttons.handler                 - 默认是关闭组件
     * @param {Array} options.buttons.cssClass                - 自定义样式
     *
     * @param {Array} [options.inputs]                        - 如果alert中有input等form
     * @param {Array} options.inputs.type                     - input的类型, 比如: text, tel, number, etc.
     * @param {Array} options.inputs.name                     - 名称
     * @param {Array} options.inputs.placeholder              - 占位名称
     * @param {Array} options.inputs.value                    - 值
     * @param {Array} options.inputs.label                    - 标签名
     * @param {Array} options.inputs.checked                  - 是否选中
     * @param {Array} options.inputs.id                       - id编号
     *
     * @return {Promise}
     * */
    present (options) {
      if (!options.buttons) {
        options.buttons = []
      }
      return new Promise(resolve => {
        let isHandled =
          !options.isH5 &&
          window.VM &&
          window.VM.platform &&
          window.VM.platform.alert &&
          window.VM.platform.alert(options)
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
            this._i = Factory(options)
            // 自动开启
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
     * 手动关闭组件, 当开启动画过度完毕时触发 `Promise` 的 `resolve` 。
     * @return {Promise}
     * */
    dismiss () {
      return new Promise(resolve => {
        /* istanbul ignore else */
        if (this._i && this._i.isActive) {
          this._i.dismiss().then(() => {
            resolve()
          })
        } else {
          resolve()
        }
      })
    }
  }
}

export default getPresentDismissIns(AlertFactory)

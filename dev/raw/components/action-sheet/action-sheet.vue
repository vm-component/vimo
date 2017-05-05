<template>
    <div class="action-sheet" :class="[modeClass,cssClass]">
        <!--backdrop-->
        <Backdrop :bdClick="bdClick" :enableBackdropDismiss="enableBackdropDismiss"
                  :isActive="isActive"></Backdrop>
        <!--actionsheet wrap-->
        <transition
                name="action-sheet"
                @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @after-leave="afterLeave">
            <div class="action-sheet-wrapper" v-show="isActive">
                <div class="action-sheet-container">
                    <!--group normal-->
                    <div class="action-sheet-group">
                        <div class="action-sheet-title" v-if="title">
                            <span>{{title}}</span>
                            <div class="action-sheet-sub-title" v-if="subTitle">{{subTitle}}</div>
                        </div>
                        <div class="action-sheet-buttons">
                            <Button role="action-sheet-button" @click="click(b)" v-for="(b,index) of normalButtons"
                                    :key="index"
                                    :class="[b.cssClass,{'icon-left':b.icon}]">
                                <Icon :name="b.icon" v-if="b.icon" class="action-sheet-icon"></Icon>
                                <span>{{b.text}}</span>
                            </Button>
                        </div>
                    </div>
                    <!--group cancel-->
                    <div class="action-sheet-group" v-if="cancelButton">
                        <Button role="action-sheet-button" @click="click(cancelButton)"
                                class="action-sheet-cancel" :class="cancelButton.cssClass">
                            <Icon :name="cancelButton.icon" v-if="cancelButton.icon"
                                  class="action-sheet-icon"></Icon>
                            <span>{{cancelButton.text || 'Cancel'}}</span>
                        </Button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component ActionSheet
   * @description
   *
   * ## 弹出层 / ActionSheet确认单组件
   *
   * ### 简介
   *
   * ActionSheet是一个从底部弹出的按钮表单，一般都是由很多Button组成。当用户点击确认完毕后关闭. 可以把它当做**确认单组件**, 或者**单选组件**, 但是按钮建议不超过6个, 如果超过了组件也能正确处理, 比如滚动选择.
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
   * @props {String} [title]                        - ActionSheet的标题
   * @props {string} [subTitle]                     - ActionSheet的副标题
   * @props {string} [cssClass]                     - Additional classes for custom styles, separated by spaces
   * @props {Boolean} [enableBackdropDismiss=true]  - 允许点击backdrop关闭actionsheet
   * @props {Boolean} [dismissOnPageChange=true]    - 路由切换关闭组件
   * @props {string} [mode=ios]                     - 样式模式
   * @props {Array} [buttons]                       - button数组，包含全部role
   * @props {Array} buttons.text                       - button显示文本
   * @props {Array} buttons.icon                       - button显示的icon的name, 具体参考Icon组件
   * @props {Array} buttons.role                       - 可以是cancel(关闭)/destructive(警告/删除)/null
   * @props {Array} buttons.handler                    - 默认是关闭组件
   * @props {Array} buttons.cssClass                   - 自定义样式
   *
   *
   * @demo http://xiangsongtao.com/vimo/#/action-sheet
   * @usage
   *
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
  import { registerListener } from '../../util/util'
  import { Backdrop } from '../backdrop'
  import { Button } from '../button'
  import { Icon } from '../icon'
  export default{
    name: 'ActionSheet',
    props: {
      title: [String],
      subTitle: [String],
      cssClass: [String],
      buttons: {
        type: Array,
        default () { return [] }
      },
      enableBackdropDismiss: {
        type: Boolean,
        default () { return true }
      },
      mode: {
        type: String,
        default () { return this.$config.get('mode') || 'ios' }
      },
      dismissOnPageChange: {
        type: Boolean,
        default () { return true }
      }
    },
    data () {
      return {
        /**
         * ActionSheet State
         * @private
         * */
        isActive: false,  // ActionSheet 开启状态
        enabled: false, // 是否在过渡态的状态判断，如果在动画中则为false

        /**
         * ActionSheet 计算属性
         * 因为实例化后computed也就无效了，
         * 故这部分在watch处理
         * @private
         * */
        normalButtons: [], // 普通按钮组
        cancelButton: null, // 取消按钮(组)，一般放在下面

        // promise
        presentCallback: null,
        dismissCallback: null,

        unreg: null
      }
    },
    computed: {
      // 设置ActionSheet的风格
      modeClass: function () {
        return `action-sheet-${this.mode}`
      }
    },
    methods: {
      /**
       * ActionSheet Animate Hooks
       * @private
       * */
      beforeEnter () {
        this.enabled = false // 不允许过渡中途操作
        this.$app && this.$app.setEnabled(false, 400)
      },
      afterEnter () {
        this.presentCallback()
        this._focusOutActiveElement()
        let focusableEle = document.querySelector('button')
        if (focusableEle) {
          focusableEle.focus()
        }
        this.enabled = true
      },
      beforeLeave () {
        this.enabled = false
        this.$app && this.$app.setEnabled(false, 400)
      },
      afterLeave () {
        this.dismissCallback()
        // 删除DOM
        this.$el.remove()
        this.enabled = true
      },

      /**
       * ActionSheet启动之前去除focus效果，因为存在键盘
       * @private
       * */
      _focusOutActiveElement () {
        // only button？
        const activeElement = document.activeElement
        activeElement && activeElement.blur && activeElement.blur()
      },

      /**
       * @function bdClick
       * @description
       * 点击backdrop,关闭actionsheet
       *
       * 如存在cancel按钮，点击按钮关闭actionsheet
       * Backdrop Click Handler, If cancelButton defined, then action cancelButton handler.
       * @private
       */
      bdClick () {
        if (this.enabled && this.enableBackdropDismiss) {
          if (this.cancelButton) {
            this.click(this.cancelButton)
          } else {
            this.dismiss()
          }
        }
      },

      /**
       * @function click
       * @description
       * 点击下方按钮
       * @param {object} button Button Click Handler
       * @private
       */
      click (button) {
        if (!this.enabled) {
          return
        }
        let shouldDismiss = true
        if (button.handler) {
          // a handler has been provided, execute it
          if (button.handler() === false) {
            // if the return value of the handler is false then do not dismiss
            shouldDismiss = false
          }
        }

        // 当前不是在过渡动画中(dismissing中)，
        // 如果是在dismissing中，则意味着正在关闭，
        // 这里不必进行
        if (this.enabled && shouldDismiss) {
          this.dismiss()
        }
      },

      /**
       * @function present
       * @description
       * 打开ActionSheet
       * @param {Object} options - 给组件props传参的对象, 这部分在actionsheet.js中定义
       * @returns {Promise}  结果返回Promise, 当动画完毕后执行resolved
       */
      present () {
        console.log('action-sheet.vue present')
        this.isActive = true
        return new Promise((resolve) => { this.presentCallback = resolve })
      },

      /**
       * @function dismiss
       * @description
       * 关闭ActionSheet
       * @return {Promise} 结果返回Promise, 当动画完毕后执行resolved
       * */
      dismiss () {
        if (this.isActive) {
          this.isActive = false // 动起来
          this.unreg && this.unreg()
          if (!this.enabled) {
            this.$nextTick(() => {
              this.dismissCallback()
              this.$el.remove()
              this.enabled = true
            })
          }
          return new Promise((resolve) => { this.dismissCallback = resolve })
        } else {
          return new Promise((resolve) => { resolve() })
        }
      },

      /**
       * @private
       * */
      dismissOnPageChangeHandler () {
        this.isActive && this.dismiss()
      },

      /**
       * 初始化buttons
       * @private
       * */
      init () {
        let arr = this.buttons
        let _buttons = []
        if (!Array.isArray(arr)) {
          return
        }
        arr.forEach((button) => {
          if (typeof button === 'string') {
            button = {text: button}
          }

          if (!button.cssClass) {
            button.cssClass = ''
          } else {
            // 去除收尾空格
            button.cssClass = button.cssClass.trim()
          }

          if (button.role === 'cancel') {
            this.cancelButton = button
          } else {
            if (button.role === 'destructive') {
              button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-destructive'
            } else if (button.role === 'selected') {
              button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-selected'
            }
            _buttons.push(button)
          }
        })
        this.normalButtons = _buttons
      }
    },
    created () {
      this.init()
      // mounted before data ready, so no need to judge the `dismissOnPageChange` value
      if (this.dismissOnPageChange) {
        this.unreg && this.unreg()
        this.unreg = registerListener(window, 'popstate', this.dismissOnPageChangeHandler, {capture: false})
      }
    },
    components: {
      Backdrop,
      Button,
      Icon
    }
  }
</script>
<style lang="scss">
    @import './action-sheet.scss';
    @import './action-sheet.ios.scss';
    @import './action-sheet.md.scss';

    // transitioName = 'action-sheet'
    .action-sheet-enter-active, .action-sheet-leave-active {
        transform: translateY(0%);
    }

    .action-sheet-enter, .action-sheet-leave-active {
        transform: translateY(100%);
    }
</style>

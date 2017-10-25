<template>
    <div class="vm-pop-sheet" :class="[modeClass,{'vm-pop-sheet-visible':isVisible}]">
        <Backdrop :bdClick="bdClick" :enableBackdropDismiss="enableBackdropDismiss"
                  :isActive="isActive && showBackdrop"></Backdrop>
        <transition
                name="pop-sheet"
                @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @after-leave="afterLeave">
            <div class="sheet-wrapper" v-show="isActive" @touchmove="onTouchMoveHandler($event)">
                <div class="sheet-container">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component PopSheet
   * @description
   *
   * ## 弹出窗组件 / PopSheet
   *
   * ### 介绍
   *
   * PopSheet组件是一个模板组件, 自身只提供弹出载体, 其余业务部分通过slot传入, 且组件本身不对slot内容不作处理, 样式也由业务自己确定, 组件中的内容将自动在页面居中.
   *
   * 组件开闭通过ref获取组件实例并通过下面两个方法操作:
   * - present() 开启
   * - dismiss() 关闭
   *
   * ### 如何引入
   * ```
   * // 引入
   * import PopSheet from 'vimo/lib/pop-sheet'
   * // 安装
   * Vue.component(PopSheet.name, PopSheet)
   * // 或者
   * export default{
   *   components: {
   *     PopSheet
   *  }
   * }
   * ```
   *
   * ### 关于slot
   *
   * 组件必须具有slot="fixed"属性, 表示固定在页面上. 如果没有的话, 页面滚动样式会产生错误.
   *
   * ### 如何开启
   *
   * 通过ref获取组件实例, 之后调用present方法开启, 调用dismiss方法关闭.
   *
   * ```
   * ...
   * computed: {
   *    popSheetComponent () {
   *      return this.$refs.popSheet
   *    }
   *  }
   * methods: {
   *    openPopSheet () {
   *      return this.popSheetComponent.present()
   *    },
   *    closePopSheet () {
   *      return this.popSheetComponent.dismiss()
   *    }
   *  }
   * ...
   * ```
   *
   * @props {Boolean} [enableBackdropDismiss=true] - 点击背景关闭组件
   * @props {String} [mode='ios'] - 模式
   * @props {Boolean} [dismissOnPageChange=true] - 页面切换关闭组件
   * @props {boolean} [showBackdrop=true] - 是否显示黑色背景
   *
   * @demo #/pop-sheet
   * @usage
   * <PopSheet ref="popSheet" slot="fixed">
   *    <section class="popSheet">
   *        <h2>TITLE</h2>
   *        <h5>这是内容, 宽度高度自定义</h5>
   *        <p>
   *            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, eaque earum eum
   *            ex expedita facere fugit ipsa ipsum minima nemo nostrum, pariatur placeat qui quis quod
   *            quos repellendus tempora unde.</p>
   *        <List>
   *            <Item>
   *                <Label>名称</Label>
   *                <Input v-model="name" type="text" placeholder="请输入用户名" clear-input></Input>
   *            </Item>
   *            <Item>
   *                <Label>密码</Label>
   *                <Input v-model="password" type="password" placeholder="请输入密码" clear-input></Input>
   *            </Item>
   *        </List>
   *        <Button block @click="closePopSheet">确认</Button>
   *    </section>
   * </PopSheet>
   *
   * */
  import Backdrop from '../backdrop'
  import { urlChange } from '../util/util'

  const NOOP = () => {}

  export default {
    name: 'PopSheet',
    props: {
      enableBackdropDismiss: {
        type: Boolean,
        default () { return true }
      },
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode', 'ios') || 'ios' }
      },
      dismissOnPageChange: {
        type: Boolean,
        default () { return true }
      },
      showBackdrop: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        /**
         * @desc
         * ActionSheet State
         * 属性      | 描述             | 未开启 | 'Present动画'开始 | 'Present动画'结束 | 'Dismiss动画'开始 | 'Dismiss动画'结束 | 未开启
         * ----------|------------------|--------|-------------------|-------------------|-------------------|-------------------|--------
         * isActive  | 开启关闭状态     | false  | true              | true              | true              | false             | false
         * enabled   | 是否在过渡动画中 | true   | false             | true              | true              | false             | true
         * isVisible | 判断是否在可视区 | false  | true              | true              | true              | true              | false
         * @private
         * */
        isActive: false,    // Sheet 开启关闭状态, 显示动画开启 -> 触发关闭dismiss
        isVisible: false,    // 是否处在显示阶段, 显示动画开启 -> 关闭动画完全关闭
        enabled: true,     // 是否在过渡态的状态判断，如果在动画中则为false (补漏的)

        // promise
        presentCallback: NOOP,
        dismissCallback: NOOP,

        unReg: null         // 页面变化的解绑函数
      }
    },
    computed: {
      // 设置ActionSheet的风格
      modeClass () {
        return `pop-sheet-${this.mode}`
      }
    },
    methods: {
      /**
       * ActionSheet Animate Hooks
       * @private
       * */
      beforeEnter () {
        this.enabled = false // 不允许过渡中途操作
        this.isVisible = true
        this.$app && this.$app.setEnabled(false, 400)
      },
      afterEnter () {
        this.presentCallback()
        this.focusOutActiveElement()
        let focusableEle = document.querySelector('button')
        if (focusableEle) {
          focusableEle.focus()
        }
        this.enabled = true
        this.isVisible = true
      },
      beforeLeave () {
        this.enabled = false
        this.isVisible = true
        this.$app && this.$app.setEnabled(false, 400)
      },
      afterLeave () {
        this.dismissCallback()
        this.enabled = true
        this.isVisible = false
      },

      /**
       * ActionSheet启动之前去除focus效果，因为存在键盘
       * @private
       * */
      focusOutActiveElement () {
        // only button？
        const activeElement = document.activeElement
        activeElement && activeElement.blur && activeElement.blur()
      },

      /**
       * @function bdClick
       * @description
       * 点击backdrop,关闭actionsheet
       * @private
       */
      bdClick () {
        if (this.enableBackdropDismiss) {
          this.dismiss()
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
        if (shouldDismiss) {
          this.dismiss()
        }
      },

      /**
       * @function present
       * @description
       * 打开ActionSheet
       * @returns {Promise}  结果返回Promise, 当动画完毕后执行resolved
       */
      present () {
        this.isActive = true
        return new Promise((resolve) => { this.presentCallback = resolve })
      },

      /**
       * @function dismiss
       * @description
       * 关闭ActionSheet, 如果组件还在动画中, 则执行dismiss没有动作
       * @return {Promise} 结果返回Promise, 当动画完毕后执行resolved
       * */
      dismiss () {
        if (!this.enabled) {
          return new Promise((resolve) => { resolve() })
        }
        if (this.isActive) {
          this.isActive = false // 动起来
          this.unReg && this.unReg()
          return new Promise((resolve) => { this.dismissCallback = resolve })
        } else {
          return new Promise((resolve) => { resolve() })
        }
      },

      onTouchMoveHandler ($event) {
        $event.preventDefault()
        $event.stopPropagation()
      }
    },
    created () {
      // mounted before data ready, so no need to judge the `dismissOnPageChange` value
      if (this.dismissOnPageChange) {
        this.unReg = urlChange(() => {
          this.isActive && this.dismiss()
        })
      }
    },
    components: {
      Backdrop
    }
  }
</script>
<style lang="less">
    @import "pop-sheet.less";
    @import "pop-sheet.ios.less";
    @import "pop-sheet.md.less";
</style>

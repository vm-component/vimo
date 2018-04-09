<template>
    <div class="vm-sheet" :class="[modeClass,directionClass,{'vm-sheet-visible':isVisible}]">
        <Backdrop :bdClick="bdClick" :enableBackdropDismiss="enableBackdropDismiss"
                  :isActive="isActive && showBackdrop"></Backdrop>
        <transition
                name="sheet"
                @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @after-leave="afterLeave">
            <div class="sheet-wrapper" v-show="isActive">
                <div class="sheet-container">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Sheet
   * @description
   *
   * ## 弹出表单组件 / Sheet
   *
   * ### 介绍
   *
   * Sheet组件是一个模板组件, 自身只提供弹出载体, 其余业务部分通过slot传入, 且组件本身不对slot内容不作处理, 样式也由业务自己确定
   *
   * 组件开闭通过ref获取组件实例并通过下面两个方法操作:
   * - present() 开启
   * - dismiss() 关闭
   *
   *
   * ### 如何引入
   * ```
   * // 引入
   * import { Sheet } from 'vimo'
   * // 安装
   * Vue.component(Sheet.name, Sheet)
   * // 或者
   * export default{
   *   components: {
   *     Sheet
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
   *    paySheetCompoonent () {
   *      return this.$refs.paySheet
   *    }
   *  }
   * methods: {
   *    openPaySheet () {
   *      return this.paySheetCompoonent.present()
   *    },
   *    closePaySheet () {
   *      return this.paySheetCompoonent.dismiss()
   *    },
   *    choose (type) {
   *      this.closePaySheet().then(() => {
   *        this.type = type
   *      })
   *    }
   *  }
   * ...
   * ```
   *
   * @props {String} [direction='button'] - 表单出现位置, 只能是: 'bottom', 'top' 两个方向
   * @props {Boolean} [enableBackdropDismiss=true] - 点击背景关闭组件
   * @props {String} [mode='ios'] - 模式
   * @props {boolean} [showBackdrop=true] - 是否显示黑色背景
   *
   * @demo #/sheet
   * @usage
   * <Sheet ref="paySheet" slot="fixed" direction="button">
   *    <section class="pay-sheet">
   *    <div class="pay-sheet-title">选择支付方式</div>
   *    <div class="pay-sheet-container">
   *        <div class="pay-sheet-content" @click="choose('alipay')">
   *            <Icon class="pay-sheet-icon" name="icon-alipay">Icon</Icon>
   *            <p class="pay-sheet-name">支付宝</p>
   *        </div>
   *        <div class="pay-sheet-content" @click="choose('wechat')">
   *            <Icon class="pay-sheet-icon" name="icon-weichat">Icon</Icon>
   *            <p class="pay-sheet-name">微信</p>
   *        </div>
   *        <div class="pay-sheet-content" @click="choose('unipay')">
   *            <Icon class="pay-sheet-icon" name="icon-unipay">Icon</Icon>
   *            <p class="pay-sheet-name">银联</p>
   *        </div>
   *    </div>
   *    <div class="pay-sheet-buttons">
   *        <Button full clear class="pay-sheet-button" @click="closePaySheet">取消</Button>
   *    </div>
   *    </section>
   * </Sheet>
   *
   * */
  import Backdrop from '../../backdrop/index'
  import animateExtend from '../../../util/animate-extend'

  export default {
    name: 'Sheet',
    extends: animateExtend,
    props: {
      direction: {
        type: String,
        default: 'bottom',
        validator (val) {
          return ~['bottom', 'top'].indexOf(val)
        }
      },
      enableBackdropDismiss: {
        type: Boolean,
        default: true
      },
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode', 'ios') || 'ios' }
      },
      showBackdrop: {
        type: Boolean,
        default: true
      },
      // 滚动控制, 默认开启
      scrollControl: Boolean
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
        isVisible: false    // 是否处在显示阶段, 显示动画开启 -> 关闭动画完全关闭
      }
    },
    computed: {
      // 设置ActionSheet的风格
      modeClass () {
        return `sheet-${this.mode}`
      },
      directionClass () {
        return `sheet-direction-${this.direction}`
      }
    },
    methods: {
      /**
       * @function bdClick
       * @description
       * 点击backdrop
       * @private
       */
      bdClick () {
        if (this.enableBackdropDismiss) {
          this.dismiss()
        }
      }
    },
    created () {
      this.$on('animate:beforeEnter', () => {
        this.isVisible = true
      })
      this.$on('animate:afterLeave', () => {
        this.isVisible = false
      })

      this.$on('animate:present', () => {
        if (this.scrollControl) {
          this.$app && this.$app.$_disableScroll()
        }
      })

      this.$on('animate:dismiss', () => {
        if (this.scrollControl) {
          this.$app && this.$app.$_enableScroll()
        }
      })
    },
    components: {
      Backdrop
    }
  }
</script>

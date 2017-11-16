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
  import animateExtend from '../util/animate-extend'

  export default {
    name: 'PopSheet',
    extends: animateExtend,
    props: {
      enableBackdropDismiss: {
        type: Boolean,
        default () { return true }
      },
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode', 'ios') || 'ios' }
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
        isVisible: false    // 是否处在显示阶段, 显示动画开启 -> 关闭动画完全关闭
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
        this.$app && this.$app.$_disableScroll()
      })

      this.$on('animate:dismiss', () => {
        this.$app && this.$app.$_enableScroll()
      })
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

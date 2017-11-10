<template>
    <div class="ion-toggle"
         :class="[modeClass,colorClass,{'toggle-checked':isChecked,'toggle-disabled':isDisabled}]"
         @click="clickHandler($event)">
        <div class="toggle-icon">
            <div class="toggle-inner"></div>
        </div>
        <vm-button role="checkbox" :disabled="isDisabled" :checked="isChecked" :id="id"></vm-button>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Toggle
   * @description
   *
   * ## 表单组件 / Toggle开关组件
   *
   * ### 注意
   *
   * 使用 v-model 切换状态, 不支持checked属性
   *
   * ### 说明
   *
   * Toggle组件和Checkbox组件的功能类似, 但是Toggle组件在移动端更加好看, 也更加易用. Toggle可以设置颜色, 当然不同模式下的样式还是不一样的, 感兴趣的可以切换试试.
   *
   * ### 如何引入
   * ```
   * // 引入
   * import Toggle from 'vimo/lib/toggle'
   * // 安装
   * Vue.component(Toggle.name, Toggle)
   * // 或者
   * export default{
   *   components: {
   *    Toggle
   *  }
   * }
   * ```
   *
   * @props {String} [mode='ios'] - 模式: "ios", "md"
   * @props {String} [color] - 颜色: "primary", "secondary", "danger", "light", and "dark"
   * @props {Boolean} [disabled=false] - 禁用状态
   *
   * @fires component:Toggle#onChange
   * @demo #/toggle
   * @usage
   * <vm-list>
   *    <vm-list-header>
   *        普通使用
   *    </vm-list-header>
   *    <vm-item>
   *        Toggle Normal
   *        <vm-toggle slot="item-end"></vm-toggle>
   *    </vm-item>
   *    <vm-item>
   *        Red Toggle
   *        <vm-toggle slot="item-end" color="danger"></vm-toggle>
   *    </vm-item>
   *    <vm-item>
   *        Toggle Open
   *        <vm-toggle slot="item-end"></vm-toggle>
   *    </vm-item>
   *    <vm-item>
   *        Toggle Close
   *        <vm-toggle slot="item-end"></vm-toggle>
   *    </vm-item>
   *    <vm-item>
   *        Toggle Disabled
   *        <vm-toggle slot="item-end" v-model="checked"></vm-toggle>
   *    </vm-item>
   * </vm-list>
   *
   **/
  import {isTrueProperty} from '../../util/util'
  import ThemeMixins from '../../themes/theme.mixins'

  export default {
    name: 'vm-toggle',
    mixins: [ThemeMixins],
    props: {
      /**
       * 是否被禁
       **/
      disabled: {
        type: Boolean,
        default: false
      },

      // 内部值
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isChecked: isTrueProperty(this.value),       // 选中状态
        isDisabled: isTrueProperty(this.disabled),      // 禁用状态
        activated: false,
        id: this._uid,
        init: false,            // 是否初始化
        itemComponent: null    // 父组件item的句柄
      }
    },
    watch: {
      disabled(val) {
        this.setDisabled(val)
      },
      value(val) {
        this.setChecked(val)
      }
    },
    mounted() {
      if (this.$parent && this.$parent.$options.name && this.$parent.$options.name.toLowerCase() === 'vm-item') {
        this.itemComponent = this.$parent
        this.itemComponent.setElementClass('item-toggle', true)
        this.setItemCheckedClass(this.isChecked)
        this.setItemDisabledClass(this.isDisabled)
      }

      this.setChecked(this.value)
      this.setDisabled(this.disabled)

      this.init = true
    },
    methods: {

      clickHandler() {
        this.setChecked(!this.isChecked)
      },

      /**
       * 设置为被点击状态
       * @param {boolean} isChecked
       */
      setChecked(isChecked) {
        if (isChecked !== this.isChecked) {
          this.isChecked = isChecked
          if (this.init) {
            /**
             * @event component:Toggle#onChange
             * @description Toggle组件切换时发出的事件, 传递当前的选中状态
             * @property {Boolean} isChecked - 是否选中
             */
            this.$emit('onChange', isChecked)
            this.$emit('input', isChecked)
          }

          this.setItemCheckedClass(isChecked)
        }
      },
      setItemCheckedClass(isChecked) {
        this.itemComponent && this.itemComponent.setElementClass('item-toggle-checked', isChecked)
      },

      /**
       * 设置禁用状态
       * @param {boolean} isDisabled
       */
      setDisabled(isDisabled) {
        if (isDisabled !== this.isDisabled) {
          this.isDisabled = isDisabled
          this.setItemDisabledClass(isDisabled)
        }
      },
      setItemDisabledClass(isDisabled) {
        this.itemComponent && this.itemComponent.setElementClass('item-toggle-disabled', isDisabled)
      }
    }
  }
</script>
<style lang="scss">
    @import "toggle.ios";
    @import "toggle.md";
</style>
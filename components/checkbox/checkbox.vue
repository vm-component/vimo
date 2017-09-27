<template>
    <div class="ion-checkbox" :class="[modeClass,colorClass,{'checkbox-disabled':disabledValue}]">
        <div class="checkbox-icon" :class="{'checkbox-checked':checkedValue}">
            <div class="checkbox-inner"></div>
        </div>
        <vm-button role="item-cover"
                   @click="onPointerDownHandler()"
                   type="button"
                   class="item-cover">
        </vm-button>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Checkbox
   * @description
   *
   * ## 表单组件 / Checkbox复选框(检查框)组件
   *
   * ### 注意
   *
   * 使用v-modal切换状态, 不支持checked属性
   *
   * ### 如何引入
   * ```
   * // 引入
   * import Checkbox from 'vimo/lib/checkbox'
   * // 安装
   * Vue.component(Checkbox.name, Checkbox)
   * // 或者
   * export default{
   *   components: {
   *    Checkbox
   *  }
   * }
   *```
   *
   * @props {String} [mode='ios'] - 模式
   * @props {String} [color] - 颜色
   * @props {Boolean} [disabled=false] - 单向选择, 点击且换并不对父组件传递
   * @props {Boolean} [value] - 当前值
   *
   * @fires component:Checkbox#onChange
   * @demo #/checkbox
   *
   * @usage
   * <Item>
   *    <Label>Danger</Label>
   *    <Checkbox slot="item-left" color="danger" v-model="testModal" :disabled="testDisabled" @onChange="onCheckboxChange"></Checkbox>
   * </Item>
   * */
  import { setElementClass } from '../util/util'
  import Button from '../button/index'

  export default {
    name: 'Checkbox',
    components: {'vm-button': Button},
    data () {
      return {
        checkedValue: this.value,           // 内部维护的checked
        disabledValue: this.disabled,       // 内部维护的disabled
        init: false,                        // 是否初始化
        itemComponent: null                 // item组件实例
      }
    },
    props: {
      disabled: Boolean,
      value: Boolean,
      color: String,
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      }
    },
    watch: {
      disabled (val) {
        this.setDisabled(val)
      },
      value (val) {
        this.setChecked(val)
      }
    },
    computed: {
      modeClass () {
        return `checkbox checkbox-${this.mode}`
      },
      colorClass () {
        return this.color ? (`checkbox-${this.mode}-${this.color}`) : ''
      }
    },
    methods: {
      setChecked (isChecked) {
        if (isChecked !== this.checkedValue) {
          this.checkedValue = isChecked
          if (this.init) {
            /**
             * @event component:Checkbox#onChange
             * @description 点按选择时触发
             * @property {boolean} value - 当前值
             */
            this.$emit('onChange', this.checkedValue)
            this.$emit('input', this.checkedValue)
          }
          this.itemComponent && setElementClass(this.itemComponent.$el, 'item-checkbox-checked', isChecked)
        }
      },
      setDisabled (isDisabled) {
        this.disabledValue = isDisabled
        this.itemComponent && setElementClass(this.itemComponent.$el, 'item-checkbox-disabled', isDisabled)
      },
      onPointerDownHandler () {
        this.setChecked(!this.checkedValue)
      }
    },
    mounted () {
      // 找到外部item实例
      if (this.$parent.$options._componentTag.toLowerCase() === 'item') {
        this.itemComponent = this.$parent
        setElementClass(this.itemComponent.$el, 'item-checkbox', true)
      }

      this.setChecked(this.value)
      this.setDisabled(this.disabled)

      this.init = true
    }
  }
</script>
<style lang="less">
    @import "checkbox.ios.less";
    @import "checkbox.md.less";
</style>
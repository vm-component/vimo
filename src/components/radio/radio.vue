<template>
    <div class="ion-radio" :class="[modeClass,colorClass,{'radio-disabled':isDisabled}]">
        <div class="radio-icon" :class="{'radio-checked':isChecked}">
            <div class="radio-inner"></div>
        </div>
        <vm-button role="radio" @click="onPointerDownHandler($event)" :id="id"></vm-button>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Radio
   * @description
   *
   * ## 表单组件 / Radio单选框组件
   *
   * ### 注意
   *
   * 使用v-modal切换状态(数据控制), 不支持checked属性, value为纯string字段, 用于唯一标识;
   *
   * ### 其他
   *
   * - 组件支持异步操作实例化
   * - 目前组件的层级嵌套关系如下:  List -> Item -> Radio
   * - 动态设置了单个radio的禁用状态, 如果之前是选中的则取消选中, 手动点击和数据选中都会生效
   *
   * ### 组件通讯关系
   *
   * 1. 初始化时, radio组件自己的this传递给radio-group, recordRadio()
   * 2. Radio点击时, 调用List组件的onRadioChange函数, 传递自己的value
   * 3. List组件得到value触发input更新v-modal值, 之后遍历子组件Radio, 触发组件的setChecked, 传递value
   * 4. 子组件根据传入的value设置自己的状态
   *
   *
   * ### 如何引入
   * ```
   * // 引入
   * import Radio from 'vimo/lib/radio'
   * // 安装
   * Vue.component(Radio.name, Radio)
   * // 或者
   * export default{
   *   src: {
   *    Radio
   *  }
   * }
   * ```
   *
   * @props {String} [mode='ios'] - 模式
   * @props {String} [color] - 颜色
   * @props {Boolean} [disabled=false] - 单向选择, 点击且换并不对父组件传递
   *
   * @fire component:Radio#onSelect - 点按选择时触发
   * @demo #/radio
   * @usage
   * <vm-list radio-group v-model="fruits" :disabled="isListDisabled">
   *    <vm-list-header>Fruits</vm-list-header>
   *    <vm-item>
   *        <vm-label>Apple</vm-label>
   *        <vm-radio value="apple" :disabled="isAppleDisabled" @onSelect="onSelectHandler"></vm-radio>
   *    </vm-item>
   *    <vm-item>
   *        <vm-label>Banana</vm-label>
   *        <vm-radio value="banana" color="danger" @onSelect="onSelectHandler"></vm-radio>
   *    </vm-item>
   *    <vm-item>
   *        <vm-label>Cherry (secondary color)</vm-label>
   *        <vm-radio value="cherry" color="secondary" @onSelect="onSelectHandler"></vm-radio>
   *    </vm-item>
   *    <vm-item>
   *         <vm-label>Disabled</vm-label>
   *        <vm-radio value="disabled" :disabled="true" @onSelect="onSelectHandler"></vm-radio>
   *    </vm-item>
   *    <vm-item>
   *        <vm-label>Default</vm-label>
   *        <vm-radio value="default" @onSelect="onSelectHandler"></vm-radio>
   *    </vm-item>
   * </vm-list>
   *
   **/
  import { setElementClass, isTrueProperty } from '../../util/util'
  import ThemeMixins from '../../themes/theme.mixins'
  import VmButton from "../button/button.vue";

  let id = 0
  export default {
    components: {VmButton},
    name: 'vm-radio',
    mixins: [ThemeMixins],
    data () {
      return {
        isChecked: false,               // 内部 选中
        isDisabled: this.disabled,      // 内部 禁用
        itemComponent: null,            // item组件实例
        radioGroupComponent: null,      // list(radioGroup)组件实例
        isInit: false,                  // 初始化状态
        id: `rb-${id++}`                // id
      }
    },
    props: {
      // 固定值
      value: String,
      disabled: Boolean,
    },
    watch: {
      disabled (val) {
        this.setDisabled(isTrueProperty(val))
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      /**
       * 设置当前radio的禁用状态
       **/
      setDisabled (isDisabled) {
        this.setChecked(null)
        this.isDisabled = isDisabled
        this.itemComponent && this.itemComponent.setElementClass('item-radio-disabled', isDisabled)
      },

      /**
       * 设置当前的radio的选中状态
       **/
      setChecked (checked) {
        let isChecked = (checked === this.value) && !this.isDisabled
        if (this.isChecked !== isChecked) {
          this.isChecked = isChecked
          this.isInit && this.isChecked && this.$emit('onSelect', this.value)
          this.itemComponent && this.itemComponent.setElementClass('item-checkbox-checked', this.isChecked)
        }
      },

      /**
       * 当radio点击时
       **/
      onPointerDownHandler ($event) {
        $event.preventDefault()
        $event.stopPropagation()
        !this.isDisabled && this.radioGroupComponent && this.radioGroupComponent.onRadioChange(this.value)
      },

      /**
       * init
       **/
      init () {
        // 找到外部item实例
        if (this.$parent.$options.name.toLowerCase() === 'vm-item') {
          this.itemComponent = this.$parent
          setElementClass(this.itemComponent.$el, 'item-radio', true)
        }

        // 找到外部List实例
        if (this.$parent.$parent.$options._componentTag.toLowerCase() === 'vm-list') {
          let node = this.$parent.$parent
          if (node.radioGroup) {
            this.radioGroupComponent = node
            this.radioGroupComponent.recordRadio(this)
          }
          console.assert(this.radioGroupComponent, 'Radio组件需要在List组件中加上`radio-group`属性才能正常使用v-model指令!')
        }

        // 初始化禁用状态
        this.setDisabled(this.disabled)

        this.isInit = true
      }
    }
  }
</script>
<style lang="scss">
    @import "radio.ios";
    @import "radio.md";
</style>
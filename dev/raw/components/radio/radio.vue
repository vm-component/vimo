<template>
    <div class="ion-radio" :class="[modeClass,colorClass,{'radio-disabled':isDisabled}]">
        <div class="radio-icon" :class="{'radio-checked':isChecked}">
            <div class="radio-inner"></div>
        </div>
        <button role="radio" @click="onPointerDownHandler($event)"
                type="button"
                :id="id"
                ion-button="item-cover"
                class="item-cover">
        </button>
    </div>
</template>
<style lang="scss">
    @import "radio.ios";
    @import "radio.md";
</style>
<script type="text/ecmascript-6">
  /**
   * @component Component/Radio
   * @description
   * 单选框组件
   *
   * > !!! 使用v-modal切换状态(数据控制), 不支持checked属性, value为纯string字段, 用于唯一标识;
   *
   * 该组件需要支持异步初始化
   *
   * Radio组件的嵌套关系如下:
   *
   * List -> Item -> Radio
   *
   * 组件通讯关系如下:
   *
   * 1. 初始化时, radio组件自己的this传递给radio-group, recordRadio()
   * 1. Radio点击时, 调用List组件的onRadioChange函数, 传递自己的value
   * 2. List组件得到value触发input更新v-modal值, 之后遍历子组件Radio, 触发组件的setChecked, 传递value
   * 3. 子组件根据传入的value设置自己的状态
   *
   *
   * > 动态设置了单个radio的禁用状态, 如果之前是选中的则取消选中, 手动点击和数据选中都会生效
   *
   *
   * @property {String} mode - 模式
   * @property {String} color - 颜色
   * @property {Boolean} disabled - 单向选择, 点击且换并不对父组件传递
   *
   * @fire onSelect - 点按选择时触发
   * */
  import { setElementClass, isTrueProperty, isBlank } from '../../util/util'
  let id = 0
  export default{
    name: 'Radio',
    data(){
      return {
        isChecked: false,               // 内部 选中
        isDisabled: this.disabled,      // 内部 禁用
        itemComponent: null,            // item组件实例
        radioGroupComponent: null,      // list(radioGroup)组件实例
        isInit: false,                  // 初始化状态
        id: `rb-${id++}`,               // id
      }
    },
    props: {
      // 固定值
      value: [String],
      disabled: [Boolean],
      color: [String],
      mode: {
        type: String,
        default(){ return window.VM && window.VM.config.get('mode') || 'ios' }
      }
    },
    watch: {
      disabled(val){
        this.setDisabled(isTrueProperty(val))
      }
    },
    computed: {
      modeClass () {
        return `radio radio-${this.mode}`
      },
      colorClass () {
        return !!this.color ? (`radio-${this.mode}-${this.color}`) : ''
      }
    },
    methods: {
      /**
       * 设置当前radio的禁用状态
       * */
      setDisabled(isDisabled){
        this.setChecked(null)
        this.isDisabled = isDisabled
        this.itemComponent && setElementClass(this.itemComponent.$el, 'item-radio-disabled', isDisabled)
      },

      /**
       * 设置当前的radio的选中状态
       * */
      setChecked(checked){
        let isChecked = (checked === this.value) && !this.isDisabled
        if (this.isChecked !== isChecked) {
          this.isChecked = isChecked
          this.isInit && this.isChecked && this.$emit('onSelect', this.value);
          this.itemComponent && setElementClass(this.itemComponent.$el, 'item-checkbox-checked', this.isChecked);
        }
      },

      /**
       * 当radio点击时
       * */
      onPointerDownHandler($event){
        $event.preventDefault();
        $event.stopPropagation();
        !this.isDisabled && this.radioGroupComponent && this.radioGroupComponent.onRadioChange(this.value)
      },

      /**
       * init
       * */
      init(){
        // 找到外部item实例
        if (this.$parent.$options._componentTag.toLowerCase() === 'item') {
          this.itemComponent = this.$parent;
          setElementClass(this.itemComponent.$el, 'item-radio', true)
        }

        // 找到外部List实例
        if (this.$parent.$parent.$options._componentTag.toLowerCase() === 'list') {
          let node = this.$parent.$parent
          if (node.radioGroup) {
            this.radioGroupComponent = node
            this.radioGroupComponent.recordRadio(this)
          }
          console.assert(this.radioGroupComponent, 'Radio组件需要在List组件中加上`radio-group`属性才能正常使用v-model指令!')
        }

        // 初始化禁用状态
        this.setDisabled(this.disabled)

        // 初始化的时候向 radioGroupComponent 告知自己在值
        !this.isDisabled && this.radioGroupComponent && this.radioGroupComponent.onRadioChange(this.value)

        this.isInit = true
      }
    },
    created: function () {},
    mounted: function () {
      this.init()
    },
    activated: function () {},
    components: {}
  }
</script>

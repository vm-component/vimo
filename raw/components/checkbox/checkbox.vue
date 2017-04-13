<template>
    <div class="ion-checkbox" :class="[modeClass,colorClass,{'checkbox-disabled':disabledValue}]">
        <div class="checkbox-icon" :class="{'checkbox-checked':checkedValue}">
            <div class="checkbox-inner"></div>
        </div>
        <button role="checkbox" @click="onPointerDownHandler()"
                type="button"
                ion-button="item-cover"
                class="item-cover">
        </button>
    </div>
</template>
<style lang="scss">
    @import './checkbox.ios';
    @import './checkbox.md';
</style>
<script type="text/ecmascript-6">
  /**
   * @module Component/Checkbox
   * @description
   * 复选框(检查框)组件
   *
   * > !!! 使用v-modal切换状态, 不支持checked属性
   *
   *
   * @property {String} mode - 模式
   * @property {String} color - 颜色
   * @property {Boolean} disabled - 单向选择, 点击且换并不对父组件传递
   *
   * @fire onChange - 点按选择时触发
   * */
  import { setElementClass, isTrueProperty } from '../../util/util'
  export default{
    name: 'Checkbox',
    data(){
      return {
        checkedValue: this.value,         // 内部维护的checked
        disabledValue: this.disabled,       // 内部维护的disabled
        init: false,                        // 是否初始化
        itemComponent: null,                // item组件实例
      }
    },
    props: {
      disabled: {
        type: Boolean,
        default(){return false}
      },
      color: [String],
      value: {
        type: Boolean,
        default(){return false}
      },
      mode: {
        type: String,
        default(){ return window.VM && window.VM.config.get('mode') || 'ios' }
      }
    },
    watch: {
      disabled(val){
        this.setDisabled(isTrueProperty(val))
      },
      value(val){
        this.setChecked(isTrueProperty(val))
      }
    },
    computed: {
      modeClass () {
        return `checkbox checkbox-${this.mode}`
      },
      colorClass () {
        return !!this.color ? (`checkbox-${this.mode}-${this.color}`) : ''
      }
    },
    methods: {
      setChecked(isChecked){
        if (isChecked !== this.checkedValue) {
          this.checkedValue = isChecked;
          if (this.init) {
            this.$emit('onChange', this.checkedValue);
            this.$emit('input', this.checkedValue)
          }
          this.itemComponent && setElementClass(this.itemComponent.$el, 'item-checkbox-checked', isChecked);
        }
      },
      setDisabled(isDisabled){
        this.disabledValue = isDisabled
        this.itemComponent && setElementClass(this.itemComponent.$el, 'item-checkbox-disabled', isDisabled)
      },
      onPointerDownHandler(){
        this.setChecked(!this.checkedValue)
      }
    },
    mounted: function () {
      // 找到外部item实例
      if (this.$parent.$options._componentTag.toLowerCase() === 'item') {
        this.itemComponent = this.$parent;
        setElementClass(this.itemComponent.$el, 'item-checkbox', true)
      }

      this.setChecked(this.value);
      this.setDisabled(this.disabled);

      this.init = true
    }
  }
</script>

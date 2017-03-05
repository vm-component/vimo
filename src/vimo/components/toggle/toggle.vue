<template>
  <div class="ion-toggle"
       :class="[modeClass,colorClass,{'toggle-disabled':isDisabled}]"
       @mousedown="pointStart($event)"
       @touchstart="pointStart($event)"
       @mouseup="pointEnd($event)"
       @touchend="pointEnd($event)"
       @click="clickHandler($event)">
    <div class="toggle-icon" :class="{'toggle-checked':isChecked,'toggle-activated':activated}">
      <div class="toggle-inner"></div>
    </div>
    <Button role="checkbox"
            type="button"
            ion-button="item-cover"
            :id="id"
            class="item-cover">
    </Button>
  </div>
</template>
<style lang="scss">
  @import 'toggle.ios.scss';
  @import 'toggle.md.scss';
  @import 'toggle.wp.scss';

</style>
<script type="text/ecmascript-6">
  /**
   * @name Toggle
   * @description
   *
   * 开关组件, 传入四个属性:
   * mode: 模式
   * color: 颜色
   * checked: 选中状态
   * disabled: 禁用状态
   *
   * 对外事件:
   * onChange
   *
   * */
  import { setElementClass } from '../../util/dom';
  import { isTrueProperty } from '../../util/util';

  export default{
    name: 'Toggle',
    data(){
      return {
        isChecked: false, // 选中状态
        isDisabled: false, // 禁用状态
        activated: false,
        id: this._uid,

        _item: null, // 父组件item的句柄
      }
    },
    props: {
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default: VM.config.get('mode') || 'ios',
      },
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: {
        type: String,
        default: '',
      },
      /**
       * 是否选中
       * */
      checked: {
        type: Boolean,
        default: false,
      },
      /**
       * 是否被禁
       * */
      disabled: {
        type: Boolean,
        default: false,
      }
    },
    watch: {
      disabled(val){
        this.setDisabled(val);
      },
      checked(val){
        this.setChecked(val);
      }
    },
    computed: {
      // 环境样式
      modeClass () {
        return `toggle toggle-${this.mode}`
      },
      // 颜色
      colorClass () {
        return !!this.color ? (`toggle-${this.mode}-${this.color}`) : ''
      },

    },
    methods: {

      // -------- private --------
      pointStart () {
        this.activated = true;
      },
      pointEnd () {
        this.activated = false;
      },
      clickHandler () {
        this.setChecked(!this.isChecked)
      },

      /**
       * 设置为被点击状态
       * @param {boolean} isChecked
       */
      setChecked(isChecked) {

        isChecked = isTrueProperty(isChecked);
        if (isChecked !== this.isChecked) {
          this.isChecked = isChecked;
          this.$emit('onChange', isChecked);
          this.setItemCheckedClass(isChecked)
        }
      },
      setItemCheckedClass(isChecked){
        this._item && this._item.$el && setElementClass(this._item.$el, 'item-toggle-checked', isChecked);
      },

      /**
       * 设置禁用状态
       * @param {boolean} isDisabled
       */
      setDisabled(isDisabled){
        isDisabled = isTrueProperty(isDisabled);
        if (isDisabled !== this.isDisabled) {
          this.isDisabled = isDisabled;
          this.setItemDisabledClass(isDisabled)
        }
      },
      setItemDisabledClass(isDisabled){
        this._item && this._item.$el && setElementClass(this._item.$el, 'item-toggle-disabled', isDisabled);
      },

      /**
       * init
       * 为父元素item设置class需要等待mounted之后
       */
      init(){
        if (!!this.$parent && !!this.$parent.$options._componentTag && this.$parent.$options._componentTag.toLowerCase() === 'item') {
          this._item = this.$parent;
          if(this._item.$el){
            setElementClass(this._item.$el, 'item-toggle', true);
            this.setItemCheckedClass(this.isChecked);
            this.setItemDisabledClass(this.isDisabled);
          }
        }
      }
    },
    created(){
      this.setChecked(this.checked);
      this.setDisabled(this.disabled);
    },
    mounted () {
      this.init();
    }
  }
</script>

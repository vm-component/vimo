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
        <button role="checkbox"
                type="button"
                ion-button="item-cover"
                :id="id"
                class="item-cover">
        </button>
    </div>
</template>
<style lang="scss">
    @import 'toggle.ios.scss';
    @import 'toggle.md.scss';
</style>
<script>
  /**
   * @module Component/Toggle
   * @description
   *
   *  > !!! 使用 v-model 切换状态, 不支持checked属性
   *
   * Toggle组件和Checkbox组件的功能类似, 但是Toggle组件在移动端更加好看, 也更加易用.
   *
   * Toggle可以设置颜色, 当然不同模式下的样式还是不一样的, 感兴趣的可以切换试试.
   *
   * @property {String} [mode='ios'] - 模式: "ios", "md", or "wp"
   * @property {String} [color] - 颜色: "primary", "secondary", "danger", "light", and "dark"
   * @property {Boolean} [disabled=false] - 禁用状态
   *
   * @fires onChange - Toggle组件切换时发出的事件, 传递当前的选中状态
   *
   * @example
   *
   <List>
   <ListHeader>
   普通使用
   </ListHeader>
   <Item>
   Toggle Normal
   <Toggle slot="item-right"></Toggle>
   </Item>
   <Item>
   Red Toggle
   <Toggle slot="item-right" color="danger"></Toggle>
   </Item>
   <Item>
   Toggle Open
   <Toggle slot="item-right"></Toggle>
   </Item>
   <Item>
   Toggle Close
   <Toggle slot="item-right"></Toggle>
   </Item>
   <Item>
   Toggle Disabled
   <Toggle slot="item-right" v-model="checked"></Toggle>
   </Item>
   </List>
   *
   * */
  import { setElementClass } from '../../util/util';
  import { isTrueProperty } from '../../util/util';

  export default{
    name: 'Toggle',
    data(){
      return {
        isChecked: this.value,       // 选中状态
        isDisabled: this.disabled,      // 禁用状态
        activated: false,
        id: this._uid,
        init: false,            // 是否初始化
        itemComponent: null,    // 父组件item的句柄
      }
    },
    props: {
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default(){ return window.VM && window.VM.config.get('mode') || 'ios' }
      },
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: {
        type: String,
        default: '',
      },

      /**
       * 是否被禁
       * */
      disabled: {
        type: Boolean,
        default: false,
      },

      // 内部值
      value: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      disabled(val){
        this.setDisabled(val);
      },
      value(val){
        this.setChecked(val);
      },
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
          if (this.init) {
            this.$emit('onChange', isChecked);
            this.$emit('input', isChecked)
          }

          this.setItemCheckedClass(isChecked)
        }
      },
      setItemCheckedClass(isChecked){
        this.itemComponent && this.itemComponent.$el && setElementClass(this.itemComponent.$el, 'item-toggle-checked', isChecked);
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
        this.itemComponent && this.itemComponent.$el && setElementClass(this.itemComponent.$el, 'item-toggle-disabled', isDisabled);
      }
    },
    mounted () {
      if (!!this.$parent && !!this.$parent.$options._componentTag && this.$parent.$options._componentTag.toLowerCase() === 'item') {
        this.itemComponent = this.$parent;
        if (this.itemComponent.$el) {
          setElementClass(this.itemComponent.$el, 'item-toggle', true);
          this.setItemCheckedClass(this.isChecked);
          this.setItemDisabledClass(this.isDisabled);
        }
      }

      this.setChecked(this.value);
      this.setDisabled(this.disabled);

      this.init = true
    }
  }
</script>

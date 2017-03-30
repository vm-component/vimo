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
</style>
<script>
  /**
   * @module Component/Toggle
   * @description
   *
   * Toggle组件和Checkbox组件的功能类似, 但是Toggle组件在移动端更加好看, 也更加易用.
   *
   * Toggle可以设置颜色, 当然不同模式下的样式还是不一样的, 感兴趣的可以切换试试.
   *
   * @property {String} [mode='ios'] - 模式: "ios", "md", or "wp"
   * @property {String} [color] - 颜色: "primary", "secondary", "danger", "light", and "dark"
   * @property {Boolean} [checked=false] - 选中状态, 一般用于初始值, 且无v-model的情况, 如果v-model和checked都使用的话, 则使用`||`选择
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
   <Toggle slot="item-right" :checked="true"></Toggle>
   </Item>
   <Item>
   Toggle Close
   <Toggle slot="item-right" :checked="false"></Toggle>
   </Item>
   <Item>
   Toggle Disabled
   <Toggle slot="item-right" v-model="checked"></Toggle>
   </Item>
   </List>
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
      checked(val){
        this.setChecked(val);
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
          this.$emit('onChange', isChecked);
          this.$emit('input', isChecked)
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
          if (this._item.$el) {
            setElementClass(this._item.$el, 'item-toggle', true);
            this.setItemCheckedClass(this.isChecked);
            this.setItemDisabledClass(this.isDisabled);
          }
        }
      }
    },
    created(){
      this.setChecked(this.checked || this.value);
      this.setDisabled(this.disabled);
    },
    mounted () {
      this.init();
    }
  }
</script>

<template>
  <label class="ion-label label" :class="[modeClass,colorClass]" :form="form">
    <slot></slot>
  </label>
</template>
<style lang="scss">
  @import "./label.scss";
  @import "./label.ios.scss";
  @import "./label.md.scss";
  @import "./label.wp.scss";
</style>
<script type="text/ecmascript-6">
  import { setElementClass } from '../../util/dom'
  import { isTrueProperty } from '../../util/util'
  export default{
    name: 'Label',
    data(){
      return {
        _item: null, // 父元素Item实例
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
       * 规定 label 字段所属的一个或多个表单。
       * */
      form: {
        type: String,
        default: '',
      },

      /**
       * 规定 label 绑定到哪个表单元素。
       * */
      for: {
        type: String,
        default: '',
      }

    },
    watch: {},
    computed: {
      // 环境样式
      modeClass () {
        return `label-${this.mode}`
      },
      // 颜色
      colorClass () {
        return !!this.color ? (`label-${this.mode}-${this.color}`) : ''
      }

    },
    methods: {},
    created () {},
    mounted () {
      const _this = this;
      // 向父组件Item传递Class
      this._item = this.$parent;

      /**
       * 可以是fixed/floating/stacked，这个和input与label的位置相关
       * fixed: 固定label宽度, 和input并列
       * floating:  当input为空的时候, label盖在input上面; 当input有值, 则浮动到上部
       * stacked: floating的特例, 不管有没有值, 都浮动到上部
       * */
      if(this._item.$el){
        setElementClass(this._item.$el, 'item-label-fixed', isTrueProperty(this.$el.getAttribute('fixed')))
        setElementClass(this._item.$el, 'item-label-floating', isTrueProperty(this.$el.getAttribute('floating')))
        setElementClass(this._item.$el, 'item-label-stacked', isTrueProperty(this.$el.getAttribute('stacked')))
        setElementClass(this._item.$el, 'item-label-inset', isTrueProperty(this.$el.getAttribute('inset')))
      }

    },
    activated () {},
    components: {}
  }
</script>

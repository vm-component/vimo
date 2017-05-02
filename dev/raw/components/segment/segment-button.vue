<template>
    <div @click="onPointerDownHandler($event)" class="ion-segment-button segment-button"
         :class="{'segment-activated':isSelected,'segment-button-disabled':isDisabled}">
        <slot></slot>
        <!--<div class="button-effect"></div>-->
    </div>
</template>
<script>
  /**
   * @component SegmentButton
   * @description
   *
   * ## 小标签 / SegmentButton
   *
   * Segment组件的子组件SegmentButton, 两者配合使用, 属于嵌套关系.
   *
   * @property {String} value - 当前SegmentButton的值, 如果父元素的value和这个相同, 这个当前被选中
   * @property {Boolean} [disabled=false] - 当前SegmentButton的禁用状态
   * @property {String} [mode='ios'] - 当前样式模式
   *
   * @slot 空 - 当前button的显示值, 如果没有提供value值, 建议不要嵌套过多的结构.
   *
   * @fires component:Segment#onSelect
   * @see component:Segment
   *
   * */
  import { isTrueProperty } from '../../util/util'
  export default{
    name: 'SegmentButton',
    data(){
      return {
        theValue: null, // 当前环境的value副本

        isInit: false,
        parentComponent: null, // 父组件实例
        isSelected: false, // 标志当前是否选中
        isDisabled: false,
      }
    },
    props: {
      /**
       * 当前button的激活值
       * */
      value: [String],
      disabled: [Boolean],
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default(){ return window.VM && window.VM.config.get('mode', 'ios') || 'ios' }
      },
    },
    watch: {
      disabled(val){
        this.setDisabled(isTrueProperty(val))
      }
    },
    methods: {
      /**
       * 设置当前组件的禁用状态
       * @private
       * */
      setDisabled(isDisabled){
        this.setState(null)
        this.isDisabled = isDisabled
      },

      /**
       * 设置当前子组件选中状态
       * @private
       * */
      setState(stateValue){
        let isSelected = (stateValue === this.theValue) && !this.isDisabled
        if (this.isSelected !== isSelected) {
          this.isSelected = isSelected
          /**
           * @event component:Segment#onSelect
           * @description 当子元素被点击选中的时触发
           * @property {string} value - 当前传入的值
           */
          this.isInit && this.isSelected && this.$emit('onSelect', this.theValue);
        }
      },

      /**
       * 子组件点击告知父组件
       * @private
       * */
      onPointerDownHandler ($event) {
        $event.preventDefault()
        $event.stopPropagation()
        this.parentComponent && this.parentComponent.onChildChange(this.theValue)
      },

      /**
       * @function getValue
       * @description
       * 获取组件的value值
       * @return {String}
       * @private
       * */
      getValue(){
        if (this.isInit) {
          return this.theValue
        } else {
          let _value = ''
          if (!!this.value) {
            // prop传入title值
            _value = this.value.trim()
          } else if (!!this.$slots.default && !!this.$slots.default[0] && !!this.$slots.default[0].text) {
            // 如果是直接写在slot中的值
            _value = this.$slots.default[0].text.trim();
          } else if (!!this.$slots.default && !!this.$slots.default[0] && !!this.$slots.default[0].tag && !!this.$slots.default[0].children[0].text) {
            this.$slots.default.forEach((item) => {
              if (!!item.children && item.children.length > 0 && !!item.children[0] && !!item.children[0].text) {
                _value += item.children[0].text.trim()
              }
            })
          }
          return _value
        }
      }
    },
    mounted(){

      // find parent component
      if (this.$parent.$options._componentTag.toLowerCase() === 'segment') {
        this.parentComponent = this.$parent
      } else {
        console.error('The component of SegmentButton must combine with Segment component!')
        return false
      }

      // let father to record me
      this.parentComponent.recordChild(this)

      // define value
      this.theValue = this.getValue()

      this.setDisabled(this.disabled)

      this.isInit = true
    }
  }
</script>

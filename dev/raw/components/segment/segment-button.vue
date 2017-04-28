<template>
    <div @click="_click" class="ion-segment-button segment-button" :class="{'segment-activated':isSelected}">
        <slot></slot>
        <!--<div class="button-effect"></div>-->
    </div>
</template>
<script>
  /**
   * @component Component/SegmentButton
   * @description
   *
   * Segment组件的子组件SegmentButton, 两者配合使用, 属于嵌套关系.
   *
   * @property {String} value - 当前SegmentButton的值, 如果父元素的value和这个相同, 这个当前被选中
   *
   *
   * @fires onSelect - 被选中的事件, 发送当前被选中的值
   *
   * */
  export default{
    name: 'SegmentButton',
    data(){
      return {
        isSelected: false // 标志当前是否选中
      }
    },
    props: {
      /**
       * 当前button的激活值
       * */
      value: {
        type: String,
        default: ''
      },

      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default(){ return window.VM && window.VM.config.get('mode', 'ios') || 'ios' }
      },
    },
    methods: {
      _click () {
        // 修改父元素的缓存值，触发watch监听
        this.$parent.parentVal = this.value;
        this.$emit('onSelect', this.value);
      }
    },
    created(){
      console.assert(this.$parent.$options._componentTag.toLowerCase() === 'segment', 'The component of SegmentButton must combine with Segment component!')
    }
  }
</script>

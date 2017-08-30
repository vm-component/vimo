<template>
    <div class="vm-scroll-segment-button" @click="clickHandler($event)" :class="{[activeClass]:isActive}">
        <slot></slot>
    </div>
</template>
<style lang="less">
    .vm-scroll-segment-button {
        position: relative;
        display: block;
        height: 100%;
        box-sizing: border-box;
    }

    .segment-button-active {
    }
</style>
<script type="text/javascript">
  /**
   * @component ScrollSegment/ScrollSegmentButton
   * @description
   *
   * ## 滑动片段组件 / ScrollSegmentButton
   *
   * */
  export default{
    name: 'ScrollSegmentButton',
    data () {
      return {
        activeClass: '',
        isActive: false,
        rect: null, // 当前组件的位置关系
        scrollSegmentComponent: null
      }
    },
    methods: {
      /**
       * 当点击当前元素
       * */
      clickHandler ($event) {
        this.$emit('click', $event)
        this.$emit('onSelect', $event)
        this.scrollSegmentComponent.refresh(this._uid, this.rect)
      },
      setState (id) {
        this.isActive = (this._uid === id)
      }
    },
    mounted () {
      if (this.$parent.$options._componentTag.toLowerCase() === 'scrollsegment') {
        this.scrollSegmentComponent = this.$parent
        this.scrollSegmentComponent.record(this)
        this.activeClass = this.scrollSegmentComponent.activeClass
        // 获取当前组件的尺寸及距离页面的位置
        this.rect = {
          left: this.$el.offsetLeft,
          width: this.$el.offsetWidth
        }
      }
    }
  }
</script>

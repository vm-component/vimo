<template>
    <div class="vm-scroll-segment-button" @click="clickHandler($event)" :class="{[activeClass]:isActive}">
        <slot></slot>
    </div>
</template>
<style scoped lang="scss">
    .vm-scroll-segment-button {
        position: relative;
        display: block;
        height: 100%;
        box-sizing: border-box;
    }

    .segment-button-active {
        background: #ddd;
    }
</style>
<script type="text/javascript">
  /**
   *
   * onSelect事件
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
    props: {},
    watch: {},
    computed: {},
    methods: {
      /**
       * 当点击当前元素
       * */
      clickHandler ($event) {
        this.$emit('click', $event)
        this.scrollSegmentComponent.refresh(this._uid, this.rect)
      },
      setState (id) {
        this.isActive = this._uid === id
      }
    },
    created () {},
    mounted () {
      if (this.$parent.$options._componentTag.toLowerCase() === 'scrollsegment') {
        this.scrollSegmentComponent = this.$parent
        this.scrollSegmentComponent.record(this)
        this.activeClass = this.scrollSegmentComponent.activeClass
        // 获取当前组件的尺寸及距离页面的位置
        this.rect = this.$el.getBoundingClientRect()
      }
    },
    activated () {},
    components: {}
  }
</script>

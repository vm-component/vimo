<template>
    <div class="ion-item-options" :side="side">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Item/ItemSlidingOptions
   * @description
   *
   * 这个组件是 ItemSliding 组件的子组件, 两者配合使用.
   *
   * @props {String} [side='right'] - 选项按钮的左右位置
   *
   * @slot 空 - 默认填充位置, 可放置按钮
   *
   *
   * @demo #/slidingList
   * @see component:ItemSliding
   * */
  export default{
    name: 'ItemSlidingOptions',
    data () {
      return {}
    },
    props: {
      // item的位置
      side: {
        type: String,
        default: 'right'
      }
    },
    methods: {
      /**
       * 计算这个options的宽度
       * @private
       * */
      width () {
        // let _display = this.$el.display;
        // this.$el.display = 'block';
        let _offsetWidth = this.$el.offsetWidth
        // this.$el.display = _display;
        return _offsetWidth
      }
    }
  }
</script>

<template>
    <div class="ion-item-options" :side="side">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">

  export default {
    name: 'ItemSlidingOptions',
    data () {
      return {}
    },
    props: {
      // item的位置
      side: {
        type: String,
        default: 'right',
        validator (val) {
          return ~[
            'left',
            'right'
          ].indexOf(val)
        }
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

<template>
    <div class="ion-item-options" :side="side">
        <slot></slot>
    </div>
</template>
<style lang="scss">
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'ItemOptions',
    data(){
      return {}
    },
    props: {
      // item的位置
      side: {
        type: String,
        default: 'right',
      },
    },
    watch: {},
    computed: {},
    methods: {
      /**
       * 计算这个options的宽度
       * */
      width(){
        // let _display = this.$el.display;
        // this.$el.display = 'block';
        let _offsetWidth = this.$el.offsetWidth;
        // this.$el.display = _display;
        return _offsetWidth;
      },
    }
  }
</script>

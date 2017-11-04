<style lang="less">
    .slide-lite {
        width: 100%;
        position: relative;
        flex: 0 0 auto;
        opacity: 1;
        height: 100%;
        box-sizing: border-box;
    }

    .slide-lite img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
    }
</style>
<template>
    <div class="slide-lite">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component SlidesLite/Slide
   * @description
   *
   * ## 轮播组件 / 精简版Slide组件
   * */
  export default {
    name: 'Slide',
    mounted () {
      if (this.$parent.$options._componentTag.toLowerCase().indexOf('slides') > -1) {
        // 告知父组件进行初始化
        this.$parent.initSlides()
      }
    }
  }
</script>

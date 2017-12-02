<template>
    <div class="slide-lite">
        <slot></slot>
    </div>
</template>
<style lang="scss" src="./style.scss"></style>
<script type="text/javascript">
  /**
   * @component SlidesLite/Slide
   * @description
   *
   * ## 轮播组件 / 精简版Slide组件
   * */
  export default {
    name: 'SlideLite',
    inject: {
      slidesLiteComponent: {
        from: 'slidesLiteComponent',
        default: null
      }
    },
    mounted () {
      if (this.slidesLiteComponent) {
        // 告知父组件进行初始化
        this.slidesLiteComponent.initSlides()
      }
    }
  }
</script>

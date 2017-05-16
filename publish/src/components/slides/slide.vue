<template>
    <div class="swiper-slide">
        <div class="slide-zoom">
            <slot></slot>
        </div>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Slide
   * @description
   *
   * ## 轮播组件 / Slide
   *
   * Slide组件是Slides组件的子组件, 两者联合使用, 不可拆分. 轮播组件具体使用参考下面的连接:
   *
   *
   * @see component:Slides
   *
   * */
  export default {
    name: 'Slide',
    data () {
      return {
        slidesComponent: null
      }
    },
    created () {
      if (this.$parent.$options._componentTag.toLowerCase() === 'slides') {
        this.slidesComponent = this.$parent
        this.slidesComponent.initSlides()
      }
    }
  }
</script>

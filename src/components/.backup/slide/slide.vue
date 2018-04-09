<template>
    <div class="swiper-slide">
        <template v-if="zoom">
            <div class="swiper-zoom-container">
                <slot></slot>
            </div>
        </template>
        <template v-else>
            <slot></slot>
        </template>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Slides/Slide
   * @description
   *
   * ## 轮播组件 / Slide组件
   * */
  export default {
    name: 'Slide',
    inject: {
      slidesComponent: 'slidesComponent'
    },
    data () {
      return {
        zoom: false
      }
    },
    created () {
      if (this.slidesComponent) {
        this.zoom = this.slidesComponent.zoom
        this.slidesComponent.initSlides()
      }
    }
  }
</script>

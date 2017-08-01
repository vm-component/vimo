<template>
    <div class="swiper-slide">
        <template v-if="zoom">
            <div class="swiper-zoom-container" >
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
        zoom: false,
        slidesComponent: null
      }
    },
    created () {
      if (this.$parent.$options._componentTag.toLowerCase() === 'slides') {
        this.slidesComponent = this.$parent
        this.zoom = this.slidesComponent.zoom
        this.slidesComponent.initSlides()
      }
    },
    mounted () {

    }
  }
</script>

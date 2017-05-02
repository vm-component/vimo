<template>
    <div class="swiper-slide">
        <div class="slide-zoom">
            <slot></slot>
        </div>
    </div>
</template>
<script>
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
    name: 'Slide'
  }
</script>

<style scoped>
    .slide-lite.slide {
        width: 100%;
        position: relative;
        flex: 0 0 auto;
        opacity: 1;
        pointer-events: none;
        height: 100%;
        box-sizing: border-box;
    }

    .slide-lite.slide img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
    }
</style>
<template>
    <div class="slide-lite slide">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  export default {
    name: 'SlideLite',
    mounted () {
      if (this.$parent.$options._componentTag.toLowerCase() === 'slideslite') {
        // 告知父组件进行初始化
        this.$parent.initSlides()
      }
    }
  }
</script>

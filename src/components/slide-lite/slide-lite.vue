<template>
    <div class="slide-lite">
        <slot></slot>
    </div>
</template>

<script type="text/javascript">
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

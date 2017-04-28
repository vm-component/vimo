<template>
    <div class="swiper-container" :id="slideId" :class="[slideId]">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <!-- Add Pagination -->
        <div v-if="pagination" class="swiper-pagination"></div>
        <!-- Add Arrows -->
        <div v-if="prevButton" class="swiper-button-prev"></div>
        <div v-if="nextButton" class="swiper-button-next"></div>
    </div>
</template>
<style lang="scss">
    @import "./slides.scss";
</style>

<script>
  /**
   * @component Slides
   * @description
   *
   * ## 轮播组件 / Slides
   *
   * 这部分是移植Swiper插件, 因此两者的API完全移植, 即:  Swiper初始化传入的参数/发出的事件都可在Slides中使用
   *
   *
   * 事件:
   * onInit:
   * onAutoplay:
   * onAutoplayStart:
   * onAutoplayStop:
   * onSlideNextEnd:
   * onSlideNextStart:
   * onSlidePrevEnd:
   * onSlidePrevStart:
   * onSlideChangeStart:
   * onSlideChangeEnd:
   * onDoubleTap:
   * onTap:
   * onSliderMove
   * onReachEnd:
   * onReachBeginning:
   *
   * !!如果slides的数据是异步的话, 请在onInit上绑定初始化Slides的操作
   *
   * @see http://idangero.us/swiper/api/
   *
   * */
  import Swiper from './swiper.js'
  import { assign } from '../../util/util'
  import { getProps, getEvents } from './interface'
  let slidesId = -1;
  export default {
    name: 'Slides',
    props: getProps(),
    data(){
      return {
        swiperInstance: null,
        id: ++slidesId,
        init: false,
      }
    },
    computed: {
      slideId(){
        return 'slides-' + this.id;
      }
    },
    methods: {
      /**
       * 初始化swiper
       * @private
       * */
      initSlides(){
        if (!this.init) {
          this.swiperInstance = new Swiper(this.$el, assign(this._props, getEvents(this)))
          this.init = true
        }
      },
    },
    mounted() {
      this.initSlides();
    },
    destroy() {
      this.swiperInstance && this.swiperInstance.destroy()
    }
  }
</script>

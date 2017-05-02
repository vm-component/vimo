<template>
    <div class="swiper-container" :id="slideId" :class="[slideId]">
        <slot name="parallax"></slot>
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <!-- Add Pagination -->
        <div v-if="pagination" :class="paginationClass"></div>
        <!-- Add Arrows -->
        <div v-if="prevButton" :class="prevButtonClass"></div>
        <div v-if="nextButton" :class="nextButtonClass"></div>
        <!-- Add Scrollbar -->
        <div v-if="scrollbar" :class="scrollbarClass"></div>

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
      },
      // 指示标志的class
      paginationClass(){
        if (this.pagination[0] === '.') {
          return this.pagination.substr(1)
        } else {
          console.error('The props of pagination in Slides component need dot in front, like `.swiper-pagination`. ')
          return null
        }
      },
      nextButtonClass(){
        if (this.nextButton[0] === '.') {
          return this.nextButton.substr(1)
        } else {
          console.error('The props of nextButton in Slides component need dot in front, like `.swiper-button-next`. ')
          return null
        }
      },
      prevButtonClass(){
        if (this.prevButton[0] === '.') {
          return this.prevButton.substr(1)
        } else {
          console.error('The props of prevButton in Slides component need dot in front, like `.swiper-button-prev`. ')
          return null
        }
      },
      scrollbarClass(){
        if (this.scrollbar[0] === '.') {
          return this.scrollbar.substr(1)
        } else {
          console.error('The props of scrollbar in Slides component need dot in front, like `.swiper-scrollbar`. ')
          return null
        }
      },
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
      }
    },
    mounted() {
      this.initSlides();
    },
    destroy() {
      this.swiperInstance && this.swiperInstance.destroy()
    }
  }
</script>

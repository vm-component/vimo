<template>
    <div class="swiper-container" :id="slideId" :class="[slideId]">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <div v-if="pager" class="swiper-pagination"></div>
    </div>
</template>
<style lang="scss">
    @import "./slides.scss";
</style>
<script>
  /**
   * @module Component/Slides
   * @description
   * 轮播组件
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
   * */
  import Swiper from './swiper.js';

  import { defaults } from '../../util/util'
  let slidesId = -1;
  // swiper的默认参数
  const DEFAULT_OPTIONS = {
    pagination: '.swiper-pagination',
    paginationClickable: false,
  };
  const DEFAULT_EVENT_HANDLER = (_this) => {
    return {
      onInit(){_this.$emit('onInit', _this)},
      onAutoplay(){_this.$emit('onAutoplay', _this)},
      onAutoplayStart(){_this.$emit('onAutoplayStart', _this)},
      onAutoplayStop(){_this.$emit('onAutoplayStop', _this)},
      onSlideNextStart(){_this.$emit('onSlideNextStart', _this)},
      onSlideNextEnd(){_this.$emit('onSlideNextEnd', _this)},
      onSlidePrevStart(){_this.$emit('onSlidePrevStart', _this)},
      onSlidePrevEnd(){_this.$emit('onSlidePrevEnd', _this)},
      onSlideChangeStart(){_this.$emit('onSlideChangeStart', _this)},
      onSlideChangeEnd(){_this.$emit('onSlideChangeEnd', _this)},
      onDoubleTap(){_this.$emit('onDoubleTap', _this)},
      onTap(){_this.$emit('onTap', _this)},
      onSliderMove(){_this.$emit('onSliderMove', _this)},
      onReachEnd(){_this.$emit('onReachEnd', _this)},
      onReachBeginning(){_this.$emit('onReachBeginning', _this)},
    }
  };

  export default {
    name: 'Slides',
    props: {
      /**
       * 是否自动
       * 如果有值, 则时间过后自动播放
       * */
      autoplay: {
        type: Number,
        default: null,
      },
      /**
       * 方向
       * */
      direction: {
        type: String,
        default: 'horizontal',
        validator (value) {
          let arr = ['horizontal', 'vertical']
          return arr.indexOf(value) > -1
        }
      },
      /**
       * 动画效果, 可以是: slide, fade, cube, coverflow or flip
       * */
      effect: {
        type: String,
        default: 'slide',
        validator (value) {
          let arr = ['slide', 'fade', 'cube', 'coverflow', 'flip']
          return arr.indexOf(value) > -1
        }
      },
      /**
       * 初始值
       * */
      initialSlide: {
        type: Number,
        default: 0,
      },
      /**
       * 是否循环滚动
       * */
      loop: {
        type: Boolean,
        default: false,
      },
      /**
       * 是否显示下面的标页码
       * */
      pager: {
        type: Boolean,
        default: true,
      },
      /**
       * 标页码样式, 可选值: bullets, fraction, progress
       * */
      paginationType: {
        type: String,
        default: 'bullets',
        validator (value) {
          let arr = ['bullets', 'fraction', 'progress', 'bullets'];
          return arr.indexOf(value) > -1
        }
      },
      /**
       * 是否开启视差
       * */
      parallax: {
        type: Boolean,
        default: false,
      },
      /**
       * 在一页中同时看到的slide数
       * */
      slidesPerView: {
        type: Number,
        default: 1,
      },
      /**
       * slide之间的距离
       * */
      spaceBetween: {
        type: Number,
        default: 0,
      },
      /**
       * 速度
       * */
      speed: {
        type: Number,
        default: 300,
      },
      /**
       * 是否双击放大
       * */
      zoom: {
        type: Boolean,
        default: false,
      },
      // 自定义更复杂的属性, 优先级比上面的props低, 比默认值高, 不能有on开头的key
      options: {
        type: Object,
        default(){
          return {}
        },
        validator (value) {
          let keys = Object.keys(value);
          let isValid = true;
          for (let i = 0, len = keys.length; len > i; i++) {
            if (keys[i].indexOf('on') === 0) {
              isValid = false;
              break;
            }
          }
          return isValid
        }
      }
    },
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
      // -------- public --------
      getActiveIndex(){
        return this.swiperInstance && this.swiperInstance.activeIndex
      },
      getPreviousIndex(){
        return this.swiperInstance && this.swiperInstance.previousIndex
      },
      isBeginning(){
        return this.swiperInstance && this.swiperInstance.isBeginning
      },
      isEnd(){
        return this.swiperInstance && this.swiperInstance.isEnd
      },
      length(){
        return this.swiperInstance && this.swiperInstance.slides.length
      },
      lockSwipeToNext(){
        return this.swiperInstance && this.swiperInstance.lockSwipeToNext()
      },
      lockSwipeToPrev(){
        return this.swiperInstance && this.swiperInstance.lockSwipeToPrev()
      },
      lockSwipes(){
        return this.swiperInstance && this.swiperInstance.lockSwipes()
      },
      resize(){
        return this.swiperInstance && this.swiperInstance.onResize()
      },
      slideNext(speed, runCallbacks){
        return this.swiperInstance && this.swiperInstance.slideNext(runCallbacks, speed)
      },
      slidePrev(speed, runCallbacks){
        return this.swiperInstance && this.swiperInstance.slideNext(runCallbacks, speed)
      },
      slideTo(index, speed, runCallbacks){
        this.swiperInstance && this.swiperInstance.slideTo(index, speed, runCallbacks)
      },
      startAutoplay(){
        this.swiperInstance && this.swiperInstance.startAutoplay()
      },
      stopAutoplay(){
        this.swiperInstance && this.swiperInstance.stopAutoplay()
      },
      update(){
        this.swiperInstance && this.swiperInstance.update()
      },

      // -------- private --------
      // 获取props中的属性
      getPropOptions(){
        return {
          autoplay: this.autoplay,
          direction: this.direction,
          effect: this.effect,
          initialSlide: this.initialSlide,
          loop: this.loop,
          paginationHide: !this.pager,
          paginationType: this.paginationType,
          parallax: this.parallax,
          slidesPerView: this.slidesPerView,
          spaceBetween: this.spaceBetween,
          speed: this.speed,
          zoom: this.zoom,
        }
      },
      // 初始化swiper
      initSlides(){
        if (!this.init) {
          // init swiper core
          // 优先级: prop > this.options > DEFAULT_OPTIONS
          let _options = defaults(this.getPropOptions(), DEFAULT_OPTIONS, this.options);
          // 增加对外事件, 事件为最高级. 在options中的监听希望在component中做
          let _final = Object.assign(_options, DEFAULT_EVENT_HANDLER(this))
          this.swiperInstance = new Swiper(this.$el, _final);
          this.init = true;
        }
      },
    },
    mounted() {
      this.initSlides();
    },
    destroy() {
      this.swiperInstance.destroy()
    }
  }
</script>

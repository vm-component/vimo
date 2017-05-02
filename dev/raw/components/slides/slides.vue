<template>
    <div class="swiper-container" :id="slideId">
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
   * 这部分是移植Swiper插件, 因此两者的API完全移植, 即:  Swiper初始化传入的参数/发出的事件都可在Slides中使用.
   *
   * ### Vue组件传参及Swiper初始化的概念互通
   *
   * Swiper插件在初始化的时候需要传入轮播HTML结构的信息, 之后传入初始化对象. 初始化对象包括**属性参数**和**钩子事件参数**, 因此在向Vue组件迁移则为这样:
   *
   * - 属性部分对应Vue组件的props
   * - 钩子时间部分对应Vue组件的事件系统
   *
   * 此外, swiper初始化的部分交由slides组件处理, 并且组件自行记录Swiper的id, 默认id从0开始.
   *
   * ### 关于
   *
   * 关于props被修改的报错, 这部分暂时未处理, 且即使报错也能正常build. 去除报错就是按照错误提示将此props值手动传入即可(比如定义effect属性).
   *
   * ### 最后
   *
   * 具体用法请参考Demo, Swiper API请参考下面的文档.
   *
   * @slot [parallax] - 当定义视差时, 需要这个插槽
   *
   * @usage
   * // 比如: 需要左右两个翻页Button和下面的pagination, pagination可点击, 且自动播放间隔2500ms, 页面间距30px, 此外还要要在onInit事件处理相关业务
   *
   * <h5>Autoplay</h5>
   * <Slides class="swiper"
   *        @ onInit="onInitHandler"
   *        nextButton=".swiper-button-next"
   *        prevButton=".swiper-button-prev"
   *        pagination=".swiper-pagination"
   *        :paginationClickable="true"
   *        :centeredSlides="true"
   *        :autoplay="2500"
   *        :autoplayDisableOnInteraction="false"
   *        :spaceBetween="30">
   *    <!-- 幻灯内容 -->
   *    <Slide class="slide">
   *        <img src="../../static/img/scenery_1.jpg">
   *    </Slide>
   *    <Slide class="slide">
   *        <img src="../../static/img/scenery_2.jpg">
   *    </Slide>
   *    <Slide class="slide">
   *        <img src="../../static/img/scenery_3.jpg">
   *    </Slide>
   * </Slides>
   *
   * .....
   *
   * methods: {
   *    onInitHandler(swiperInstance){
   *      console.debug('Swiper实例: ')
   *      console.debug(swiperInstance)
   *    }
   *  }
   *
   *
   *
   * @demo http://xiangsongtao.com/vimo/#/slides
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

<template>
    <div class="slides-lite slides-container" :id="slideId">
        <div class='slides-wrapper'>
            <slot></slot>
        </div>
        <!-- Add Pagination -->
        <div v-if="pagination && swiper && swiper.slides && swiper.slides.length>0"
             :class="{'swiper-pagination':pagination}"
             class="swiper-pagination-bullets">
            <span class="swiper-pagination-bullet" v-for="(item,index) in swiper.slides"
                  :class="{'swiper-pagination-bullet-active':swiper.activeIndex === index}"></span>
        </div>
    </div>
</template>
<script type="text/javascript">
  import Swipe from 'swipe-js-iso'

  export default {
    name: 'SlidesLite',
    provide () {
      const _this = this
      return {
        slidesLiteComponent: _this
      }
    },
    props: {
      pagination: String,                                       // 指示器的class, 且只支持'.swiper-pagination'
      initialSlide: {type: Number, default: 0},                 // 初始的index
      speed: {type: Number, default: 400},                      // 速度
      autoplay: {type: Number, default: 0},                     // 自动播放时间
      loop: {type: Boolean, default: false},                    // 循环
      touchMoveStopPropagation: {type: Boolean, default: false} // 是否冒泡
    },

    data () {
      return {
        init: false, // 是否初始化
        timer: null, // 初始化的计时器
        swipe: null, // swipe-js-iso 实例
        swiper: null // 模拟 Swiper 接口的部分
      }
    },
    computed: {
      slideId () {
        return 'slidesLite-' + this._uid
      }
    },
    methods: {
      initSlides () {
        const _this = this
        this.timer && window.clearTimeout(this.timer)
        this.timer = window.setTimeout(() => {
          if (!this.init) {
            this.swipe = new Swipe(this.$el, {
              startSlide: this.initialSlide,
              speed: this.speed,
              auto: this.autoplay,
              continuous: this.loop,
              disableScroll: false,
              stopPropagation: this.touchMoveStopPropagation,
              swiping (progress) {
                _this.$emit('onProgress', _this.swiper, progress)
              },
              callback (index) {
                _this.swiper.activeIndex = index
                _this.$emit('onSlideChangeEnd', _this.swiper)
              },
              transitionEnd (index) {
                _this.swiper.activeIndex = index
                _this.$emit('onTransitionEnd', _this.swiper)
              }
            })
            this.swiper = {
              activeIndex: _this.initialSlide,
              slides: (() => { return _this.$children })(),
              slidePrev () {
                _this.swipe.prev()
              },
              slideNext () {
                _this.swipe.next()
              },
              slideTo (index, duration) {
                _this.swipe.slide(index, duration)
              },
              update () {
                _this.$nextTick(() => {
                  _this.swiper.slides = _this.$children
                  _this.swipe.setup()
                })
              },
              stopAutoplay () {
                _this.swipe.stop()
              },
              destroy () {
                _this.swipe.kill()
              }
            }
            this.init = true
          } else {
            this.swiper.update()
          }
        }, 0)
      }
    },
    destroyed () {
      this.swiper && this.swiper.destroy()
    }
  }
</script>

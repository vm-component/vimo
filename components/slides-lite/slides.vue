<style lang="less">
    .slides-lite {
        &.slides-container {
            overflow: hidden;
            visibility: hidden;
            position: relative;
            margin-left: auto;
            margin-right: auto;
            z-index: 1;
            width: 100%;
            padding: 0;
            display: flex;
            .slides-wrapper {
                overflow: hidden;
                position: relative;
                display: flex;
                flex-wrap: nowrap;
                width: 100%;
                height: 100%;
                padding: 0;
            }
        }
        .swiper-pagination {
            position: absolute;
            text-align: center;
            transition: 300ms;
            transform: translate3d(0, 0, 0);
            z-index: 10;
            &.swiper-pagination-bullets {
                bottom: 10px;
                left: 0;
                width: 100%;
            }
            .swiper-pagination-bullet {
                margin: 0 5px;
                width: 8px;
                height: 8px;
                display: inline-block;
                border-radius: 100%;
                background: #000;
                opacity: .2;
                &.swiper-pagination-bullet-active {
                    opacity: 1;
                    background: #007aff;
                }
            }
        }
    }
</style>
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
  /**
   * @component SlidesLite
   * @description
   *
   * ## 轮播组件 / 精简版Slides组件
   *
   * 参考的项目源自`swipe-js-iso`, 详情转向下方链接, 此外 为了保证和Slide组件接口的一致性, 将同操作和同属性的接口改成和Slides一致的名称
   *
   *
   * ### 对照表
   *
   当前属性 / Props                  | 原始名称 / Original              | 类型 / type  | 默认值 / Default | 描述 / Description
   ------------------------------|------------------------------|------------|---------------|-------------------------------------------------------------------------------------------
   initialSlide                  | startSlide                   | Number     | 0             | index position Swipe should start at
   speed                         | speed                        | Number     | 300           | speed of prev and next transitions in milliseconds.
   autoplay                      | auto                         | Number     | -             | begin with auto slideshow (time in milliseconds between slides)
   loop                          | continuous                   | Boolean    | true          | create an infinite feel with no endpoints
   -                             | disableScroll                | Boolean    | false         | stop any touches on this container from scrolling the page(点击拖动轮播是否能滚动页面,pc上可以,移动端不起作用)
   touchMoveStopPropagation      | stopPropagation              | Boolean    | false         | stop event propagation
   pagination                    | -                            | String     | ''            | 只能是'.swiper-pagination'

   *
   *
   当前事件 / Event                  | 原始名称 / Original              | 类型 / type  | 默认值 / Default | 描述 / Description
   ----------------------------- | ---------------------------- | ---------- | -------       | -----------------------------------------------------------------------------------------
   onProgress(swiper, progress)  | swiping(progress)            | Function   | noop          | invoked while swiping with the percentage (0-1) of the full width that has been swiped.
   onSlideChangeEnd(swiper)      | callback(index, elem)        | Function   | noop          | runs at slide change(改变即触发).
   onTransitionEnd(swiper)       | transitionEnd(index, elem)   | Function   | noop          | sruns at the end slide transition(改变并且动画完毕后触发, 实际比callback晚点).
   *
   *
   实例方法 / Methods                         | 原始名称 / Original        | 描述 / Description
   ---------------------------------------|------------------------|-----------------------------------------------------------------------------
   slidePrev(runCallbacks, speed)         | prev()                 | slide to prev
   slideNext(runCallbacks, speed)         | next()                 | slide to next
   mySwiper.activeIndex                   | getPos()               | returns current slide index position(返回当前的index)
   mySwiper.slides.length                 | getNumSlides()         | returns the total amount of slides(返回轮播子页面的个数)
   slideTo(index, duration, runCallbacks) | slide(index, duration) | slide to set index position (duration: speed of transition in milliseconds)
   stopAutoplay()                         | stop()                 | 停止自动滚动
   destroy()                              | kill()                 | 移除销毁
   *
   *
   * @demo #/slides-lite
   * @see https://github.com/voronianski/swipe-js-iso
   * */
  import Swipe from 'swipe-js-iso'

  export default {
    name: 'Slides',
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

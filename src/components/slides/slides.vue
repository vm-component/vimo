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
<script type="text/javascript">
  import { getEvents, getProps } from './interface'

  const Swiper = require('swiper')

  export default {
    name: 'Slides',
    provide () {
      const _this = this
      return {
        slidesComponent: _this
      }
    },
    props: getProps(),
    data () {
      return {
        timer: null,            // 子组件注册的计时器
        swiper: null,           // Swiper插件的实例
        id: this._uid,          // 当前组件的id
        init: false             // 是否初始化
      }
    },
    computed: {
      slideId () {
        return 'slides-' + this.id
      },
      // 指示标志的class
      paginationClass () {
        if (this.pagination[0] === '.') {
          return this.pagination.substr(1)
        } else {
          console.error('The props of pagination in Slides component need dot in front, like `.swiper-pagination`. ')
          return null
        }
      },
      nextButtonClass () {
        if (this.nextButton[0] === '.') {
          return this.nextButton.substr(1)
        } else {
          console.error('The props of nextButton in Slides component need dot in front, like `.swiper-button-next`. ')
          return null
        }
      },
      prevButtonClass () {
        if (this.prevButton[0] === '.') {
          return this.prevButton.substr(1)
        } else {
          console.error('The props of prevButton in Slides component need dot in front, like `.swiper-button-prev`. ')
          return null
        }
      },
      scrollbarClass () {
        if (this.scrollbar[0] === '.') {
          return this.scrollbar.substr(1)
        } else {
          console.error('The props of scrollbar in Slides component need dot in front, like `.swiper-scrollbar`. ')
          return null
        }
      }
    },
    methods: {
      /**
       * 初始化swiper
       * @private
       * */
      initSlides () {
        this.timer && window.clearTimeout(this.timer)
        this.timer = window.setTimeout(() => {
          if (!this.init) {
            // 未初始化则创建实例
            this.swiper = new Swiper(this.$el, Object.assign({}, this.$options.propsData, getEvents(this)))
            this.init = true
          } else {
            // 已创建实例, 则更新实例
            this.swiper && this.swiper.update(true)
          }
        }, 0)
      }
    },
    destroyed () {
      this.swiper && this.swiper.destroy()
    }
  }
</script>

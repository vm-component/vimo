<template>
    <Page>
        <Content padding class="outer-content ">
            <section slot="fixedTop" class="previewImage">
                <transition name="previewImage">
                    <div class="previewImage__inner" v-show="images.length>0">
                        <p text-center class="info">{{activeIndex + 1}} / {{images.length}}</p>
                        <Slides class="slides"
                                :preloadImages="false"
                                :lazyLoading="true"
                                :initialSlide="activeIndex"
                                :zoom="true"
                                @onClick="onClickHandler"
                                @onSlideChangeEnd="onSlideChangeEndHandler">
                            <Slide class="slide" v-for="(item,index) in images" :key="index">
                                <img :data-src="item" class="swiper-lazy">
                                <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                            </Slide>
                        </Slides>
                    </div>
                </transition>
            </section>
        </Content>
    </Page>
</template>
<style lang="scss">
    .previewImage-enter-active, .previewImage-leave-active {
        transition: opacity 300ms
    }

    .previewImage-enter, .previewImage-leave-active {
        opacity: 0
    }

    .previewImage {
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        .previewImage__inner {
            width: 100%;
            height: 100%;
            .slides {
                height: 100%;
                width: 100%;
                .slide {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                        width: 100%;
                    }
                }
            }
            .info {
                position: fixed;
                bottom: 30px;
                width: 100%;
                text-align: center;
                color: #fff;
                margin: 0;
                font-weight: bold;
                z-index: 10;
            }
        }
    }
</style>
<script type="text/javascript">
  // 不适用lite是因为其不支持图片懒加载
  import { Slides, Slide } from 'vimo/components/slides'
  export default{
    name: 'PreviewImage',
    data () {
      return {
        selected: '',
        images: [],
        activeIndex: 0 // initIndex
      }
    },
    methods: {
      onSlideChangeEndHandler (instance) {
        this.activeIndex = instance.activeIndex
        this.selected = this.images[this.activeIndex]
      },
      onClickHandler () {
        this.$modal.dismiss()
      }
    },
    created () {
      this.images = this.$options.$data.urls
      this.activeIndex = this.$options.$data.current
      this.selected = this.images[this.activeIndex]
    },
    components: {Slides, Slide}
  }
</script>

<template>
    <Page>
        <Content padding class="outer-content ">
            <section slot="fixedTop" class="albumBox" @click="onTapHandler">
                <transition name="fade">
                    <div class="albumBox__inner" v-show="imgs.length>0">
                        <p text-center class="info">{{activeIndex + 1}} / {{imgs.length}}</p>
                        <Slides class="slides" :preloadImages="false" :lazyLoading="true"
                                @onSlideChangeEnd="onSlideChangeEndHandler">
                            <Slide class="slide" v-for="(item,index) in imgs" :key="index">
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
<style scoped lang="scss">
    .fade-enter-active, .fade-leave-active {
        transition: opacity 300ms
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }

    .albumBox {
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        .albumBox__inner {
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
  import { Slides, Slide } from 'vimo/components/slides'
  export default{
    name: 'previewImage',
    data () {
      return {
        selected: '',
        imgs: [],
        activeIndex: 0
      }
    },
    methods: {
      onSlideChangeEndHandler (instance) {
        this.activeIndex = instance.activeIndex
        this.selected = this.imgs[this.activeIndex]
      },
      onTapHandler () {
        this.$modal.dismiss()
      }
    },
    created () {
      window.setTimeout(() => {
        this.imgs = this.$options.$data.img
        this.selected = this.imgs[this.activeIndex]
      }, 100)
    },
    components: {Slides, Slide}
  }
</script>

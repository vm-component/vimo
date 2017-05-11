<template>
    <Page>
        <Content padding class="outer-content ">
            <section slot="fixedTop" class="albumBox">
                <div class="albumBox__inner">
                    <Slides class="slides" @onTap="onTapHandler"
                            @onSlideChangeEnd="onSlideChangeEndHandler">
                        <Slide class="Slide" v-for="(item,index) in imgs" :key="index">
                            <img :src="item">
                        </Slide>
                    </Slides>
                    <p text-center class="info">{{selected}}</p>
                </div>
            </section>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .albumBox {
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        .albumBox__inner {
            margin-bottom: 80px;
            height: 250px;
            width: 100%;
            .slides {
                height: 100%;
                width: 100%;
                .Slide {
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
                height: 30px;
                color: #fff;
            }
        }
    }
</style>
<script type="text/javascript">

  import { Slides, Slide } from 'vimo/components/slides'
  export default{
    name: 'name',
    data () {
      return {
        selected: '',
        imgs: []
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      onSlideChangeEndHandler (instance) {
        this.selected = this.imgs[instance.activeIndex]
      },
      onTapHandler () {
        this.$modal.dismiss()
      }
    },
    created () {
      this.imgs = this.$options.$data.img
      this.selected = this.imgs[0]
    },
    mounted () {
    },
    activated () {},
    components: {Slides, Slide},
    destroyed () {}
  }
</script>

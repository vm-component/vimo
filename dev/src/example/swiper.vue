<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Swiper</Title>
            </Navbar>
        </Header>
        <Content>
            <h4>Swiper组件</h4>
            <Slides class="swiper" effect="cube" :zoom="true" v-for="(item, index) in data" ref="mySwiperA" :key="index"
                    @onInit="onInit">
                <!-- 幻灯内容 -->
                <Slide class="slide" v-for="(img,index) in item" :key="index"><img :src="img"></Slide>
                <!-- ... -->
                <!-- 以下控件元素均为可选（使用具名slot来确定并应用一些操作控件元素） -->
                <div class="swiper-pagination" slot="pagination"></div>
            </Slides>
        </Content>
    </Page>
</template>

<style scoped lang="scss">
    .swiper {
        height: 200px;
        .slide {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #eee;
        }
    }
</style>
<script type="text/ecmascript-6">
  import { Slides, Slide } from 'vimo/components/slides'

  export default{
    name: 'name',
    data(){
      return {
        lastOne: 1,
        data: [],
        data1: [
          ['static/1.jpg', 'static/3.jpg', 'static/4.jpg'],
          ['static/5.jpg', 'static/6.jpg', 'static/7.jpg'],
          ['static/8.jpg', 'static/9.jpg', 'static/1.jpg'],
        ],
        data2: [
          ['static/5.jpg', 'static/6.jpg', 'static/7.jpg'],
          ['static/8.jpg', 'static/9.jpg', 'static/1.jpg'],
          ['static/1.jpg', 'static/3.jpg', 'static/4.jpg'],
        ],
        data3: [
          ['static/8.jpg', 'static/9.jpg', 'static/1.jpg'],
          ['static/1.jpg', 'static/3.jpg', 'static/4.jpg'],
          ['static/5.jpg', 'static/6.jpg', 'static/7.jpg'],
        ],
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiperA
      }
    },
    methods: {
      onInit(ins){
      }
    },
    created () {
      const _this = this;
      _this.data = _this.data1
    },
    mounted () {},
    activated () {},
    components: {Slides, Slide}
  }
</script>

<template>
    <Page>
        <Header>
            <Navbar>
                <Title>手势切换</Title>
            </Navbar>
            <Toolbar>
                <!--content-->
                <Segment v-model="fruit">
                    <SegmentButton value="apple">Apple</SegmentButton>
                    <SegmentButton value="orange">Orange</SegmentButton>
                    <SegmentButton value="pear">Pear</SegmentButton>
                </Segment>
            </Toolbar>
        </Header>
        <Content class="outer-content">
            <Slides ref="slides" :resistanceRatio="0"
                    @onSlideChangeEnd="onSlideChangeEndHandler">
                <!-- 幻灯内容 -->
                <Slide padding class="slide">
                    <!--content_1-->
                    <section class="content_1">
                        <strong>手势切换其实是Segment组件和Slides组件的结合</strong>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut culpa labore laborum magni qui quo sed voluptatibus! Aliquam doloremque eveniet facilis nam odio quisquam sequi totam veniam voluptate voluptatem. Ea.
                        </p>
                        <h2>dolorem</h2>
                        <img src="./img/apple_1.jpeg">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias eaque laborum nulla numquam perferendis, voluptatibus. Blanditiis, dolorem et, ex fugiat ipsam laboriosam laudantium maiores omnis quas quia sequi, tenetur?</p>
                        <img src="./img/apple_2.jpeg">
                        <h2>Lorem</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam assumenda autem corporis et eveniet explicabo iusto magnam nihil numquam quae quasi, sunt vitae! Assumenda ducimus natus nihil rem saepe?</p>
                        <img src="./img/apple_3.jpeg">
                        <h2>amet</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius numquam odit quia sed sint! Debitis dolore ducimus eaque expedita id tempora voluptas? Ad aperiam esse excepturi illum quibusdam sit totam.</p>
                    </section>
                </Slide>
                <Slide padding class="slide">
                    <!--content_2-->
                    <section class="content_2">
                        <strong>手势切换其实是Segment组件和Slides组件的结合</strong>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi cum et ex facilis mollitia nesciunt omnis suscipit ullam. Ab at delectus deserunt, doloribus ex nihil praesentium quibusdam reiciendis ullam voluptatibus?</p>
                        <img src="./img/orange_1.jpeg">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, autem deserunt dicta dolores ducimus eligendi et excepturi fugit hic in incidunt ipsa laudantium molestias porro quae quis quisquam, sit unde.
                        </p>
                        <img src="./img/orange_2.jpeg">
                        <img src="./img/orange_3.jpeg">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto commodi cupiditate expedita facilis hic in ipsam laborum magni natus omnis quas quasi quis, rerum sint suscipit tempore temporibus totam!</p>
                    </section>
                </Slide>
                <Slide padding class="slide">
                    <!--content_3-->
                    <section class="content_3">
                        <strong>手势切换其实是Segment组件和Slides组件的结合</strong>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A at aut ea eos esse est itaque iure, iusto, libero nam nostrum pariatur quasi quibusdam quis sed sequi tenetur vel veniam.</p>
                        <img src="./img/pear_1.jpeg">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aspernatur ipsam necessitatibus sequi suscipit tenetur voluptate. Amet culpa ducimus eum magnam perspiciatis quasi quis recusandae repellat, soluta unde velit veniam.</p>
                        <img src="./img/pear_2.jpeg">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis dicta ducimus error facere laborum molestias nisi numquam odit officiis perspiciatis possimus quia rerum sunt tempore totam veritatis, voluptas voluptatum?</p>
                        <img src="./img/pear_3.jpeg">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam autem cupiditate, debitis expedita in ipsam iste laudantium, maiores nesciunt nulla officiis quae recusandae rerum suscipit? Nemo quo unde voluptate.</p>
                    </section>
                </Slide>
                <!-- ... -->
            </Slides>
        </Content>
    </Page>
</template>
<style scoped lang="less">
    .slide {
        overflow: scroll;
    }
</style>
<script type="text/javascript">
  export default {
    name: 'WithSwiper',
    data () {
      return {
        fruit: 'apple',
        dir: ['apple', 'orange', 'pear']
      }
    },
    watch: {
      fruit () {
        this.swiperInstance.slideTo(this.dir.indexOf(this.fruit))
      }
    },
    computed: {
      swiperInstance () {
        return this.$refs.slides.swiper
      }
    },
    methods: {
      onSlideChangeEndHandler (swiper) {
        this.fruit = this.dir[swiper.activeIndex]
      }
    }
  }
</script>

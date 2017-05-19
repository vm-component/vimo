<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Slides-Lite</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">

            <Slides class="slides">
                <Slide class="slide">0</Slide>
                <Slide class="slide">1</Slide>
                <Slide class="slide">2</Slide>
                <Slide class="slide">3</Slide>
            </Slides>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .slides {
        width: 100%;
        min-width: 285px;
        height: 190px;
        margin: 20px auto;
        .slide {
            text-align: center;
            font-size: 18px;
            background: #fff;

            /* Center slide text vertically */
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
            border: 1px solid #ddd;
        }
        .black {
            background: #000;
        }
    }
</style>
<script type="text/javascript">
  import { Slides, Slide } from 'vimo/components/slides-lite'
  export default{
    components: {Slides, Slide},
    data () {
      return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {}

  }
</script>

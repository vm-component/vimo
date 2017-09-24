<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Title</Title>
            </Navbar>
        </Header>
        <Content class="outer-content" :fullscreen="true">
            <img class="imgBox" src="./img/1.jpg" :style="{'transform':'scale('+scaleValue+')'}">
            <Scroll slot="fixedTop" class="scrollBox" @scroll="onScrollHandler" :probeType="3">
                <div class="scrollBox__inner">
                    <div class="scrollBox__content">
                        <h1>Title</h1>
                        <h5>Section</h5>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus et eum labore laborum quos. Architecto, blanditiis ducimus eaque laboriosam, molestias mollitia nihil nulla odio quaerat ratione rerum saepe! Dolore, quos.</p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus et eum labore laborum quos. Architecto, blanditiis ducimus eaque laboriosam, molestias mollitia nihil nulla odio quaerat ratione rerum saepe! Dolore, quos.</p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus et eum labore laborum quos. Architecto, blanditiis ducimus eaque laboriosam, molestias mollitia nihil nulla odio quaerat ratione rerum saepe! Dolore, quos.</p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus et eum labore laborum quos. Architecto, blanditiis ducimus eaque laboriosam, molestias mollitia nihil nulla odio quaerat ratione rerum saepe! Dolore, quos.</p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus et eum labore laborum quos. Architecto, blanditiis ducimus eaque laboriosam, molestias mollitia nihil nulla odio quaerat ratione rerum saepe! Dolore, quos.</p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus et eum labore laborum quos. Architecto, blanditiis ducimus eaque laboriosam, molestias mollitia nihil nulla odio quaerat ratione rerum saepe! Dolore, quos.</p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus et eum labore laborum quos. Architecto, blanditiis ducimus eaque laboriosam, molestias mollitia nihil nulla odio quaerat ratione rerum saepe! Dolore, quos.</p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus et eum labore laborum quos. Architecto, blanditiis ducimus eaque laboriosam, molestias mollitia nihil nulla odio quaerat ratione rerum saepe! Dolore, quos.</p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus et eum labore laborum quos. Architecto, blanditiis ducimus eaque laboriosam, molestias mollitia nihil nulla odio quaerat ratione rerum saepe! Dolore, quos.</p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus et eum labore laborum quos. Architecto, blanditiis ducimus eaque laboriosam, molestias mollitia nihil nulla odio quaerat ratione rerum saepe! Dolore, quos.</p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus et eum labore laborum quos. Architecto, blanditiis ducimus eaque laboriosam, molestias mollitia nihil nulla odio quaerat ratione rerum saepe! Dolore, quos.</p>
                    </div>
                </div>
            </Scroll>
        </Content>
    </Page>
</template>
<style scoped lang="less">
    .scrollBox {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        .scrollBox__inner {
            padding: 170px 0;
            .scrollBox__content {
                padding: 16px;
                background: #fff;
            }
        }
    }
</style>
<script type="text/javascript">
  export default{
    name: 'user-center',
    data () {
      return {
        scaleValue: 1,
        y: 0,
        max: this.$platform.height() * 0.3
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      onScrollHandler (ev) {
        this.y = ev.y >> 0
        let p = 1 - Math.abs(this.max - this.y) / this.max
        if (p > 0) {
          this.scaleValue = (1 + p * 0.2)
        }
      }
    },
    created () {},
    mounted () {},
    activated () {},
    destroyed () {}
  }
</script>

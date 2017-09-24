<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Animate切换</Title>
            </Navbar>
            <Toolbar>
                <!--content-->
                <Segment v-model="fruit" @onChange="onChangeHandler">
                    <SegmentButton value="apple" @onSelect="onSelectHandler">Apple</SegmentButton>
                    <SegmentButton value="orange" @onSelect="onSelectHandler">Orange</SegmentButton>
                    <SegmentButton value="pear" @onSelect="onSelectHandler">Pear</SegmentButton>
                </Segment>
            </Toolbar>
        </Header>
        <Content padding class="outer-content" ref="content">
            <section class="transitionBox">
                <transition name="animate">
                    <!--content_1-->
                    <section class="content_1" v-if="fruit==='apple'">
                        <strong>这里的动画使用的是Vue原生的"transition"组件完成, 目前实现的效果是单向移动渐变动画.</strong>
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
                </transition>
                <transition name="animate">
                    <!--content_2-->
                    <section class="content_2" v-if="fruit==='orange'">
                        <strong>这里的动画使用的是Vue原生的"transition"组件完成, 目前实现的效果是单向移动渐变动画.</strong>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi cum et ex facilis mollitia nesciunt omnis suscipit ullam. Ab at delectus deserunt, doloribus ex nihil praesentium quibusdam reiciendis ullam voluptatibus?</p>
                        <img src="./img/orange_1.jpeg">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, autem deserunt dicta dolores ducimus eligendi et excepturi fugit hic in incidunt ipsa laudantium molestias porro quae quis quisquam, sit unde.
                        <img src="./img/orange_2.jpeg">
                        <img src="./img/orange_3.jpeg">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto commodi cupiditate expedita facilis hic in ipsam laborum magni natus omnis quas quasi quis, rerum sint suscipit tempore temporibus totam!</p>
                    </section>
                </transition>
                <transition name="animate">
                    <!--content_3-->
                    <section class="content_3" v-if="fruit==='pear'">
                        <strong>这里的动画使用的是Vue原生的"transition"组件完成, 目前实现的效果是单向移动渐变动画.</strong>
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
                </transition>
            </section>
        </Content>
    </Page>
</template>
<style scoped lang="less">
    .transitionBox {
        position: relative;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        .content_1, .content_2, .content_3 {
            border: 1px solid transparent;
        }
    }

    // 路由切换动画
    .animate-enter-active, .animate-leave-active {
        transition: transform .5s ease, opacity .5s ease;
        opacity: 1;
        position: absolute;
    }

    .animate-enter {
        opacity: 0;
        position: absolute;
        transform: translate(10%, 0);
        z-index: 999;
    }

    .animate-leave-active {
        opacity: 0;
        transform: translate(-10%, 0);
        position: absolute;
        z-index: 0;
    }
</style>
<script type="text/javascript">
  export default{
    name: 'Animate',
    data () {
      return {
        fruit: 'apple'
      }
    },
    watch: {
      fruit () {
        this.contentComponent.scrollToTop(0)
      }
    },
    computed: {
      contentComponent () {
        return this.$refs.content
      }
    },
    methods: {
      onChangeHandler (val) {
        console.debug('当前的Segment值发生变化: ' + val)
      },
      onSelectHandler (val) {
        console.debug('点击了SegmentButton按钮, 这个按钮的值: ' + val)
      }
    },
    created () {},
    mounted () {},
    activated () {}
  }
</script>

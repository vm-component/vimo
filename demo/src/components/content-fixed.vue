<template>
    <Page>
        <Header>
            <Navbar>
                <Title>流式布局</Title>
            </Navbar>
        </Header>
        <Content class="outer-content" padding ref="content">
            <div slot="fixed-top" padding class="fixedContent fixedTop0">
                <strong>业务有需求将部分内容固定到顶部或者固定到底部, 这部分固定内容不随页面的滚动而移动, 就像这样.</strong>
            </div>
            <div slot="fixed-top" padding class="fixedContent fixedTop">
                <strong>或者固定到页面的某个位置. 这部分使用的都是slot属性: fixed(默认在上)/fixed-top/fixed-bottom </strong>
            </div>
            <article>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
            </article>
            <!--Button-->
            <Button block @click="scrollToBottom">滚动到底部</Button>
            <article>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
            </article>
            <Button block @click="scrollToTop">滚动到顶部</Button>
            <article>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor
                    ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
            </article>
            <div slot="fixed-bottom" padding class="fixedContent ">
                <strong>业务有需求将部分内容固定到顶部或者固定到底部, 这部分固定内容不随页面的滚动而移动, 就像这样.</strong>
            </div>
        </Content>
        <Footer>
            <Toolbar><Title>This is a Footer</Title></Toolbar>
        </Footer>
    </Page>
</template>
<style scoped lang="scss">
    .fixedContent {
        height: 72px;
        background: rgba(255, 125, 196, 0.95);
    }

    .fixedTop {
        top: 72px;
        background: rgba(145, 255, 191, 0.95);
    }

    .fixedBottom {
        bottom: 72px;
        background: rgba(145, 255, 191, 0.95);
    }
</style>
<script type="text/javascript">
  export default {
    name: 'name',
    data () {
      return {}
    },
    props: {},
    watch: {},
    computed: {
      content () {
        return this.$refs.content
      }
    },
    methods: {
      scrollToBottom () {
        this.content.scrollToBottom()
      },
      scrollToTop () {
        this.content.scrollToTop()
      }
    },
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {}
  }
</script>

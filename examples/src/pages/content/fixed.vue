<template>
    <Page>
        <Header>
            <Navbar>
                <Title>固定内容</Title>
            </Navbar>
        </Header>
        <Content class="outer-content" padding>

            <div slot="fixed" padding class="fixedContent">
                <strong>业务有需求将部分内容固定到顶部或者固定到底部, 这部分固定内容不随页面的滚动而移动, 就像这样.</strong>
            </div>


            <div slot="fixedTop" padding class="fixedContent fixedTop">
                <strong>或者固定到页面的某个位置. 这部分使用的都是slot属性: fixed(默认在上)/fixedTop/fixedBottom </strong>
            </div>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>


            <div slot="fixedBottom" padding class="fixedContent">
                <strong>业务有需求将部分内容固定到顶部或者固定到底部, 这部分固定内容不随页面的滚动而移动, 就像这样.</strong>
            </div>
        </Content>
    </Page>
</template>
<style scoped lang="less">
    .fixedContent {
        background: rgba(256, 256, 256, 0.95);

    }

    .fixedTop {
        top: 150px;
        background: rgba(145, 255, 191, 0.95);
    }
</style>
<script type="text/javascript">
  export default{
    name: 'name',
    data () {
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {}
  }
</script>

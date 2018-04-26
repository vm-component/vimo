<template>
    <Page box>
        <Header>
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content class="outer-content" padding ref="content">
            <div slot="fixed-top" padding class="fixedContent fixedTop">
                <strong>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci amet autem consectetur cupiditate dolorem dolorum excepturi
                        laborum molestias nesciunt, pariatur perferendis porro qui quis sapiente sed sunt totam ullam.</strong>
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
            <Button block @click="scrollToBottom">{{$t('scrollToBottom')}}</Button>
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
            <Button block @click="scrollToTop">{{$t('scrollToTop')}}</Button>
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
                <strong>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias eius explicabo impedit inventore magni, nulla numquam odio odit omnis
                        possimus quia quisquam rerum sapiente temporibus totam unde vel velit veniam?</strong>
            </div>
        </Content>
        <Footer>
            <Toolbar><Title>{{$t('notice')}}</Title></Toolbar>
        </Footer>
    </Page>
</template>
<style scoped lang="scss">
    .fixedContent {
        /*height: 72px;*/
        background: rgba(255, 125, 196, 0.95);
    }

    .fixedTop {
        /*top: 72px;*/
        background: rgba(145, 255, 191, 0.95);
    }

    .fixedBottom {
        /*bottom: 72px;*/
        background: rgba(145, 255, 191, 0.95);
    }
</style>
<script type="text/javascript">
  export default {
    name: 'DemoBox',
    i18n: {
      messages: {
        'zh-CN': {
          title: '盒子布局',
          scrollToBottom: '滚动到底部',
          scrollToTop: '滚动到顶部',
          notice: '这个是Footer'
        },
        'en-US': {
          title: 'BoxLayout',
          scrollToBottom: 'Scroll To Bottom',
          scrollToTop: 'Scroll To Top',
          notice: 'This is a Footer'
        }
      }
    },
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
    }
  }
</script>

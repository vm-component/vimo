<template>
    <Page>
        <Header>
            <Navbar>
                <Title>{{$t('title')}}</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <p>{{$t('noticeInfo1')}}</p>
            <Button block @click="openIndicatorInfinity">Open infinity(max 10s)</Button>
            <Button block @click="openIndicator1000">Open 1000ms</Button>
            <Button block @click="openIndicatorReverse1000">Open 1000ms In Reverse Color</Button>
            <Button block @click="openIndicator300">Open 300ms</Button>
            <Button block @click="openIndicator100">Open 100ms</Button>
            <Button block @click="openIndicator70">Open 70ms</Button>
            <p>{{$t('noticeInfo2')}}</p>
            <Button block @click="openIndicator50">Open 50ms</Button>
            <Button block @click="openIndicator5">Open 5ms</Button>
            <p>{{$t('noticeInfo3')}}</p>
            <Button block @click="special">Special</Button>

            <article>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eaque eos et ex facilis ipsam mollitia obcaecati officiis omnis
                    perferendis sed, tempore velit voluptates? Aperiam cupiditate debitis provident quis quo.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eaque eos et ex facilis ipsam mollitia obcaecati officiis omnis
                    perferendis sed, tempore velit voluptates? Aperiam cupiditate debitis provident quis quo.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eaque eos et ex facilis ipsam mollitia obcaecati officiis omnis
                    perferendis sed, tempore velit voluptates? Aperiam cupiditate debitis provident quis quo.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eaque eos et ex facilis ipsam mollitia obcaecati officiis omnis
                    perferendis sed, tempore velit voluptates? Aperiam cupiditate debitis provident quis quo.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eaque eos et ex facilis ipsam mollitia obcaecati officiis omnis
                    perferendis sed, tempore velit voluptates? Aperiam cupiditate debitis provident quis quo.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eaque eos et ex facilis ipsam mollitia obcaecati officiis omnis
                    perferendis sed, tempore velit voluptates? Aperiam cupiditate debitis provident quis quo.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eaque eos et ex facilis ipsam mollitia obcaecati officiis omnis
                    perferendis sed, tempore velit voluptates? Aperiam cupiditate debitis provident quis quo.</p>
            </article>
        </Content>
    </Page>
</template>

<script type="text/javascript">
  export default {
    name: 'DemoIndicator',
    i18n: {
      messages: {
        'zh-CN': {
          title: '指示器',
          noticeInfo1: 'Loading的简单版, 用于无提示的Loading使用场景, 且开启最多存在10s, 10s后自动关闭. 如果路由切换则关闭组件',
          noticeInfo2: '70ms期间执行dismiss则不再显示Indicator',
          noticeInfo3: 'present和dismiss乱序调用'
        },
        'en-US': {
          title: 'Indicator',
          noticeInfo1: 'A simple version of Loading, used for silent loading scenarios, with up to 10 seconds on, and off automatically after 10 seconds. If the route is switched, the component is closed.',
          noticeInfo2: 'Dismiss the indicator no longer appears during 70ms',
          noticeInfo3: 'Present and dismiss out of order calls'
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      special () {
        this.$indicator.present()
        this.$indicator.present()
        this.$indicator.present()
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 20)
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 100)
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 200)

        setTimeout(() => {
          this.$indicator.present()
        }, 200)
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 400)
      },
      openIndicatorInfinity () {
        this.$indicator.present()
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 10000)
      },

      openIndicator1000 () {
        this.$indicator.present()
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 1000)
      },

      openIndicatorReverse1000 () {
        this.$indicator.present(true)
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 1000)
      },

      openIndicator300 () {
        this.$indicator.present()
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 300)
      },

      openIndicator100 () {
        this.$indicator.present()
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 100)
      },
      openIndicator70 () {
        this.$indicator.present()
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 70)
      },
      openIndicator50 () {
        this.$indicator.present()
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 50)
      },
      openIndicator5 () {
        this.$indicator.present()
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 5)
      }
    }
  }
</script>

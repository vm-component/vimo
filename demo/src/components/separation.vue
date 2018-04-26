<template>
    <Page>
        <Header>
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <p><strong>Demo:</strong></p>
            <Separation>
                <Icon name="logo-chrome" small></Icon>
                <span>I Love Chrome</span>
            </Separation>
            <Separation>
                <Icon name="logo-javascript" small></Icon>
                <span>Hello JS</span>
            </Separation>
            <Separation>
                <Icon name="heart" color="danger" small></Icon>
                <span>{{$t('youLike')}}</span>
            </Separation>
            <Separation>
                <Icon name="flame" color="danger" small></Icon>
                <span>{{$t('hot')}}</span>
            </Separation>
            <Separation>
                <Icon name="text" small></Icon>
                <span>{{$t('end')}}</span>
            </Separation>
            <Separation>{{$t('share')}}</Separation>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'DemoSeparation',
    i18n: {
      messages: {
        'zh-CN': {
          title: '分割段',
          youLike: '猜你喜欢',
          hot: '热门推荐',
          end: '亲, 看完了',
          share: '分享'
        },
        'en-US': {
          title: 'Separation',
          youLike: 'You may also like',
          hot: 'Hot recommendation',
          end: 'The end',
          share: 'Share'
        }
      }
    }
  }
</script>

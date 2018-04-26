<template>
    <Page>
        <Header>
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>Demo</ListHeader>
                <Item detail-push :to="{name:'segmentNormal'}">{{$t('segmentNormal')}}</Item>
                <Item detail-push :to="{name:'segmentAnimate'}">{{$t('segmentAnimate')}}</Item>
                <Item detail-push :to="{name:'segmentWithSwiper'}">{{$t('segmentWithSwiper')}}</Item>
                <Item detail-push :to="{name:'segmentAsync'}">{{$t('segmentAsync')}}</Item>
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'DemoSegment',
    i18n: {
      messages: {
        'zh-CN': {
          title: '小标签',
          segmentNormal: '普通用法',
          segmentAnimate: '使用animate切换',
          segmentWithSwiper: '小标使用手势切换签',
          segmentAsync: '异步加载组件'
        },
        'en-US': {
          title: 'Segment',
          segmentNormal: 'General usage',
          segmentAnimate: 'Use animate',
          segmentWithSwiper: 'Gesture switching',
          segmentAsync: 'Async loading'
        }
      }
    }
  }
</script>

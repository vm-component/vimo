<template>
    <Page>
        <Header>
            <Navbar>
                <Title>{{$t('title')}}</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>Demo</ListHeader>
                <Item detail-push :to="{name:'scrollNormal'}">{{$t('scrollNormal')}}</Item>
                <Item detail-push :to="{name:'scrollCity'}">{{$t('scrollCity')}}</Item>
                <!--<Item detail-push :to="{name:'userCenterScroll'}">用户中心</Item>-->
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'DemoScroll',
    i18n: {
      messages: {
        'zh-CN': {
          title: '滚动',
          scrollNormal: '简单示例',
          scrollCity: '城市列表'

        },
        'en-US': {
          title: 'Scroll',
          scrollNormal: 'Normal Scroll',
          scrollCity: 'City Scroll'
        }
      }
    }
  }
</script>

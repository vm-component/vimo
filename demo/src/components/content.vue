<template>
    <Page>
        <Header>
            <Navbar>
                <Title ref="title">Page</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>Demo</ListHeader>
                <Item detail-push :to="{name:'contentContext'}">{{$t('contentContext')}}</Item>
                <!--<Item detail-push :to="{name:'contentFixed'}">流式布局</Item>-->
                <Item detail-push :to="{name:'contentBox'}">{{$t('contentBox')}}</Item>
                <Item detail-push :to="{name:'contentHideBars'}">{{$t('contentHideBars')}}</Item>
                <Item detail-push :to="{name:'contentSetBarStyle'}">{{$t('contentSetBarStyle')}}</Item>
                <Item detail-push :to="{name:'contentScroll'}">{{$t('contentScroll')}}</Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss"></style>
<script type="text/javascript">
  export default {
    name: 'DemoPage',
    i18n: {
      messages: {
        'zh-CN': {
          contentContext: '文本',
          contentBox: '盒子布局',
          contentHideBars: '隐藏头尾Bar',
          contentSetBarStyle: '设置Bar的样式',
          contentScroll: '滚动监听'
        },
        'en-US': {
          contentContext: 'Context',
          contentBox: 'Box Layout',
          contentHideBars: 'Hide Bars',
          contentSetBarStyle: 'Set Bar Style',
          contentScroll: 'Content Scroll'
        }
      }
    }
  }
</script>

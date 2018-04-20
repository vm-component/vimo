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
                <Item detail-push :to="{name:'inputNormal'}">{{$t('inputNormal')}}</Item>
                <Item detail-push :to="{name:'inputValid'}">{{$t('inputValid')}}</Item>
                <Item detail-push :to="{name:'inputLimit'}">{{$t('inputLimit')}}</Item>
                <Item detail-push :to="{name:'inputEvent'}">{{$t('inputEvent')}}</Item>
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'InputDemo',
    i18n: {
      messages: {
        'zh-CN': {
          title: '输入',
          inputNormal: '普通用法',
          inputValid: '输入验证',
          inputLimit: '输入限制',
          inputEvent: '输入事件'
        },
        'en-US': {
          title: 'Input',
          inputNormal: 'Normal',
          inputValid: 'Valid',
          inputLimit: 'Limit',
          inputEvent: 'Event'
        }
      }
    }
  }
</script>

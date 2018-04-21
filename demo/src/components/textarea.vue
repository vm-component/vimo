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
                <Item detail-push :to="{name:'textareaNormal'}">{{$t('textareaNormal')}}</Item>
                <Item detail-push :to="{name:'textareaEvent'}">{{$t('textareaEvent')}}</Item>
                <Item detail-push :to="{name:'textareaValid'}">{{$t('textareaValid')}}</Item>
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'DemoTextarea',
    i18n: {
      messages: {
        'zh-CN': {
          title: '输入框',
          textareaNormal: '普通用法',
          textareaValid: '输入验证',
          textareaEvent: '输入事件'
        },
        'en-US': {
          title: 'Textarea',
          textareaNormal: 'Normal',
          textareaValid: 'Valid',
          textareaEvent: 'Event'
        }
      }
    }
  }
</script>

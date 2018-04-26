<template>
    <Page>
        <Header>
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content>
            <List>
                <ListHeader>
                    <span>Demo(Need Check)</span>
                </ListHeader>
                <Item>
                    <Label stacked color="primary">Address</Label>
                    <Textarea placeholder="Required..." showFocusHighlight required></Textarea>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  // TODO: 需要完善这个示例
  export default {
    name: 'DemoTextareaValid',
    i18n: {
      messages: {
        'zh-CN': {
          title: '输入验证'
        },
        'en-US': {
          title: 'Valid'
        }
      }
    },
    data () {
      return {
        testValue: 'hello',
        testDisabled: false
      }
    }
  }
</script>

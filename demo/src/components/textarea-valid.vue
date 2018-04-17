<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Valid</Title>
            </Navbar>
        </Header>
        <Content>
            <List>
                <ListHeader>
                    <span>必填验证</span>
                </ListHeader>
                <Item>
                    <Label stacked color="primary">地址</Label>
                    <Textarea placeholder="Required..." showFocusHighlight required></Textarea>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'InputDemo',
    data () {
      return {
        testValue: 'hello',
        testDisabled: false
      }
    }
  }
</script>

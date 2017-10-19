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
                    <span>输入验证</span>
                </ListHeader>
                <Item>
                    <Label color="primary">昵称</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           @onInvalid="onInvalidHandler('输入的昵称有误, 前检查!')"
                           placeholder="中英文字母、数字、'-'、'_'组成"
                           type="nickName" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">整数</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入整数" type="integer" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">电话</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入电话" type="tel" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">url</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入url" type="url" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">手机号</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入手机号" type="mobile" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">邮箱</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入邮箱" type="email" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">密码</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="密码需6-18位，以字母开头可含数字" type="password" check></Input>
                </Item>
                <Item>
                    <Label color="primary">身份证</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入身份证号码" type="idCard" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">验证码</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入至少4位" type="securityCode" check clearInput></Input>
                    <span slot="item-right">*验证码*</span>
                </Item>
                <Item>
                    <Label color="primary">中文</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入中文" type="cn" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">QQ号</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入QQ号" type="qq" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">自定义数字格式</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="XX-XX-XXX格式" type="text" check :regex=/\d{2}-\d{2}-\d{3}/ clear-input></Input>
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
    },
    methods: {
      onInvalidHandler (msg) {
        this.$toast(msg)
      }
    }
  }
</script>

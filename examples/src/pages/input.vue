<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Input</Title>
            </Navbar>
        </Header>
        <Content>

            <List>
                <ListHeader>
                    <span>Input</span>
                </ListHeader>
                <Item>
                    <Label color="primary">Inline Label</Label>
                    <Input placeholder="Text Input"></Input>
                </Item>
                <Item>
                    <Label color="primary" fixed>Fixed Label with fixed width</Label>
                    <Input type="tel" placeholder="Tel Input"></Input>
                </Item>
                <Item>
                    <Input type="number" placeholder="Number Input with no label"></Input>
                </Item>

                <Item>
                    <Label color="primary" stacked>Stacked Label</Label>
                    <Input type="email" placeholder="Email Input"></Input>
                </Item>

                <Item>
                    <Label color="primary" stacked>Stacked Label</Label>
                    <Input type="password" placeholder="Password Input"></Input>
                </Item>

                <Item>
                    <Label color="primary" floating>Floating Label</Label>
                    <Input></Input>
                </Item>

                <Item>
                    <Input placeholder="Clear Input" clearInput></Input>
                </Item>
            </List>

            <List>
                <ListHeader>
                    <span>Textarea</span>
                </ListHeader>
                <Item>
                    <Textarea @onBlur="onBlur($event)" @onFocus="onFocus($event)" @onInput="onInput($event)"
                              placeholder="Enter a description"></Textarea>
                </Item>
            </List>

            <List>
                <ListHeader>
                    <span>Textarea</span>
                </ListHeader>
                <Item>
                    <Textarea placeholder="Enter a description"></Textarea>
                </Item>
            </List>

            <List>
                <ListHeader>
                    <span>测试</span>
                </ListHeader>
                <Item>
                    <Label color="primary">TestValue</Label>
                    <Input :debounce="0" :clearInput="true" placeholder="Text Input" v-model="testValue"
                           :disabled="testDisabled"></Input>
                </Item>
                <Item>
                    <span> 当前的值: {{testValue}}</span>
                </Item>
                <Grid>
                    <Row justify-content-center>
                        <Button small outline @click="disableToggle">Disable Toggle</Button>
                    </Row>
                </Grid>
            </List>

            <List>
                <ListHeader>Focus Highlight</ListHeader>
                <Item>
                    <Label color="primary">聚焦高亮</Label>
                    <Input :showFocusHighlight="true" placeholder="输入文本" type="text" clearInput></Input>
                </Item>
            </List>

            <List>
                <ListHeader>
                    <span>输入验证</span>
                </ListHeader>
                <Item>
                    <Label color="primary">昵称</Label>
                    <Input placeholder="中英文字母、数字、'-'、'_'组成" type="nickName" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">整数</Label>
                    <Input placeholder="请输入整数" type="integer" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">电话</Label>
                    <Input placeholder="请输入电话" type="tel" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">url</Label>
                    <Input placeholder="请输入url" type="url" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">手机号</Label>
                    <Input placeholder="请输入手机号" type="mobile" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">邮箱</Label>
                    <Input placeholder="请输入邮箱" type="email" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">密码</Label>
                    <Input placeholder="密码需6-18位，以字母开头可含数字" type="password" check></Input>
                </Item>
                <Item>
                    <Label color="primary">身份证</Label>
                    <Input placeholder="请输入身份证号码" type="idCard" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">验证码</Label>
                    <Input placeholder="请输入验证码" type="securityCode" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">中文</Label>
                    <Input placeholder="请输入中文" type="cn" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">QQ号</Label>
                    <Input placeholder="请输入QQ号" type="qq" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">自定义数字格式</Label>
                    <Input placeholder="XX-XX-XXX格式" type="text" check :regex=/\d{2}-\d{2}-\d{3}/ clearInput></Input>
                </Item>
            </List>

            <List class="simSubmit">
                <ListHeader>
                    <span>模拟提交</span>
                </ListHeader>
                <Item>
                    <Label color="primary">手机号</Label>
                    <Input placeholder="请输入手机号" type="mobile" check @onBlur="checkValue"></Input>
                </Item>
                <Item>
                    <Label color="primary">密码</Label>
                    <Input placeholder="请输入密码" type="password" check @onBlur="checkValue"></Input>
                </Item>
                <Grid>
                    <Row justify-content-center>
                        <p>点击提交表单确认是否能提交: {{canSubmit}}</p>
                    </Row>
                    <Row justify-content-center>
                        <Button outline small :disabled="!canSubmit">提交表单</Button>
                    </Row>
                </Grid>
            </List>
        </Content>
    </Page>
</template>
<style lang="scss">
</style>
<script type="text/javascript">
  export default {
    name: 'InputDemo',
    data () {
      return {
        testValue: 'hello',
        testDisabled: false,
        canSubmit: false
      }
    },
    methods: {
      checkValue () {
        console.log('checkHandler')
        this.$nextTick(() => {
          this.canSubmit = document.querySelectorAll('.simSubmit .ng-valid').length === 2
        })
      },
      onBlur ($event) {
        console.debug('onBlur')
      },
      onFocus ($event) {
        console.debug('onFocus')
        console.debug($event)
      },
      onInput ($event) {
        console.debug('onInput')
      },
      disableToggle () {
        this.testDisabled = !this.testDisabled
      }
    }
  }
</script>

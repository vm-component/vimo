<template>
    <Page>
        <Header>
            <Navbar>
                <Title>{{$t('title')}}</Title>
            </Navbar>
        </Header>
        <Content>
            <List>
                <ListHeader>Demo</ListHeader>
                <Item>
                    <Label color="primary">{{$t('nickname')}}</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           @onInvalid="onInvalidHandler($t('nicknameValidNotice'))"
                           :placeholder="$t('nicknamePlaceholder')"
                           type="nickName" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">{{$t('integer')}}</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           @onInvalid="onInvalidHandler($t('integerValidNotice'))"
                           :placeholder="$t('integerPlaceholder')"
                           type="integer" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">{{$t('tel')}}</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           @onInvalid="onInvalidHandler($t('telValidNotice'))"
                           :placeholder="$t('telPlaceholder')"
                           type="tel" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">{{$t('url')}}</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           @onInvalid="onInvalidHandler($t('urlValidNotice'))"
                           :placeholder="$t('urlPlaceholder')"
                           type="url" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">{{$t('phone')}}</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           @onInvalid="onInvalidHandler($t('phoneValidNotice'))"
                           :placeholder="$t('phonePlaceholder')"
                           type="mobile" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">{{$t('email')}}</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           @onInvalid="onInvalidHandler($t('emailValidNotice'))"
                           :placeholder="$t('emailPlaceholder')"
                           type="email" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">{{$t('psw')}}</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           @onInvalid="onInvalidHandler($t('pswValidNotice'))"
                           :placeholder="$t('pswPlaceholder')"
                           type="password" check></Input>
                </Item>
                <Item>
                    <Label color="primary">{{$t('id')}}</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           @onInvalid="onInvalidHandler($t('idValidNotice'))"
                           :placeholder="$t('idPlaceholder')"
                           type="idCard" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">{{$t('securityCode')}}</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           @onInvalid="onInvalidHandler($t('securityCodeValidNotice'))"
                           :placeholder="$t('securityCodePlaceholder')"
                           type="securityCode" check clearInput></Input>
                    <span slot="item-right">*CODE*</span>
                </Item>
                <Item>
                    <Label color="primary">{{$t('cn')}}</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           @onInvalid="onInvalidHandler($t('cnValidNotice'))"
                           :placeholder="$t('cnPlaceholder')"
                           type="cn" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">{{$t('qq')}}</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           @onInvalid="onInvalidHandler($t('qqValidNotice'))"
                           :placeholder="$t('qqPlaceholder')"
                           type="qq" check clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">{{$t('cus')}}</Label>
                    <Input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           @onInvalid="onInvalidHandler($t('cusValidNotice'))"
                           :placeholder="$t('cusPlaceholder')"
                           type="text" check :regex=/\d{2}-\d{2}-\d{3}/ clear-input></Input>
                </Item>
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
          title: '输入验证',
          nickname: '昵称',
          nicknamePlaceholder: '中英文字母、数字、\'-\'、\'_\'组成',
          nicknameValidNotice: '输入的昵称有误, 请检查!',

          integer: '整数',
          integerPlaceholder: '请输入整数',
          integerValidNotice: '输入的整数有误, 请检查!',

          tel: '电话',
          telPlaceholder: '请输入电话',
          telValidNotice: '输入的电话有误, 请检查!',

          url: 'Url',
          urlPlaceholder: '请输入url',
          urlValidNotice: '输入的url有误, 请检查!',

          phone: '手机号',
          phonePlaceholder: '请输入手机号',
          phoneValidNotice: '输入的手机号有误, 请检查!',

          email: '邮箱',
          emailPlaceholder: '请输入电话',
          emailValidNotice: '输入的电话有误, 请检查!',

          psw: '密码',
          pswPlaceholder: '密码需6-18位，以字母开头可含数字',
          pswValidNotice: '输入的密码有误, 请检查!',

          id: '身份证',
          idPlaceholder: '请输入身份证号码',
          idValidNotice: '输入的身份证有误, 请检查!',

          securityCode: '验证码',
          securityCodePlaceholder: '请输入至少4位',
          securityCodeValidNotice: '输入的验证码有误, 请检查!',

          cn: '中文',
          cnPlaceholder: '请输入中文',
          cnValidNotice: '输入的中文有误, 请检查!',

          qq: 'QQ号',
          qqPlaceholder: '请输入QQ号',
          qqValidNotice: '输入的QQ有误, 请检查!',

          cus: '自定义数字格式',
          cusPlaceholder: '请输入XX-XX-XXX格式',
          cusValidNotice: '输入的格式有误, 请检查!'

        },
        'en-US': {
          title: 'Valid',
          nickname: 'Nickname',
          nicknamePlaceholder: 'Consisting of Chinese and English letters, numbers, \'-\', \'_\'',
          nicknameValidNotice: 'The nickname you entered is incorrect. Please check!',

          integer: 'Integer',
          integerPlaceholder: 'Please enter an integer',
          integerValidNotice: 'The input integer is wrong, please check!',

          tel: 'Tel',
          telPlaceholder: 'Please enter the phone',
          telValidNotice: 'The phone number entered is incorrect. Please check!',

          url: 'Url',
          urlPlaceholder: 'Please enter url',
          urlValidNotice: 'The input url is wrong, please check!',

          phone: 'Phone',
          phonePlaceholder: 'Please enter phone number',
          phoneValidNotice: 'The phone number entered is incorrect. Please check!',

          email: 'Email',
          emailPlaceholder: 'Please input your email',
          emailValidNotice: 'The email entered is incorrect. Please check!',

          psw: 'password',
          pswPlaceholder: 'The password must be 6-18 digits, starting with the letters can contain numbers',
          pswValidNotice: 'The password you entered is incorrect. Please check!',

          id: 'ID card',
          idPlaceholder: 'Please enter the ID number',
          idValidNotice: 'The ID you entered is incorrect. Please check!',

          securityCode: 'Code',
          securityCodePlaceholder: 'Please enter at least 4 digits',
          securityCodeValidNotice: 'The verification code entered is incorrect. Please check!',

          cn: 'Chinese',
          cnPlaceholder: 'Please enter Chinese',
          cnValidNotice: 'There is an error in the Chinese input. Please check!',

          qq: 'QQ NO.',
          qqPlaceholder: 'Please enter QQ number',
          qqValidNotice: 'The QQ entered is incorrect. Please check!',

          cus: 'Custom number format',
          cusPlaceholder: 'Please enter XX-XX-XXX format',
          cusValidNotice: 'The input format is incorrect, please check!'
        }
      }
    },
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

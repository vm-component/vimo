<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Valid</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content>
            <vm-list>
                <vm-list-header>
                    <span>输入验证</span>
                </vm-list-header>
                <vm-item>
                    <vm-label color="primary">昵称</vm-label>
                    <vm-input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           @onInvalid="onInvalidHandler('输入的昵称有误, 前检查!')"
                           placeholder="中英文字母、数字、'-'、'_'组成"
                           type="nickName" check clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">整数</vm-label>
                    <vm-input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入整数" type="integer" check clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">电话</vm-label>
                    <vm-input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入电话" type="tel" check clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">url</vm-label>
                    <vm-input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入url" type="url" check clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">手机号</vm-label>
                    <vm-input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入手机号" type="mobile" check clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">邮箱</vm-label>
                    <vm-input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入邮箱" type="email" check clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">密码</vm-label>
                    <vm-input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="密码需6-18位，以字母开头可含数字" type="password" check></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">身份证</vm-label>
                    <vm-input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入身份证号码" type="idCard" check clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">验证码</vm-label>
                    <vm-input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入至少4位" type="securityCode" check clearInput></vm-input>
                    <span slot="item-right">*验证码*</span>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">中文</vm-label>
                    <vm-input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入中文" type="cn" check clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">QQ号</vm-label>
                    <vm-input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="请输入QQ号" type="qq" check clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">自定义数字格式</vm-label>
                    <vm-input show-focus-highlight
                           show-valid-highlight
                           show-invalid-highlight
                           placeholder="XX-XX-XXX格式" type="text" check :regex=/\d{2}-\d{2}-\d{3}/ clear-input></vm-input>
                </vm-item>
            </vm-list>
        </vm-content>
    </vm-page>
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

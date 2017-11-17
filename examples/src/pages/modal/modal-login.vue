<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Login</vm-title>
                <vm-buttons right slot="buttons">
                    <vm-button role="bar-button" type="solid" @click="$modal.dismiss()">
                        关闭
                    </vm-button>
                </vm-buttons>
            </vm-navbar>
        </vm-header>
        <vm-content padding>
            <vm-list>
                <vm-list-header>请输入</vm-list-header>
                <vm-item>
                    <vm-icon name="person" slot="item-start"></vm-icon>
                    <vm-label>用户名</vm-label>
                    <vm-input type="text" v-model="username" clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-icon name="key" slot="item-start"></vm-icon>
                    <vm-label>密码</vm-label>
                    <vm-input type="password" v-model="password" clearInput></vm-input>
                </vm-item>
            </vm-list>
            <vm-grid>
                <vm-row justify-content-center>
                    <vm-col col-6>
                        <vm-button block @click="login">登录</vm-button>
                    </vm-col>
                </vm-row>
                <vm-row>
                    <vm-col>
                        <p text-center>点击查看 <span class="secret" @click="secret">隐私政策</span></p>
                    </vm-col>
                </vm-row>
            </vm-grid>
        </vm-content>
    </vm-page>
</template>
<style lang="scss">
    .login {
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 30px 10px;
    }

    .secret {
        text-decoration: underline;
        color: #387ef5;
    }
</style>
<script type="text/javascript">
  import modalSecretComponent from './modal-secret.vue'

  export default {
    name: 'LoginModalDemo',
    data () {
      return {
        username: this.$options.$data && this.$options.$data.username || 'null',
        password: this.$options.$data && this.$options.$data.password || 'null'
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      secret () {
        this.$modal.present({
          component: modalSecretComponent,
          showBackdrop: true,
          enableBackdropDismiss: false
        })
      },
      login () {
        this.$modal.dismiss({
          username: this.username,
          password: this.password
        })
      }
    },
    created () {
    },
    mounted () {},
    activated () {}
  }
</script>

<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Modal</Title>
            </Navbar>
        </Header>
        <Content padding>
            <h5>简介</h5>

            <p>Modal组件是对当页内容的补充, 用于较多数据的展示和操作, 比如相册查看/登录/大段信息提示等</p>

            <Button block @click="openModal">点击打开Modal</Button>

            <h5>Modal内跳转</h5>
            <Button block @click="redirect">开启</Button>
            <h5>登录:</h5>
            <p>弹出完整的页面进行登录操作, 点击登录按钮传出登录数据用于验证, 或者在modal层验证也行.</p>
            <Button block @click="openLogin">登录</Button>
            <p><strong>返回的登录数据</strong></p>
            <p>用户名: {{username}}</p>
            <p>密码: {{password}}</p>
            <Button block @click="secret">隐私政策</Button>
            <article>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At distinctio eaque in, iste ut voluptatem. Adipisci beatae blanditiis deserunt dolor, ipsum, iste iusto necessitatibus nisi odio perspiciatis sint temporibus, voluptatibus.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At distinctio eaque in, iste ut voluptatem. Adipisci beatae blanditiis deserunt dolor, ipsum, iste iusto necessitatibus nisi odio perspiciatis sint temporibus, voluptatibus.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At distinctio eaque in, iste ut voluptatem. Adipisci beatae blanditiis deserunt dolor, ipsum, iste iusto necessitatibus nisi odio perspiciatis sint temporibus, voluptatibus.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At distinctio eaque in, iste ut voluptatem. Adipisci beatae blanditiis deserunt dolor, ipsum, iste iusto necessitatibus nisi odio perspiciatis sint temporibus, voluptatibus.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At distinctio eaque in, iste ut voluptatem. Adipisci beatae blanditiis deserunt dolor, ipsum, iste iusto necessitatibus nisi odio perspiciatis sint temporibus, voluptatibus.</p>
            </article>

        </Content>
    </Page>
</template>
<style lang="less">
    .login {
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 30px 10px;
    }

</style>
<script type="text/javascript">
  import modalPageComponent from './modal-page.vue'
  import modalRedirectComponent from './modal-redirect.vue'
  import modalLoginComponent from './modal-login.vue'

  export default {
    data () {
      return {
        username: '你好Vimo',
        password: '123456'
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      secret () {
        this.$modal.present({
          name: 'SecretModalDemo',
          animateName: 'fade-bottom',
          component: import('./modal-secret.vue'),
          showBackdrop: true,
          enableBackdropDismiss: false
        })
      },
      redirect () {
        this.$modal.present({
          name: 'RedirectModalDemo',
          animateName: 'fade-right',
          component: modalRedirectComponent,
          data: {
            parentRouter: this.$router
          },
          showBackdrop: true,
          enableBackdropDismiss: false,
          onDismiss (data) {
            console.log('modal-redirect')
            console.log(data)
          }
        })
      },
      openLogin () {
        const _this = this
        this.$modal.present({
          name: 'LoginModalDemo',
          animateName: 'fade-bottom',
          component: modalLoginComponent,
          data: {
            username: this.username,
            password: this.password
          },
          showBackdrop: true,
          enableBackdropDismiss: false,
          onDismiss (data) {
            console.log(data)
            if (data) {
              _this.username = data.username
              _this.password = data.password
            }
          }
        })
      },
      openModal () {
        this.$modal.present({
          component: modalPageComponent,
          animateName: 'fade-bottom',
          onDismiss () {
            console.log('onDismiss')
          }
        })
      }
    },
    created () {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>

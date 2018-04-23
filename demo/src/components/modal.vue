<template>
    <Page>
        <Header>
            <Navbar>
                <Title>{{$t('title')}}</Title>
            </Navbar>
        </Header>
        <Content padding>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, delectus, deleniti est id illum ipsum libero minus molestias repudiandae totam
               vero voluptatibus. Ab asperiores labore molestiae natus quas, ut voluptas!</p>
            <Button block @click="openModal">{{$t('openModal')}}</Button>
            <h5>{{$t('redirect')}}</h5>
            <Button block @click="redirect">{{$t('openModal')}}</Button>
            <h5>{{$t('login')}}:</h5>
            <Button block @click="openLogin">{{$t('login')}}</Button>
            <h5>Returns Value</h5>
            <p>UserName: {{username}}</p>
            <p>PSW: {{password}}</p>
            <Button block @click="secret">{{$t('pp')}}</Button>
            <article>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At distinctio eaque in, iste ut voluptatem. Adipisci beatae blanditiis deserunt
                    dolor, ipsum, iste iusto necessitatibus nisi odio perspiciatis sint temporibus, voluptatibus.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At distinctio eaque in, iste ut voluptatem. Adipisci beatae blanditiis deserunt
                    dolor, ipsum, iste iusto necessitatibus nisi odio perspiciatis sint temporibus, voluptatibus.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At distinctio eaque in, iste ut voluptatem. Adipisci beatae blanditiis deserunt
                    dolor, ipsum, iste iusto necessitatibus nisi odio perspiciatis sint temporibus, voluptatibus.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At distinctio eaque in, iste ut voluptatem. Adipisci beatae blanditiis deserunt
                    dolor, ipsum, iste iusto necessitatibus nisi odio perspiciatis sint temporibus, voluptatibus.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At distinctio eaque in, iste ut voluptatem. Adipisci beatae blanditiis deserunt
                    dolor, ipsum, iste iusto necessitatibus nisi odio perspiciatis sint temporibus, voluptatibus.</p>
            </article>

        </Content>
    </Page>
</template>
<style lang="scss">
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
    name: 'DemoModal',
    i18n: {
      messages: {
        'zh-CN': {
          title: '弹出页',
          openModal: '打开Modal',
          login: '登录',
          redirect: '跳转',
          pp: '隐私政策'

        },
        'en-US': {
          title: 'Modal',
          openModal: 'Open Modal',
          login: 'Login',
          redirect: 'Redirect',
          pp: 'Privacy Policy'
        }
      }
    },
    data () {
      return {
        username: '你好Vimo',
        password: '123456'
      }
    },
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
    }
  }
</script>

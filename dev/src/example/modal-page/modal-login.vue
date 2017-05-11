<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Login</Title>
            </Navbar>
        </Header>
        <Content padding>
            <List>
                <ListHeader>请输入</ListHeader>
                <Item>
                    <Icon name="person" slot="item-left"></Icon>
                    <Label>用户名</Label>
                    <Input type="text" v-model="username" clearInput></Input>
                </Item>
                <Item>
                    <Icon name="key" slot="item-left"></Icon>
                    <Label>密码</Label>
                    <Input type="password" v-model="password" clearInput></Input>
                </Item>
            </List>

            <Grid>
                <Row>
                    <Column>
                        <Button block @click="login">登录</Button>
                    </Column>
                    <Column>
                        <Button block outline color="danger" @click="closeModal">返回</Button>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <p text-center>点击查看 <span class="secret" @click="secret">隐私政策</span></p>
                    </Column>
                </Row>
            </Grid>
        </Content>
    </Page>
</template>
<style lang="scss">
    .login {
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 30px 10px;
    }

    .secret {
        text-decoration: underline;
        color: #333;
    }
</style>
<script type="text/javascript">
  import { Checkbox } from 'vimo/components/checkbox'
  import { Label } from 'vimo/components/label'
  import { Input, Textarea } from 'vimo/components/input'
  import { List } from 'vimo/components/list'
  import { ListHeader, Item } from 'vimo/components/item'
  import modalSecretComponent from './modal-secret.vue'
  export default{
    data () {
      return {
        username: this.$options.$data.username,
        password: this.$options.$data.password
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      secret() {
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
      },
      closeModal () {
        this.$modal.dismiss()
      }
    },
    created () {},
    mounted () {},
    activated () {},
    components: {Label, List, ListHeader, Item, Input, Textarea, Checkbox}
  }
</script>

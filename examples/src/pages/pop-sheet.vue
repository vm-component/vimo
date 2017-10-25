<template>
    <Page>
        <Header>
            <Navbar>
                <Title>PopSheet</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h1>PopSheet组件</h1>
            <p>组件用于在页面中弹出一个对话框，比如输入表单选择什么的，个性化程度比较高，而alert组件无法满足的需求。组件将在页面中书写，内置方法开关，而不是插入到DOM中。</p>
            <p>内容: {{name}} - {{password}}</p>

            <List>
                <ListHeader>特性</ListHeader>
                <Item>
                    <Label>显示背景</Label>
                    <Toggle v-model="showBackdrop"></Toggle>
                </Item>
                <Item>
                    <Label>点击背景关闭</Label>
                    <Toggle v-model="enableBackdropDismiss"></Toggle>
                </Item>
            </List>

            <Button block @click="openPopSheet">登录</Button>
            <section>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
            </section>
            <!--paySheet-->
            <PopSheet
                    ref="popSheet"
                    slot="fixed"
                    :enableBackdropDismiss="enableBackdropDismiss"
                    :showBackdrop="showBackdrop">
                <section class="popSheet">
                    <h2>TITLE</h2>
                    <h5>这是内容, 宽度高度自定义</h5>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, eaque earum eum ex expedita facere fugit ipsa ipsum minima nemo nostrum, pariatur placeat qui quis quod quos repellendus tempora unde.</p>
                    <List>
                        <Item>
                            <Label>名称</Label>
                            <Input v-model="name" type="text" placeholder="请输入用户名" clear-input></Input>
                        </Item>
                        <Item>
                            <Label>密码</Label>
                            <Input v-model="password" type="password" placeholder="请输入密码" clear-input></Input>
                        </Item>
                    </List>

                    <Button block @click="closePopSheet">确认</Button>
                </section>
            </PopSheet>
            <!--shareSheet-->
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'PopSheetDemo',
    components: {},
    // data
    props: {},
    data () {
      return {
        enableBackdropDismiss: true,
        showBackdrop: true,
        name: '',
        password: ''
      }
    },
    computed: {
      popSheetComponent () {
        return this.$refs.popSheet
      }
    },
    // methods
    methods: {
      closePopSheet () {
        return this.popSheetComponent.dismiss()
      },
      openPopSheet () {
        return this.popSheetComponent.present()
      }
    },
    // life hook
    beforeCreate () {},
    created () {},
    beforeMount () {},
    mounted () {},
    beforeUpdate () {},
    updated () {},
    activated () {},
    deactivated () {},
    beforeDestroy () {},
    destroyed () {}
  }
</script>
<style scoped lang="less">
    .popSheet {
        /*height: 300px;*/
        width: 300px;
        background: #fff;
        border-radius: 10px;
        padding: 25px;
    }
</style>

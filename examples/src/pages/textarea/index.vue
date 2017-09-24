<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Textarea</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <div padding>
                <p>Textarea组件使用示例</p>
            </div>
            <List>
                <ListHeader>使用场景</ListHeader>
                <Item button :to="{name:'textarea.normal'}">普通用法</Item>
                <Item button :to="{name:'textarea.event'}">输入事件</Item>
                <Item button :to="{name:'textarea.valid'}">验证</Item>
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'TextareaDemo',
    data () {
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {},
    deactivate () {},
    components: {},
    destroyed () {}
  }
</script>
<style scoped lang="less">

</style>

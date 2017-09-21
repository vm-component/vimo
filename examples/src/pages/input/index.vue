<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Input</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <div padding>
                <p>Input组件使用示例</p>
            </div>
            <List>
                <ListHeader>使用场景</ListHeader>
                <Item detail-push :to="{name:'input.normal'}">普通用法</Item>
                <Item detail-push :to="{name:'input.valid'}">输入验证</Item>
                <Item detail-push :to="{name:'input.limit'}">输入限制</Item>
                <Item detail-push :to="{name:'input.event'}">输入事件</Item>
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'InputDemo',
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
<style scoped lang="scss">

</style>

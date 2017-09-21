<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Limit</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>长度限制</ListHeader>
                <Item>
                    <Label color="primary">最长10个字符</Label>
                    <Input :max="10" show-focus-highlight placeholder="输入文本" type="text" clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">最长10位数字</Label>
                    <Input :max="10" show-focus-highlight placeholder="输入数字" type="number" clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">数字范围(-2~10)</Label>
                    <Input :min="-2" :max="10" show-focus-highlight placeholder="-2~10" type="number"
                           clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">数字范围(0~10)</Label>
                    <Input :min="0" :max="10" show-focus-highlight placeholder="0~10" type="number" clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">数字范围(2~10)</Label>
                    <Input :min="2" :max="10" show-focus-highlight placeholder="2~10" type="number" clearInput></Input>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'InputLimitDemo',
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

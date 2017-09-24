<template>
    <Page>
        <Header>
            <Navbar>
                <Title>日期范围选择</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>选择范围</ListHeader>
                <Item>
                    <Label>
                        2017/07/01 ~ 2017/12/01
                    </Label>
                    <Datetime slot="item-right"
                              min="2017-07-01"
                              max="2017-12-01"
                    ></Datetime>
                </Item>

                <Item>
                    <Label>
                        2017/01/01 ~ 2017/12/01
                    </Label>
                    <Datetime slot="item-right"
                              min="2017-01-01"
                              max="2017-12-01"
                    ></Datetime>
                </Item>

                <Item>
                    <Label>
                        2017/01/15 ~ 2017/01/30
                    </Label>
                    <Datetime slot="item-right"
                              min="2017-01-15"
                              max="2017-01-30"
                    ></Datetime>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default{
    name: 'name',
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
    destroyed () {}
  }
</script>

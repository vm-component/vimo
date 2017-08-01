<template>
    <Page>
        <Header>
            <Navbar>
                <Title>折叠列表</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">

            <div padding>
                <p>折叠列表不支持重叠组合, 最多只有一级折叠.</p>
            </div>
            <List>
                <ListHeader>折叠列表</ListHeader>
                <ItemGroup>
                    <ItemCollapse title="Cars">
                        <Icon slot="item-left" color="primary" name="car"></Icon>
                        <Item detail-push>
                            <Icon slot="item-left" color="primary" name="wifi"></Icon>
                            Wi-Fi
                            <Note slot="item-right">XXX-Office</Note>
                        </Item>
                        <Item>
                            <Icon slot="item-left" color="danger" name="plane"></Icon>
                            <span>飞行模式</span>
                            <Toggle slot="item-right" :checked="true"></Toggle>
                        </Item>
                    </ItemCollapse>
                    <ItemCollapse title="Apple">
                        <Icon slot="item-left" color="primary" name="logo-apple"></Icon>
                        <Note slot="item-right">请选择</Note>
                        <Item detail-push>MacBook Air</Item>
                        <Item detail-push>MacBook Pro</Item>
                        <Item detail-push>iPhone 8</Item>
                    </ItemCollapse>
                    <ItemCollapse>
                        <Icon slot="item-left" color="primary" name="plane"></Icon>
                        <div slot="item-title">
                            飞机列表
                        </div>
                        <Item detail-push>飞机1</Item>
                        <Item detail-push>飞机2</Item>
                        <Item detail-push>飞机3</Item>
                    </ItemCollapse>
                </ItemGroup>
            </List>

            <List>
                <ListHeader>手风琴列表(只开启一个)</ListHeader>
                <ItemGroup accordion>
                    <ItemCollapse title="This Is Title1">
                        <Item>subItem1</Item>
                        <Item>subItem2</Item>
                        <Item>subItem3</Item>
                    </ItemCollapse>
                    <ItemCollapse>
                        <template slot="item-title">
                            This Is Title2 &ensp;
                            <Icon name="information-circle"></Icon>
                        </template>
                        <Item detail-push>subItem1</Item>
                        <Item detail-push>subItem2</Item>
                        <Item detail-push>subItem3</Item>
                    </ItemCollapse>
                    <ItemCollapse title="This Is Title3">
                        <Item detail-push>subItem1</Item>
                        <Item detail-push>subItem2</Item>
                        <Item detail-push>subItem3</Item>
                    </ItemCollapse>
                </ItemGroup>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
  export default{
    name: 'accordion',
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
    components: {
    }
  }
</script>

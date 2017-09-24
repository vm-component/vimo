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
                <ListHeader>普通Item</ListHeader>
                <Item button>
                    <span>你好</span>
                    <Note slot="item-right">Hello</Note>
                </Item>
                <Item button>
                    <span>移动端组件库</span>
                    <Note slot="item-right">Vimo</Note>
                </Item>
            </List>
            <List>
                <ListHeader>折叠列表</ListHeader>
                <ItemCollapseGroup>
                    <ItemCollapse title="Cars">
                        <Icon slot="item-left" name="car"></Icon>
                        <Item button>
                            <Icon slot="item-left" name="wifi"></Icon>
                            Wi-Fi
                            <Note slot="item-right">XXX-Office</Note>
                        </Item>
                        <Item>
                            <Icon slot="item-left" name="plane"></Icon>
                            <span>飞行模式</span>
                            <Toggle slot="item-right" :checked="true"></Toggle>
                        </Item>
                    </ItemCollapse>
                    <ItemCollapse title="Apple">
                        <Icon slot="item-left" name="logo-apple"></Icon>
                        <Note slot="item-right">请选择</Note>
                        <Item button>MacBook Air</Item>
                        <Item button>MacBook Pro</Item>
                        <Item button>iPhone 8</Item>
                    </ItemCollapse>
                </ItemCollapseGroup>
            </List>

            <List>
                <ListHeader>纯文本</ListHeader>
                <ItemCollapseGroup accordion>
                    <ItemCollapse>
                        <div slot="item-title">
                            文本1
                        </div>
                        <section padding>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, aut autem dolor eligendi eum fugiat illo minima necessitatibus obcaecati omnis quidem repellendus. Aperiam ipsa numquam perspiciatis quod saepe totam ullam.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, aut autem dolor eligendi eum fugiat illo minima necessitatibus obcaecati omnis quidem repellendus. Aperiam ipsa numquam perspiciatis quod saepe totam ullam.
                        </section>
                    </ItemCollapse>
                    <ItemCollapse>
                        <div slot="item-title">
                            文本2
                        </div>
                        <section padding>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At deleniti dolores nostrum soluta. Aspernatur, dolorem explicabo iure libero molestiae nesciunt nihil officia optio provident sapiente voluptates voluptatibus! Laborum, quaerat, repudiandae!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At deleniti dolores nostrum soluta. Aspernatur, dolorem explicabo iure libero molestiae nesciunt nihil officia optio provident sapiente voluptates voluptatibus! Laborum, quaerat, repudiandae!
                        </section>
                    </ItemCollapse>
                    <ItemCollapse>
                        <div slot="item-title">
                            文本3
                        </div>
                        <section padding>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At deleniti dolores nostrum soluta. Aspernatur, dolorem explicabo iure libero molestiae nesciunt nihil officia optio provident sapiente voluptates voluptatibus! Laborum, quaerat, repudiandae!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At deleniti dolores nostrum soluta. Aspernatur, dolorem explicabo iure libero molestiae nesciunt nihil officia optio provident sapiente voluptates voluptatibus! Laborum, quaerat, repudiandae!
                        </section>
                    </ItemCollapse>
                </ItemCollapseGroup>
            </List>
            <List>
                <ListHeader>手风琴列表(只开启一个)</ListHeader>
                <ItemCollapseGroup accordion>
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
                        <Item button>subItem1</Item>
                        <Item button>subItem2</Item>
                        <Item button>subItem3</Item>
                    </ItemCollapse>
                    <ItemCollapse title="This Is Title3">
                        <Item button>subItem1</Item>
                        <Item button>subItem2</Item>
                        <Item button>subItem3</Item>
                    </ItemCollapse>
                </ItemCollapseGroup>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default {
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
    components: {}
  }
</script>

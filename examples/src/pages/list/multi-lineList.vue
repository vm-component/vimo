<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Multi-lineList</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>
                    <span>today</span>
                </ListHeader>
                <Item>
                    <Avatar slot="item-left">
                        <img src="./img/avatar-ts-woody.png">
                    </Avatar>
                    <Label>
                        <h2>Woody</h2>
                        <h3>Hello world</h3>
                        <h4>This is third line</h4>
                        <p>This town ain't big enough for the two of us!</p>
                    </Label>
                </Item>
                <Item>
                    <Avatar slot="item-left">
                        <img src="./img/avatar-ts-buzz.png">
                    </Avatar>
                    <Label>
                        <h2>Buzz Lightyear</h2>
                        <h3>Hello world</h3>
                        <p>My eyeballs could have been sucked from their sockets!</p>
                    </Label>
                </Item>
            </List>

            <List>
                <ListHeader>
                    yesterday

                </ListHeader>
                <Item>
                    <Avatar slot="item-left">
                        <img src="./img/avatar-ts-hamm.png">
                    </Avatar>
                    <Label>
                        <h2>Hamm</h2>
                        <h3>Hello world</h3>
                        <p>You heard of Kung Fu? Well get ready for pork chop.</p>
                    </Label>
                </Item>
                <Item>
                    <Avatar slot="item-left">
                        <img src="./img/avatar-ts-slinky.png">
                    </Avatar>
                    <Label>
                        <h2>Slinky Dog</h2>
                        <h3>Hello world</h3>
                        <p>I may not be a smart dog, but I know what roadkill is.</p>
                    </Label>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default {
    data () {
      return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {}
  }
</script>

<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Multi-lineList</Title>
      </Navbar>
    </Header>
    <Content>
      <List>
        <ListHeader>
          today
        </ListHeader>
        <Item>
          <Avatar item-left slot="item-left">
            <img src="http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-woody.png">
          </Avatar>
          <h2>Woody</h2>
          <h3>Hello world</h3>
          <p>This town ain't big enough for the two of us!</p>
        </Item>
        <Item>
          <Avatar item-left slot="item-left">
            <img src="http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-buzz.png">
          </Avatar>
          <h2>Buzz Lightyear</h2>
          <h3>Hello world</h3>
          <p>My eyeballs could have been sucked from their sockets!</p>
        </Item>
      </List>

      <List>
        <ListHeader>
          yesterday
        </ListHeader>
        <Item>
          <Avatar item-left slot="item-left">
            <img src="http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-hamm.png">
          </Avatar>
          <h2>Hamm</h2>
          <h3>Hello world</h3>
          <p>You heard of Kung Fu? Well get ready for pork chop.</p>
        </Item>
        <Item>
          <Avatar item-left slot="item-left">
            <img src="http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-slinky.png">
          </Avatar>
          <h2>Slinky Dog</h2>
          <h3>Hello world</h3>
          <p>I may not be a smart dog, but I know what roadkill is.</p>
        </Item>
      </List>
    </Content>
  </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>

<template>
  <Page>
    <Header>
      <Navbar>
        <Title>ThumbnailList</Title>
      </Navbar>
    </Header>
    <Content>


      <List>
        <Item>
          <Thumbnail slot="item-left">
            <img src="http://ionicframework.com/dist/preview-app/www/assets/img/thumbnail-totoro.png">
          </Thumbnail>
          <h2>My Neighbor Totoro</h2>
          <p>Hayao Miyazaki • 1988</p>
          <Button ion-button type="clear" slot="item-right">View</Button>
        </Item>
        <Item>
          <Thumbnail slot="item-left">
            <img src="http://ionicframework.com/dist/preview-app/www/assets/img/thumbnail-rotla.png">
          </Thumbnail>
          <h2>My Neighbor Totoro</h2>
          <p>Hayao Miyazaki • 1988</p>
          <Button ion-button type="clear" slot="item-right">View</Button>
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
      return {
      }
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

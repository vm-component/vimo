<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Button</Title>
      </Navbar>
    </Header>
    <Content padding>
      <p>Colors</p>
      <Button @click="primary()" color="primary">primary</Button>
      <Button color="secondary" :isStrong="true">secondary</Button>
      <Button color="danger">danger</Button>
      <Button color="light">light</Button>
      <Button color="light" disabled>light</Button>
      <Button color="dark">dark</Button>
      <Button>default color</Button>

      <p>Spinner</p>
      <Button>
        Loading
        <Spinner  color="light" name="ios-small"></Spinner>
      </Button>

      <p>Shaps</p>
      <Button shape="full">full</Button>
      <Button shape="block">block</Button>
      <Button shape="round">round</Button>

      <p>Type</p>
      <!--solid-->
      <Button type="solid" color="secondary">solid</Button>
      <Button type="outline" color="secondary">outline</Button>
      <Button type="clear" color="secondary">clear</Button>


      <p>Outline</p>
      <Button type="outline" shape="full" color="secondary">outline + full</Button>
      <Button type="outline" shape="block" color="secondary">outline + block</Button>
      <Button type="outline" shape="round" color="secondary">outline + round</Button>

      <p>Size</p>
      <Button color="light" size="large">large</Button>
      <Button color="light" size="default">default</Button>
      <Button color="light" size="small">small</Button>

      <p>Icons</p>

      <!--icon left-->
      <Button color="dark">
        <Icon class="icon" name="fa-star"></Icon>
        Left Icon
      </Button>

      <!--no icon-->
      <Button color="dark">
        No Icon
      </Button>

      <!--icon only-->
      <Button color="dark">
        <Icon class="icon" name="fa-star"></Icon>
      </Button>

      <!--icon only-->
      <Button color="dark">
        <Icon class="icon" name="fa-star"></Icon>
      </Button>

      <!--icon right-->
      <Button color="dark">
        Right Icon
        <Icon class="icon" name="fa-star"></Icon>
      </Button>


    </Content>
  </Page>


</template>
<style scoped lang="scss">
  .buttons {
    text-align: center;

  }
</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {}
    },
    methods: {
      primary: function () {
        alert('primary');
      }
    },
  }
</script>

<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Button</Title>
      </Navbar>
    </Header>
    <Content>
      <h4 text-center>Colors</h4>
      <Button @click="primary()" color="primary">primary</Button>
      <Button color="secondary" :isStrong="true">secondary</Button>
      <Button color="danger">danger</Button>
      <Button color="light">light</Button>
      <Button color="light" disabled>light</Button>
      <Button color="dark">dark</Button>
      <Button>default color</Button>

      <h4 text-center>Spinner</h4>
      <Button>
        Loading
        <Spinner  color="light" name="ios-small"></Spinner>
      </Button>

      <h4 text-center>Shaps</h4>
      <Button full>full</Button>
      <Button block>block</Button>
      <Button round>round</Button>

      <h4 text-center>Type</h4>
      <!--solid-->
      <Button solid color="secondary">solid</Button>
      <Button outline color="secondary">outline</Button>
      <Button clear color="secondary">clear</Button>


      <h4 text-center>Outline</h4>
      <Button outline full color="secondary">outline + full</Button>
      <Button outline block color="secondary">outline + block</Button>
      <Button outline round color="secondary">outline + round</Button>

      <h4 text-center>Size</h4>
      <Button color="light" large>large</Button>
      <Button color="light" default>default</Button>
      <Button color="light" small>small</Button>

      <h4 text-center>Icons</h4>
      <!--icon left-->
      <Button color="dark">
        <Icon class="icon" name="star"></Icon>
        Left Icon
      </Button>

      <!--no icon-->
      <Button color="dark">
        No Icon
      </Button>

      <!--icon only-->
      <Button color="dark">
        <Icon class="icon" name="star"></Icon>
      </Button>

      <!--icon only-->
      <Button color="dark">
        <Icon class="icon" name="star"></Icon>
      </Button>

      <!--icon right-->
      <Button color="dark">
        Right Icon
        <Icon class="icon" name="star"></Icon>
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

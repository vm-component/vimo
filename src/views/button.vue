<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Button</Title>
      </Navbar>
    </Header>
    <Content padding>
      <h4>Colors</h4>
      <Button @click="primary()" color="primary">primary</Button>
      <Button color="secondary" :isStrong="true">secondary</Button>
      <Button color="danger">danger</Button>
      <Button color="light">light</Button>
      <Button color="light" disabled>light</Button>
      <Button color="dark">dark</Button>
      <Button>default color</Button>

      <h4>Spinner</h4>
      <Button>
        Loading
        <Spinner  color="light" name="ios-small"></Spinner>
      </Button>


      <h4>Shaps</h4>
      <Button shape="full">full</Button>
      <Button shape="block">block</Button>
      <Button shape="round">round</Button>

      <h4>Type</h4>
      <!--solid-->
      <Button type="solid" color="secondary">solid</Button>
      <Button type="outline" color="secondary">outline</Button>
      <Button type="clear" color="secondary">clear</Button>


      <h4>Outline</h4>
      <Button type="outline" shape="full" color="secondary">outline + full</Button>
      <Button type="outline" shape="block" color="secondary">outline + block</Button>
      <Button type="outline" shape="round" color="secondary">outline + round</Button>

      <h4>Size</h4>
      <Button color="light" size="large">large</Button>
      <Button color="light" size="default">default</Button>
      <Button color="light" size="small">small</Button>

      <h4>Icons</h4>
      <Button color="dark icon-left" icon-left>
        <Icon class="icon" name="star"></Icon>
        Left Icon
      </Button>
      <Button color="dark">
        No Icon
      </Button>
      <Button icon-only color="dark">
        <Icon class="icon" name="star"></Icon>
      </Button>
      <Button icon-only color="dark">
        <Icon class="icon" name="star"></Icon>
      </Button>
      <Button color="dark icon-right" icon-right>
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
  import Button from '../components/button'
  import Icon from '../components/icon';

  export default{
    data(){
      return {}
    },
    methods: {
      primary: function () {
        alert('primary');
      }
    },
    components: {
      'ion-button': Button,
      'ion-icon': Icon,
    },
  }
</script>

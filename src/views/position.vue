<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Button</Title>
      </Navbar>
    </Header>
    <Content padding>
      <p>Colors</p>
      <Button @click="getByAli()" color="primary">ali</Button>
     <!--  <Button color="secondary" :isStrong="true">secondary</Button>
     <Button color="danger">danger</Button>
     <Button color="light">light</Button>
     <Button color="light" disabled>light</Button>
     <Button color="dark">dark</Button>
     <Button>default color</Button>
     <div class="posContent"></div> -->
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
      getByAli: function () {
        this.$geolocation.getCurrentPosition("ali").then(function(pos){
          console.log(pos);
        });
      }
    },
  }
</script>

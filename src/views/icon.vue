<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Icon</Title>
      </Navbar>
    </Header>
    <Content padding class="iconDemo">
      <Icon color="primary" name="ionic"></Icon>
      <Icon color="danger" ios="ionic"></Icon>
      <Icon color="secondary" md="ionic"></Icon>
    </Content>
  </Page>
</template>
<style lang="scss">
  .iconDemo{
    font-size: 50px;
  }
</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {}
    },
    components: {
    },
  }
</script>

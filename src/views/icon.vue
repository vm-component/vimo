<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Icon</Title>
      </Navbar>
    </Header>
    <Content padding class="iconDemo">

      <h5>Vimo的Icon使用的是font-awesome图标</h5>

      <p>fa-address-book的普通状态和激活状态</p>
      <Icon color="primary" name="fa-address-book"></Icon>
      <Icon color="primary" name="fa-address-book" :isActive="true"></Icon>

      <p>fa-spinner的普通状态和激活状态</p>

      <Icon color="danger" name="fa-spinner"></Icon>
      <Icon color="danger" name="fa-spinner" :isActive="true" activeName="fa-spinner fa-spin"></Icon>


      <p>也可以使用图片icon, 这个时候用i标签自己定义吧</p>

      <p>剩余的图标参考Font-Awesome, <a href="http://fontawesome.io/icons/">点击这里</a></p>



    </Content>
  </Page>
</template>
<style lang="scss">
  .iconDemo .icon {
    font-size: 40px;
  }
</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {}
    },
    components: {},
  }
</script>

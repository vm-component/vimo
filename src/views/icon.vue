<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Icon</Title>
      </Navbar>
    </Header>
    <Content padding class="iconDemo">

      <h5>Vimo的Icon可以使用ionicons/自定义(需要以icon-开头)</h5>

      <p>IonIcon</p>
      <Icon color="primary" name="star"></Icon>

      <!--icon icon-ios icon-ios-primary ion-ios-ionic-->
      <p>book的普通状态和激活状态</p>
      <Icon color="primary" name="book"></Icon>
      <Icon color="primary" name="book" :isActive="true"></Icon>

      <p>也可以使用图片icon, 记得在name中传入icon的class, 像下面这样</p>
      <Icon name="icon-vue"></Icon>

      <p>剩余的图标参考IonIcons, <a href="http://ionicons.com/">点击这里</a></p>

    </Content>
  </Page>
</template>
<style lang="scss">
  .iconDemo .icon {
    font-size: 40px;
  }

  .icon-vue {
    height: 40px;
    width: 40px;
    background: url('../assets/vue.png') no-repeat center center/cover;
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

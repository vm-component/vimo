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
      <h5>book的普通状态和激活状态, 默认情况下为激活状态</h5>
      <p>(-outline尾缀只有ios平台有, 其他平台需要自己定义activeClass)</p>

      <Grid>
        <Row>
          <Column col-4 align-self-center>默认状态:</Column>
          <Column col-8 align-self-center>
            <Icon color="primary" name="book"></Icon>
          </Column>
        </Row>
        <Row>
          <Column col-4 align-self-center>激活状态:</Column>
          <Column col-8 align-self-center>
            <Icon color="primary" name="book" :isActive="true"></Icon>
          </Column>
        </Row>
        <Row>
          <Column col-4 align-self-center>非激活状态:</Column>
          <Column col-8 align-self-center>
            <Icon color="primary" name="book" :isActive="false"></Icon>
          </Column>
        </Row>
      </Grid>

      <p>自定义activeName, 原来是star, 激活状态为ios-book</p>
      <Grid>
        <Row>
          <Column col-4 align-self-center>激活状态:</Column>
          <Column col-8 align-self-center>
            <Icon color="primary" name="star" :isActive="true" activeName="ios-book"></Icon>
          </Column>
        </Row>
        <Row>
          <Column col-4 align-self-center>非激活状态:</Column>
          <Column col-8 align-self-center>
            <Icon color="primary" name="star" :isActive="false" activeName="ios-book"></Icon>
          </Column>
        </Row>
      </Grid>


      <p>也可以使用图片icon, 记得在name中传入icon的class, 像下面这样</p>

      <Icon name="icon-vue"></Icon>


      <p>在ios平台显示ios-book, 在md平台显示md-star</p>
      <Icon ios="ios-book" md="md-star"></Icon>

      <p>在全平台都显示md-star</p>
      <Icon name="md-star"></Icon>


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

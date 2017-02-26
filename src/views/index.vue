<template>
  <Page class="index">
    <!--content-->
    <Header>
      <!--menutoggle-->
      <Navbar :hideBackButton="true">
        <!--menutoggle-->
        <Button color="dark" @click="$menu.open('menu')" left icon-only role="bar-button" shape="menutoggle" slot="button">
          <Icon class="icon" name="fa-navicon"></Icon>
        </Button>

        <Title>Welcome</Title>

        <Button color="dark" @click="$menu.open('author')" right icon-only role="bar-button" shape="menutoggle" slot="button">
          <Icon class="icon" name="fa-user"></Icon>
        </Button>
      </Navbar>
    </Header>
    <Content padding class="content">

      <article class="scrollContent">
        <Grid class="vimo">
          <Row class="vimo__logo" >
            <Column text-center no-padding>
              <div class="vimo__logo--img">
                <img height="120" src="../assets/vimo.png">
              </div>
            </Column>
          </Row>

          <Row class="vimo__text">
            <Column text-center>
              <h1>VIMO</h1>
              <p>v1.0.0</p>

              <p>
                <Icon name="fa-github"></Icon>
                Github  <Icon name="fa-star"></Icon> <strong>6 </strong>
              </p>
              <p>Copyright © 2017 Songtao (GPL-3.0)</p>
            </Column>
          </Row>

          <Row class="vimo__btns">
            <Button shape="block" type="solid" @click="$router.push({'name':'components'})">组件(Component)</Button>
            <Button shape="block" type="solid" @click="$menu.open('menu')">菜单(Menu)</Button>
            <Button shape="block" type="solid" @click="$menu.open('author')">关于我(About)</Button>
          </Row>

        </Grid>
      </article>

      <section slot="fixedBottom" class="inspired">
        <p class="inspired__name">INSPIRED BY</p>
        <div class="inspired__logos">
          <section>
            <i class="inspired__logos--ionic"></i>
          </section>
          <section>
            <i class="inspired__logos--vue"></i><span>Vue.js</span>
          </section>
        </div>
      </section>


    </Content>
  </Page>
</template>
<style scoped lang="scss">
  .index {
    .content {
      background: #fff !important;

      .scrollContent {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
        .vimo {
          display: flex;
          justify-content: center;
          align-content: center;
          flex-direction: column;
          padding-bottom: 55px;

          .vimo__logo {
            .vimo__logo--img {
              height: 120px;
            }
          }
          .vimo__text {
            margin-top:5px;
            margin-bottom:5px;
            h1 {
              font-weight: bold;
            }
            p {
              margin: 5px 0;
              font-size: 12px;
              color: #2c3e50;
            }

          }
          .vimo__btns {

          }
        }
      }
      .inspired {
        width: 100%;
        height: 55px;
        position: absolute;
        bottom: 0;
        border-top: 1px solid #eee;
        text-align: center;
        background: rgba(256, 256, 256, 0.7);
        .inspired__name {
          font-size: 14px;
          line-height: 120%;
          padding: 5px 0;
          margin: 0;
          color: #919191;
        }
        .inspired__logos {
          display: flex;
          justify-content: center;
          align-content: center;
          & > section {
            display: flex;
            justify-content: center;
            align-content: center;
            i {
              display: inline-block;
              /*outline: 1px solid red;*/
            }
            & > span {
              display: inline-block;
              height: 100%;
              font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;

              font-size: 13px;
              line-height: 154%;
              color: #2c3e50;
              font-weight: 500;

            }
            .inspired__logos--ionic {
              height: 22px;
              width: 80px;
              background: transparent url(../assets/ionic.png) no-repeat top center/60px auto;
            }
            .inspired__logos--vue {
              height: 22px;
              width: 26px;
              background: transparent url(../assets/vue.png) no-repeat top center/22px auto;
            }
          }
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'index',
  }
</script>

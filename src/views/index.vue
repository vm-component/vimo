<template>
  <Page class="index">
    <!--content-->
    <Header>
      <!--menutoggle-->
      <Navbar :hideBackButton="true">
        <!--menutoggle-->
        <Button color="dark" @click="$menu.open('menu')" left icon-only role="bar-button" shape="menutoggle"
                slot="button">
          <Icon class="icon" name="menu"></Icon>
        </Button>

        <Title>Welcome</Title>

        <Button color="dark" @click="$menu.open('author')" right icon-only role="bar-button" shape="menutoggle"
                slot="button">
          <Icon class="icon" name="person"></Icon>
        </Button>
      </Navbar>
    </Header>
    <Content padding class="content">
    <!--<Content padding class="content" :useIScroll="true">-->

      <article class="scrollContent">
        <Grid class="vimo">
          <Row class="vimo__logo">
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
              <p>基于Vue2.x的移动端Hybrid框架</p>
              <div class="vimo__text--iframe">
                <iframe src="https://ghbtns.com/github-btn.html?user=DTFE&amp;repo=Vimo&amp;type=star&amp;count=true"
                        frameborder="0" scrolling="0" width="110px" height="20px" class="enter-transition"
                        style=""></iframe>
                <iframe src="https://ghbtns.com/github-btn.html?user=DTFE&amp;repo=Vimo&amp;type=fork&amp;count=true"
                frameborder="0" scrolling="0" width="95px" height="20px" class="enter-transition"
                style=""></iframe>
              </div>
            </Column>
          </Row>

          <Row class="vimo__btns">
            <Button shape="block" type="solid" @click="$router.push({'name':'components'})">组件</Button>
            <Button shape="block" type="solid" @click="$menu.open('menu')">打开菜单</Button>
            <Button shape="block" type="solid" @click="$menu.open('author')">项目介绍</Button>
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
            margin-top: 5px;
            margin-bottom: 5px;
            h1 {
              font-weight: bold;
            }
            p {
              margin: 5px 0;
              font-size: 12px;
              color: #2c3e50;
            }
            .vimo__text--iframe {
              display: flex;
              justify-content: center;
              align-items: center;
              iframe {
                width:90px;
              }
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
    methods:{},
    mounted(){}
  }
</script>

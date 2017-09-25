<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Icon</Title>
            </Navbar>
        </Header>
        <Content padding class="iconDemo">
            <h1>Icon组件</h1>
            <p>Vimo的Icon可以使用ionicons或者自定义图标(需要以icon-开头)</p>

            <h4>关于状态</h4>
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

            <h4>自定义激活状态</h4>
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


            <h4>自定义Icon</h4>

            <Icon name="icon-vue"></Icon>
            <Icon name="icon-vimo"></Icon>
            <Icon name="icon-alipay"></Icon>
            <Icon name="icon-wechat"></Icon>

            <h4>全平台显示一致</h4>
            <Icon name="md-star"></Icon>

            <h4>Logo Icons</h4>
            <Grid class="expo">
                <Row justify-content-center align-items-center v-for="(modeIcon,index1) in logoIconList" :key="index1">
                    <Column text-center v-for="(icon,index2) in modeIcon" :key="index2">
                        <Icon :name="'logo-'+icon"></Icon>
                        <p>logo-{{icon}}</p>
                    </Column>
                </Row>
            </Grid>

            <h4>Mode Icons</h4>
            <Grid class="expo">
                <Row justify-content-center align-items-center v-for="(modeIcon,index1) in modeIconList" :key="index1">
                    <Column text-center v-for="(icon,index2) in modeIcon" :key="index2">
                        <Icon :name="icon"></Icon>
                        <p>{{icon}}</p>
                    </Column>
                </Row>
            </Grid>
        </Content>
    </Page>
</template>
<style lang="less">
    .iconDemo .icon {
        font-size: 40px;
    }

    .icon-vue {
        height: 30px;
        width: 30px;
        background: url('../assets/vue.png') no-repeat center center/cover;
    }

    .icon-vimo {
        height: 30px;
        width: 30px;
        background: url('../assets/vimo.png') no-repeat center center/cover;
    }

    .icon-alipay {
        height: 30px;
        width: 40px;
        background: url('../assets/alipay.png') no-repeat center center/cover;
    }

    .icon-wechat {
        height: 30px;
        width: 36px;
        background: url('../assets/wechat.png') no-repeat center center/cover;
    }

    .expo {
        .ion-icon {
            font-size: 28px;
        }
        p {
            margin: 5px 0 0 0;
        }
    }
</style>
<script type="text/javascript">
  import modeIcons from 'ionicons/dist/data/mode-icons.json'
  import logoIcons from 'ionicons/dist/data/logo-icons.json'
  export default{
    data () {
      return {
        modeIconList: [],
        logoIconList: []
      }
    },
    methods: {
      getIcons (icons) {
        let count = 0
        let tmps = []
        let totals = []
        for (let key in icons) {
          count++
          if (count % 4 !== 0) {
            tmps.push(key)
          } else {
            totals.push(tmps)
            tmps = []
          }
        }
        return totals
      }
    },
    created () {
      this.modeIconList = this.getIcons(modeIcons)
      this.logoIconList = this.getIcons(logoIcons)
    },
    components: {}
  }
</script>

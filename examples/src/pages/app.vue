<template>
    <Page>
        <Header>
            <Navbar>
                <Title ref="title">App</Title>
            </Navbar>
        </Header>
        <Content class="outer-content" padding>

            <h5 here>简介</h5>
            <p>
                该组件是业务页面的父组件，业务页面挂载、页面状态、弹出层挂载安插等，都是在此组件中完成。
                组件注册初始化时，会将App组件实例插入到Vue.prototype中，便于业务页面对App组件的操控。
            </p>

            <Button block @click="$app.setEnabled(false,3000)">3秒内页面无法点击(setEnabled)</Button>
            <Button block @click="$app.setDisableScroll(true,3000)">3秒内页面无法滚动(setDisableScroll)</Button>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>

            <h5>注意: </h5>
            <p>方法this.$app.setDocTitle(val)只能设置document.title的值, Header中的Title组件请额外处理. 比如下面的按钮.</p>
            <Button block @click="setDocTitle()">设置DocTitle为当前时间</Button>
            <Button block @click="setAllTitle()">两者同时设置</Button>

            <p>点击Title能触发</p>
            <!--<Button block @click="clickTitle()">点击title</Button>-->

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>

            <section slot="fixedBottom" class="stateBar">
                <Grid no-padding>
                    <Row no-padding>
                        <Column>
                            <strong text-danger>App状态:</strong>
                            <p>isScrolling: {{$app.isScrolling}}</p>
                            <p>isEnabled: {{$app.isEnabled}}</p>
                        </Column>
                    </Row>
                </Grid>
            </section>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .stateBar {
        background: rgba(256, 256, 256, 0.9);
        padding: 10px 20px;
        p {
            margin: 5px 0;
        }
    }
</style>
<script type="text/javascript">
  let intervalTimer = null
  export default {
    data () {
      return {
//        isEnabled: false,

        isDisabled: false
      }
    },
    computed: {
      titleComponent () {
        return this.$refs.title
      }
    },
    methods: {
      getTime () {
        return new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
      },
      setDocTitle () {
        this.$app.setDocTitle(this.getTime())
      },
      setAllTitle () {
        this.setDocTitle()
        this.titleComponent.setTitle(this.getTime())
      },
      disableScroll () {
        const _this = this
        if (!_this.isDisabled) {
          _this.$app.disableScroll(true)
          _this.isDisabled = true
          setTimeout(function () {
            _this.$app.disableScroll(false)
            _this.isDisabled = false
          }, 3000)
        }
      }
    },
    created () {
      // 获取状态
//      intervalTimer = window.setInterval(() => {
//
//        console.log('update')
//      }, 200)

//      this.isEnabled = this.$app.isEnabled()
    },
    mounted () {
//      this.$indicator.present()
//      window.setTimeout(() => {
//        this.$indicator.dismiss()
//      }, 3000)
    },
    activated () {
    },
    destroyed () {
      window.clearInterval(intervalTimer)
    },
    components: {}
  }
</script>

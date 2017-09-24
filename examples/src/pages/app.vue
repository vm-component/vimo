<template>
    <Page>
        <Header>
            <Navbar>
                <Title ref="title">App</Title>
            </Navbar>
        </Header>
        <Content class="outer-content" padding>

            <h1>App组件</h1>
            <p>
                该组件是业务页面的父组件，业务页面挂载、页面状态、弹出层挂载安插等，都是在此组件中完成。
                组件注册初始化时，会将App组件实例插入到Vue.prototype中，便于业务页面对App组件的操控。
            </p>


            <p><strong>3秒内页面无法点击</strong></p>
            <small>在当前页面覆盖一层透明蒙版, 阻挡进一步操作.</small>
            <Button block @click="$app.setEnabled(false,3000)">冷冻页面</Button>

            <p><strong>3秒内页面无法滚动</strong></p>
            <small>组织滚动元素操作事件</small>
            <Button block @click="$app.setDisableScroll(true,3000)">无法滚动</Button>

            <p><strong>设置标题</strong></p>
            <p>方法this.$app.setDocTitle(val)只能设置document.title的值, Header中的Title组件请额外处理. 比如下面的按钮.</p>
            <Button block @click="setDocTitle()">设置 document.title 为当前时间</Button>
            <Button block @click="setAllTitle()">两者同时设置</Button>

            <p><strong>在根组件添加全局class+='hello-vimo'</strong></p>
            <Button block @click="$app.setClass('hello-vimo',toggle),toggle=!toggle">Toggle设置</Button>
            <section padding class="hello-vimo-here">
                <strong>设置成功</strong>
            </section>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>

            <!--<p>点击Title能触发</p>-->
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
                            <p>isScrollDisabled: {{$app.isScrollDisabled}}</p>
                        </Column>
                    </Row>
                </Grid>
            </section>
        </Content>
    </Page>
</template>
<style lang="less">
    .hello-vimo-here {
        text-align: center;
        color: red;
        display: none;
    }

    .hello-vimo {
        .hello-vimo-here {
            display: block;
        }
    }
</style>
<style scoped lang="less">
    .stateBar {
        background: rgba(256, 256, 256, 0.9);
        padding: 10px 20px;
        p {
            margin: 5px 0;
        }
    }
</style>
<script type="text/javascript">
  export default {
    data () {
      return {
        toggle: true,
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
      }
    }
  }
</script>

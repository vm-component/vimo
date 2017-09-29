<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Log</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <div padding>
                <h5>简介</h5>
                <p>Log服务是用于截断console并显示的插件, 该服务自带展开界面. 但是在默认情况下不初始化界面组件. 如果配置要求开启则另当别论.</p>
                <p>点击初始化Log界面后, log开启的按钮就在左下角.</p>
                <Button :disabled="isInit" block @click="initLogPage">初始化Log界面</Button>
                <Button block @click="$log.open()">展开Log界面</Button>
            </div>
            <List>
                <ListHeader>测试</ListHeader>
                <Item class="log">
                    <span>console.log(new Date())</span>
                    <Button slot="item-right" outline small @click="printLog">Print</Button>
                </Item>
                <Item class="debug">
                    <span>console.debug(new Date())</span>
                    <Button slot="item-right" outline small @click="printDebug">Print</Button>
                </Item>
                <Item class="info">
                    <span>console.info(new Date())</span>
                    <Button slot="item-right" outline small @click="printInfo">Print</Button>
                </Item>
                <Item class="warn">
                    <span>console.warn(new Date())</span>
                    <Button slot="item-right" outline small @click="printWarn">Print</Button>
                </Item>
                <Item class="error">
                    <span>console.error(new Date())</span>
                    <Button slot="item-right" outline small @click="printError">Print</Button>
                </Item>
                <Item class="assert">
                    <span>console.assert(new Date())</span>
                    <Button slot="item-right" outline small @click="printAssert">Print</Button>
                </Item>
            </List>
            <List>
                <ListHeader>特殊错误</ListHeader>
                <Item class="error">
                    <span>JSON.parse error</span>
                    <Button slot="item-right" outline small @click="jsonError">Print</Button>
                </Item>
                <Item class="error">
                    <span>自定义错误</span>
                    <Button slot="item-right" outline small @click="editedError">Print</Button>
                </Item>
                <Item class="error">
                    <span>url解析错误</span>
                    <Button slot="item-right" outline small @click="decodeUrlError">Print</Button>
                </Item>
                <Item class="error">
                    <span>在window上监听error事件(最终)</span>
                    <Button slot="item-right" outline small @click="withoutTryCatch">Print</Button>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="less">

    @log: #757575;
    @debug: #36a8ee;
    @info: #32b208;
    @warn: #ff8f0e;
    @error: #ff0000;
    @assert: #ff0000;
    .log {
        color: @log
    }

    .debug {
        color: @debug
    }

    .info {
        color: @info
    }

    .warn {
        color: @warn
    }

    .error {
        color: @error
    }

    .assert {
        color: @assert
    }
</style>
<script type="text/javascript">
  export default {
    name: 'name',
    data () {
      return {
        stata: null,
        isInit: this.$log._isLogPageInit
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      initLogPage () {
        this.$log.init()
        this.isInit = true
      },
      printLog () {
        console.log(new Date())
      },
      printDebug () {
        console.debug(new Date())
      },
      printInfo () {
        console.info(new Date())
      },
      printWarn () {
        console.warn(new Date())
      },
      printError () {
        console.error(new Date())
      },
      printAssert () {
        console.assert(false, new Date())
      },
      jsonError () {
        try {
          JSON.parse('123.,.')
        } catch (err) {
          console.error(err)
        }
      },
      editedError () {
        console.info('参数顺序: msg/errName/script/line')
        console.error('未得到ajax的数据', 'AJAX TIMEOUT/FAIL', './getData.js::<Function>getInfo()', '12')
      },
      decodeUrlError () {
        try {
          window.decodeURI('%2')
        } catch (err) {
          console.error(err)
        }
      },
      withoutTryCatch () {
        window.decodeURI('%2')
      }
    },
    created () {},
    mounted () {
// //      console.debug(this.$log)
//      console.error('断言错误','AJAX ASSERT ERROR','./getData.js::<Function>getInfo()','12')
//      console.assert(false, '这个值必须是String类型','AJAX ASSERT ERROR','./getData.js::<Function>getInfo()','12')

    },
    activated () {}
  }
</script>

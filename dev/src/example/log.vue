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
                <Button block @click="$log.init()">初始化Log界面</Button>
                <Button block @click="$log.open()">展开Log界面</Button>
            </div>
            <h5 class="testTitle">测试</h5>
            <div padding class="testBox">
                <div class="testBox__each log">
                    <span>console.log(new Date())</span>
                    <Button outline small @click="printLog">Print</Button>
                </div>
                <div class="testBox__each debug">
                    <span>console.debug(new Date())</span>
                    <Button outline small @click="printDebug">Print</Button>
                </div>
                <div class="testBox__each info">
                    <span>console.info(new Date())</span>
                    <Button outline small @click="printInfo">Print</Button>
                </div>
                <div class="testBox__each warn">
                    <span>console.warn(new Date())</span>
                    <Button outline small @click="printWarn">Print</Button>
                </div>
                <div class="testBox__each error">
                    <span>console.error(new Date())</span>
                    <Button outline small @click="printError">Print</Button>
                </div>
                <div class="testBox__each assert">
                    <span>console.assert(new Date())</span>
                    <Button outline small @click="printAssert">Print</Button>
                </div>
            </div>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

    $log: #757575;
    $debug: #36a8ee;
    $info: #32b208;
    $warn: #ff8f0e;
    $error: #ff0000;
    $assert: #ff0000;
    .log {
        color: $log
    }

    .debug {
        color: $debug
    }

    .info {
        color: $info
    }

    .warn {
        color: $warn
    }

    .error {
        color: $error
    }

    .assert {
        color: $assert
    }

    .testTitle {
        padding: 0 16px;
        margin: 0;
        line-height: 130%
    }

    .testBox {
        .testBox__each {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
<script type="text/javascript">
  export default{
    name: 'name',
    data () {
      return {
        stata: null
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
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
      }

    },
    created () {},
    mounted () {
      console.debug(this.$log)
    },
    activated () {},
    components: {}
  }
</script>

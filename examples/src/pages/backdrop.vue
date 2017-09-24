<template>
    <Page>
        <Header>
            <Navbar>
                <Title title="Backdrop"></Title>
            </Navbar>
        </Header>
        <Content padding>


            <h3>BackDrop组件</h3>

            <h5>可以实例化调用也可以模板式调用</h5>

            <p>打开Backdrop, 4000ms之后关闭, 或者点击关闭</p>
            <Button block @click="present">打开Backdrop</Button>

            <p>打开Backdrop, 上部留白100px, 点击关闭</p>
            <Button block @click="presentWithTopWhite">打开Backdrop</Button>

            <p>打开Backdrop, 右边留白100px, 点击关闭</p>
            <Button block @click="presentWithRightWhite">打开Backdrop</Button>

            <p>打开Backdrop, 底部留白100px, 点击关闭</p>
            <Button block @click="presentWithBottomWhite">打开Backdrop</Button>

            <p>打开Backdrop, 左边留白100px, 点击关闭</p>
            <Button block @click="presentWithLeftWhite">打开Backdrop</Button>

            <p>在下面的DIV中显示Backdrop, 点击关闭(模板式)</p>
            <div id="backdropInDiv">
                <Backdrop :isActive="isActiveInner" :bdClick="function () {isActiveInner=!isActiveInner}"></Backdrop>
                <span>Hello, Vimo!</span>
            </div>
            <Button block @click="isActiveInner=!isActiveInner">打开Backdrop</Button>

            <!--当前的幕布-->
            <Backdrop :isActive="isActive" :bdClick="function () {isActive=!isActive}" :top="top" :left="left"
                      :fixed="true"></Backdrop>
        </Content>
    </Page>
</template>

<style lang="less">
    #backdropInDiv {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;
        background: #ddd;
        position: relative;
    }
</style>
<script type="text/javascript">
  export default{
    data () {
      return {
        isActive: false,
        isActiveInner: false,
        top: 0,
        left: 0
      }
    },
    methods: {
      present () {
        this.isActive = true
        this.top = 0
        this.left = 0
      },
      presentWithTopWhite () {
        this.top = 100
        this.left = 0
        this.isActive = true
      },
      presentWithRightWhite () {
        this.top = 0
        this.left = -100
        this.isActive = true
      },
      presentWithBottomWhite () {
        this.top = -100
        this.left = 0
        this.isActive = true
      },
      presentWithLeftWhite () {
        this.top = 0
        this.left = 100
        this.isActive = true
      }
    }
  }
</script>

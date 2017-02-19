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
      <Button type="block" @click="present">打开Backdrop</Button>

      <p>打开Backdrop, 上部留白100px, 点击关闭</p>
      <Button type="block" @click="presentWithTopWhite">打开Backdrop</Button>

      <p>打开Backdrop, 右边留白100px, 点击关闭</p>
      <Button type="block" @click="presentWithRightWhite">打开Backdrop</Button>

      <p>打开Backdrop, 底部留白100px, 点击关闭</p>
      <Button type="block" @click="presentWithBottomWhite">打开Backdrop</Button>

      <p>打开Backdrop, 左边留白100px, 点击关闭</p>
      <Button type="block" @click="presentWithLeftWhite">打开Backdrop</Button>

      <p>在下面的DIV中显示Backdrop, 点击关闭(模板式)</p>
      <div id="backdropInDiv">
        <Backdrop :isActive="isActive" :bdClick="function(){isActive=!isActive}"></Backdrop>
        Hello, Vimo!
      </div>
      <Button type="block" @click="isActive=!isActive">打开Backdrop</Button>

    </Content>
  </Page>
</template>
<style lang="scss">
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
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        isActive: false
      }
    },
    methods: {
      present(){
        const _this = this;
        let _timer;
        _this.$backdrop.present({
          bdClick () {
            clearTimeout(_timer)
            _this.$backdrop.dismiss()
          }
        });
        _timer = setTimeout(function () {
          _this.$backdrop.dismiss()
        }, 4000);
      },
      presentWithTopWhite(){
        const _this = this;
        _this.$backdrop.present({
          position: {
            top: '100px'
          },
          bdClick () {
            _this.$backdrop.dismiss()
          }
        });
      },
      presentWithRightWhite(){
        const _this = this;
        _this.$backdrop.present({
          position: {
            right: '100px'
          },
          bdClick () {
            _this.$backdrop.dismiss()
          }
        });
      },
      presentWithBottomWhite(){
        const _this = this;
        _this.$backdrop.present({
          position: {
            bottom: '100px'
          },
          bdClick () {
            _this.$backdrop.dismiss()
          }
        });
      },
      presentWithLeftWhite(){
        const _this = this;
        _this.$backdrop.present({
          position: {
            left: '100px'
          },
          bdClick () {
            _this.$backdrop.dismiss()
          }
        });
      },
    }
  }
</script>

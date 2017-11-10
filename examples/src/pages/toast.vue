<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Toast</Title>
            </Navbar>
        </Header>
        <Content padding>
            <h5>简介</h5>
            <p>Toast用于将应用状态传递给用户, 提示一般自动关闭.</p>

            <p>传参指纹: this.$toast('显示Toast提示')</p>
            <Button block @click="toastBottomOnlyString()">只传入String</Button>

            <p>传参指纹: this.$toast('显示Toast提示',1000)</p>
            <Button block @click="toastBottomWithStringAndDuration()">String + Duration(1000)</Button>

            <p>传参指纹: this.$toast({...})</p>
            <Button id="top" block @click="toastTop($event)">顶部出现</Button>
            <Button block @click="toastButtom()">底部出现</Button>
            <Button block @click="toastMiddle()">显示在中间</Button>
            <Button block @click="toastMiddleWithBtn()">显示在中间 + 按钮</Button>
            <Button block @click="showCloseBtnToast()">显示在顶部 + 按钮</Button>
        </Content>
    </Page>
</template>
<style lang="less">
</style>
<script type="text/javascript">
  export default{

    data () {
      return {}
    },
    watch: {},
    computed: {},
    methods: {
      toastBottomOnlyString () {
        let _toastIns = this.$toast('Toast Bottom Only String', 4000)
        setTimeout(function () {
          _toastIns.dismiss()
        }, 3000)
      },

      toastBottomWithStringAndDuration () {
        this.$toast('Toast Bottom With String And Druation', 1000)
      },

      toastTop ($event) {
        const _this = this

        _this.$toast({
          message: 'Top was added successfully',
          duration: 3000,
          position: 'top',
          dismissOnPageChange: true,
          onDismiss () {
            console.debug('1 onDismiss in promise success!')
          }
        })
      },
      toastButtom () {
        const _this = this
        _this.$toast({
          message: 'Bottom was added successfully',
          duration: 3000,
          position: 'bottom',
          dismissOnPageChange: true,
          onDismiss () {
            console.debug('2 onDismiss in promise success!')
          }
        })
      },
      toastMiddle () {
        const _this = this
        _this.$toast({
          message: 'Middle was added successfully',
          duration: 3000,
          position: 'middle',
          dismissOnPageChange: true,
          onDismiss () {
            console.debug('3 onDismiss in promise success!')
          }
        })
      },
      toastMiddleWithBtn () {
        const _this = this
        _this.$toast({
          message: 'Middle with Button was added successfully',
          duration: 3000, // 这个不生效
          showCloseButton: true,
          closeButtonText: 'OK',
          position: 'middle',
          dismissOnPageChange: false,
          onDismiss () {
            console.debug('4 onDismiss in promise success!')
          }
        })
      },
      showCloseBtnToast () {
        const _this = this
        _this.$toast.present({
          message: 'Top with Button was added successfully',
          duration: 3000, // 这个不生效
          position: 'top',
          showCloseButton: true,
          closeButtonText: '好的',
          cssClass: 'showCloseBtnToastCssClass',
          dismissOnPageChange: true,
          onDismiss () {
            console.debug('5 onDismiss in promise success!')
          }
        })
      }
    },
    mounted () {}
  }
</script>

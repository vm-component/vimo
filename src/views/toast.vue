<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Toast</Title>
      </Navbar>
    </Header>
    <Content padding>

      <p>传参指纹: this.$toast.present('显示Toast提示')</p>
      <Button type="block" @click="toastBottomOnlyString()">只传入String</Button>

      <p>传参指纹: this.$toast.present('显示Toast提示',1000)</p>
      <Button type="block" @click="toastBottomWithStringAndDuration()">String + Duration(1000)</Button>

      <p>传参指纹: this.$toast.present({...})</p>
      <Button type="block" @click="toastTop()">Toast Top</Button>
      <Button type="block" @click="toastButtom()">Toast Bottom</Button>
      <Button type="block" @click="toastMiddle()">Toast Middle</Button>
      <Button type="block" @click="toastMiddleWithBtn()">Toast Middle With Button</Button>
      <Button type="block" @click="showCloseBtnToast()">Toast Top With Button</Button>
    </Content>
  </Page>
</template>
<style lang="scss">
</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {}
    },
    watch: {},
    computed: {},
    methods: {
      toastBottomOnlyString(){
        this.$toast.present('Toast Bottom Only String')
      },

      toastBottomWithStringAndDuration(){
        this.$toast.present('Toast Bottom With String And Druation',1000)
      },


      toastTop () {
        const _this = this;
        _this.$toast.present({
          message: 'Top was added successfully',
          duration: 3000,
          position: 'top',
          dismissOnPageChange:true,
          onDismiss () {
            console.debug('1 onDismiss in promise success!')
          }
        })
      },
      toastButtom () {
        const _this = this;
        _this.$toast.present({
          message: 'Bottom was added successfully',
          duration: 3000,
          position: 'bottom',
          dismissOnPageChange:true,
          onDismiss () {
            console.debug('2 onDismiss in promise success!')
          }
        });
      },
      toastMiddle () {
        const _this = this;
        _this.$toast.present({
          message: 'Middle was added successfully',
          duration: 3000,
          position: 'middle',
          dismissOnPageChange:true,
          onDismiss () {
            console.debug('3 onDismiss in promise success!')
          }
        });
      },
      toastMiddleWithBtn () {
        const _this = this;
        _this.$toast.present({
          message: 'Middle with Button was added successfully',
          duration: 3000, // 这个不生效
          showCloseButton: true,
          closeButtonText: 'OK',
          position: 'middle',
          dismissOnPageChange:false,
          onDismiss () {
            console.debug('4 onDismiss in promise success!')
          }
        });
      },
      showCloseBtnToast () {
        const _this = this;
        _this.$toast.present({
          message: 'Top with Button was added successfully',
          duration: 3000, // 这个不生效
          position: 'top',
          showCloseButton: true,
          closeButtonText: '好的',
          cssClass: 'showCloseBtnToastCssClass',
          dismissOnPageChange:true,
          onDismiss () {
            console.debug('5 onDismiss in promise success!')
          }
        })
      },

    },
    created () {
    },
    mounted () {
    },
    activated () {
    },
  }
</script>

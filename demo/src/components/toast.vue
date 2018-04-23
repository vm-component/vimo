<template>
    <Page>
        <Header>
            <Navbar>
                <Title>{{$t('title')}}</Title>
            </Navbar>
        </Header>
        <Content padding>
            <p>{{$t('parameter')}}: this.$toast('Show Toast...')</p>
            <Button block @click="toastBottomOnlyString()">{{$t('open')}}</Button>

            <p>{{$t('parameter')}}: this.$toast('Show Toast...',1000)</p>
            <Button block @click="toastBottomWithStringAndDuration()">String + Duration(1000)</Button>

            <p>{{$t('parameter')}}: this.$toast({...})</p>
            <Button id="top" block @click="toastTop($event)">{{$t('openTop')}}</Button>
            <Button block @click="toastButtom()">{{$t('openBottom')}}</Button>
            <Button block @click="toastMiddle()">{{$t('openMiddle')}}</Button>
            <Button block @click="toastMiddleWithBtn()">{{$t('openMiddle')}} + {{$t('btn')}}</Button>
            <Button block @click="showCloseBtnToast()">{{$t('openTop')}} + {{$t('btn')}}</Button>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga rerum tenetur unde. Ab accusamus aliquam amet corporis cupiditate deleniti
               deserunt, expedita, id impedit modi nulla obcaecati quia, rem sint temporibus!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga rerum tenetur unde. Ab accusamus aliquam amet corporis cupiditate deleniti
               deserunt, expedita, id impedit modi nulla obcaecati quia, rem sint temporibus!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga rerum tenetur unde. Ab accusamus aliquam amet corporis cupiditate deleniti
               deserunt, expedita, id impedit modi nulla obcaecati quia, rem sint temporibus!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga rerum tenetur unde. Ab accusamus aliquam amet corporis cupiditate deleniti
               deserunt, expedita, id impedit modi nulla obcaecati quia, rem sint temporibus!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga rerum tenetur unde. Ab accusamus aliquam amet corporis cupiditate deleniti
               deserunt, expedita, id impedit modi nulla obcaecati quia, rem sint temporibus!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga rerum tenetur unde. Ab accusamus aliquam amet corporis cupiditate deleniti
               deserunt, expedita, id impedit modi nulla obcaecati quia, rem sint temporibus!</p>
        </Content>
    </Page>
</template>
<style lang="scss">
</style>
<script type="text/javascript">
  export default {
    name: 'DemoToast',
    i18n: {
      messages: {
        'zh-CN': {
          title: '通知',
          open: '开启',
          parameter: '传参',
          openTop: '顶部出现',
          openBottom: '底部出现',
          openMiddle: '显示在中间',
          btn: '按钮'
        },
        'en-US': {
          title: 'Toast',
          open: 'Open',
          parameter: 'Parameter',
          openTop: 'open Top',
          openBottom: 'open Bottom',
          openMiddle: 'open Middle',
          btn: 'Button'
        }
      }
    },
    methods: {
      toastBottomOnlyString () {
        let _toastIns = this.$toast.present('Toast Bottom Only String', 4000)
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
          closeButtonText: 'OK',
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

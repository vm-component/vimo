<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Toast</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content padding>
            <h5>简介</h5>
            <p>Toast用于将应用状态传递给用户, 提示一般自动关闭.</p>

            <p>传参指纹: this.$toast('显示Toast提示')</p>
            <vm-button block @click="toastBottomOnlyString()">只传入String</vm-button>

            <p>传参指纹: this.$toast('显示Toast提示',1000)</p>
            <vm-button block @click="toastBottomWithStringAndDuration()">String + Duration(1000)</vm-button>

            <p>传参指纹: this.$toast({...})</p>
            <vm-button id="top" block @click="toastTop($event)">顶部出现</vm-button>
            <vm-button block @click="toastButtom()">底部出现</vm-button>
            <vm-button block @click="toastMiddle()">显示在中间</vm-button>
            <vm-button block @click="toastMiddleWithBtn()">显示在中间 + 按钮</vm-button>
            <vm-button block @click="showCloseBtnToast()">显示在顶部 + 按钮</vm-button>
        </vm-content>
    </vm-page>
</template>
<style lang="scss">
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
        _this.$toast({
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
    mounted () {
      console.log('toast.vue')
      console.log(this)
    }
  }
</script>

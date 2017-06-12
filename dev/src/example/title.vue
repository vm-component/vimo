<template>
    <Page>
        <Header>
            <Navbar ref="navbar">
                <Title ref="title" @onTitleClick="onTitleClickHandler">TitleTitleTitleTitleTitleTitleTitle</Title>
                <!--menutoggle-->
                <Button right icon-only role="bar-button" menutoggle slot="buttons" @click="openSetting($event)">
                    <Icon class="icon" name="menu" color="dark"></Icon>
                </Button>
            </Navbar>
        </Header>
        <Content class="outer-content" padding>
            <h5>简介</h5>

            <Button block @click="onlyChangeTheTitle">只改变当前Title</Button>
            <Button block @click="changeTitleForBoth">同时改变DocumentTitle</Button>

            <p>也可以将文字的title改成图片，用于伪造搜索、Logo、活动图片等场景</p>
            <Button block @click="setTitleWithSearchImg">改成搜索</Button>
            <Button block @click="setTitleWithLogoImg">改成Vue Logo</Button>

            <p>设置Navbar</p>
            <Button block @click="setBackgroundColor">改变背景颜色</Button>
            <Button block @click="setBorderBottomColor">改变底边框颜色</Button>
            <Button block @click="reset">重置</Button>

            <p>Navbar创建右上角按钮</p>
            <Button block @click="setOptionMenu">设置右上角按钮</Button>

        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .main {

    }
</style>
<script type="text/javascript">
  import { Popover } from 'vimo/components/popover'
  export default{
    data () {
      return {}
    },
    watch: {},
    computed: {
      titleComponent () {
        return this.$refs.title
      },
      navbarComponent () {
        return this.$refs.navbar
      }
    },
    methods: {
      onlyChangeTheTitle () {
        this.titleComponent.setTitle('只改变组件', false)
      },
      changeTitleForBoth () {
        this.titleComponent.setTitle('同时改变')
      },
      setTitleWithSearchImg () {
        this.titleComponent.setTitle({
          image: 'https://zos.alipayobjects.com/rmsportal/jFCQxeOXeKTQUfhrQFOo.png'
        })
      },
      setTitleWithLogoImg () {
        this.titleComponent.setTitle({
          image: 'http://cn.vuejs.org/images/logo.png'
        })
      },
      reset () {
        this.titleComponent.reset()
        this.navbarComponent.reset()
      },
      onTitleClickHandler () {
        alert('点击了标题，如果是图片则会有跳转的需求')
      },
      setBackgroundColor () {
        this.navbarComponent.setBackgroundColor('#000')
      },
      setBorderBottomColor () {
        this.navbarComponent.setBorderBottomColor('#000')
      },

      openSetting ($event) {
        Popover.present({
          ev: $event,                           // 事件
          component: `<p style="padding:0 14px;" text-center>You choose the word of <strong>123</strong>.</p>`,
          data: {
//            contentEle: this.$refs.content.$el  // 传入数据, 内部通过`this.$options.$data`获取这个data
          }
        })
      },

      setOptionMenu () {
//        setOptionMenu

//        window.AlipayJSBridge.call('setOptionMenu', {
//          title: '按钮',
//          redDot: '5', // -1表示不显示，0表示显示红点，1-99表示在红点上显示的数字
//          color: '#ff00ff00' // 必须以＃开始ARGB颜色值
//        })

        window.AlipayJSBridge.call('setOptionMenu', {
          // 显示的时候是从后往前显示的
          menus: [
            {
              title : '按钮',
              redDot : '5', // -1表示不显示，0表示显示红点，1-99表示在红点上显示的数字
              color : '#ff00ff00', // 必须以＃开始ARGB颜色值
            },
            {
              icontype: 'scan',
              redDot: '-1' // -1表示不显示，0表示显示红点，1-99表示在红点上显示的数字
            },
            {
              icontype: 'user',
              redDot: '-1' // -1表示不显示，0表示显示红点，1-99表示在红点上显示的数字
            },
            {
              icontype: 'scan',
              redDot: '-1' // -1表示不显示，0表示显示红点，1-99表示在红点上显示的数字
            },
            {
              icontype: 'user',
              redDot: '-1' // -1表示不显示，0表示显示红点，1-99表示在红点上显示的数字
            }
          ],
          override: true //在需要设置多个option的情况下，是否保留默认的optionMenu
        })

        // 必须强制调用一把刷新界面
        window.AlipayJSBridge.call('showOptionMenu')

      }

    },
    created () {},
    mounted () {

    },
    activated () {},
    components: {}
  }
</script>

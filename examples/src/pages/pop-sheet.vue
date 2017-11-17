<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>PopSheet</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content padding class="outer-content">
            <h1>PopSheet组件</h1>
            <p>组件用于在页面中弹出一个对话框，比如输入表单选择什么的，个性化程度比较高，而alert组件无法满足的需求。组件将在页面中书写，内置方法开关，而不是插入到DOM中。</p>
            <p>内容: {{name}} - {{password}}</p>

            <vm-list>
                <vm-list-header>特性</vm-list-header>
                <vm-item>
                    <vm-label>显示背景</vm-label>
                    <vm-toggle v-model="showBackdrop"></vm-toggle>
                </vm-item>
                <vm-item>
                    <vm-label>点击背景关闭</vm-label>
                    <vm-toggle v-model="enableBackdropDismiss"></vm-toggle>
                </vm-item>
            </vm-list>

            <vm-button block @click="openPopSheet">登录</vm-button>
            <div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet blanditiis consequatur, delectus deleniti dolor ea, excepturi fuga laborum nemo provident recusandae rerum soluta vel veritatis vitae voluptatem voluptates!</p>
            </div>
            <!--paySheet-->
            <vm-pop-sheet
                    ref="popSheet"
                    slot="fixed"
                    :enableBackdropDismiss="enableBackdropDismiss"
                    :showBackdrop="showBackdrop">
                <div class="popSheet">
                    <h2>TITLE</h2>
                    <h5>这是内容, 宽度高度自定义</h5>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, eaque earum eum ex expedita facere fugit ipsa ipsum minima nemo nostrum, pariatur placeat qui quis quod quos repellendus tempora unde.</p>
                    <vm-list>
                        <vm-item>
                            <vm-label>名称</vm-label>
                            <vm-input v-model="name" type="text" placeholder="请输入用户名" clear-input></vm-input>
                        </vm-item>
                        <vm-item>
                            <vm-label>密码</vm-label>
                            <vm-input v-model="password" type="password" placeholder="请输入密码" clear-input></vm-input>
                        </vm-item>
                    </vm-list>

                    <vm-button block @click="closePopSheet">确认</vm-button>
                </div>
            </vm-pop-sheet>
            <!--shareSheet-->
        </vm-content>
    </vm-page>
</template>
<script type="text/javascript">
  export default {
    name: 'PopSheetDemo',
    components: {},
    // data
    props: {},
    data () {
      return {
        enableBackdropDismiss: true,
        showBackdrop: true,
        name: '',
        password: ''
      }
    },
    computed: {
      popSheetComponent () {
        return this.$refs.popSheet
      }
    },
    // methods
    methods: {
      closePopSheet () {
        return this.popSheetComponent.dismiss()
      },
      openPopSheet () {
        return this.popSheetComponent.present()
      }
    },
    // life hook
    beforeCreate () {},
    created () {},
    beforeMount () {},
    mounted () {},
    beforeUpdate () {},
    updated () {},
    activated () {},
    deactivated () {},
    beforeDestroy () {},
    destroyed () {}
  }
</script>
<style scoped lang="scss">
    .popSheet {
        /*height: 300px;*/
        width: 300px;
        background: #fff;
        border-radius: 10px;
        padding: 25px;
    }
</style>

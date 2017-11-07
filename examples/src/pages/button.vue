<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Button</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content padding>
            <h1>Button组件</h1>
            <p>该组件属于通用组件, 一般用于绑定事件触发动作, 可以是不用加native修饰符使用, 例如: @click="action()"</p>
            <h4>Colors</h4>
            <vm-grid>
                <vm-row justify-content-center>
                    <vm-button @click="primary()" color="primary">primary</vm-button>
                    <vm-button color="secondary" :isStrong="true">secondary</vm-button>
                    <vm-button color="danger">danger</vm-button>
                    <vm-button color="light">light</vm-button>
                    <vm-button color="light" disabled>light</vm-button>
                    <vm-button color="dark">dark</vm-button>
                    <vm-button>default color</vm-button>
                </vm-row>
            </vm-grid>
            <h4>Strong</h4>
            <vm-grid>
                <vm-row justify-content-center>
                    <vm-button active color="primary">primary</vm-button>
                    <vm-button active color="primary" strong>primary(strong)</vm-button>
                </vm-row>
            </vm-grid>
            <h4>Active</h4>
            <vm-grid>
                <vm-row justify-content-center>
                    <vm-button active color="primary">primary</vm-button>
                    <vm-button active color="primary" full>primary+full</vm-button>
                    <vm-button active color="primary" block>primary+block</vm-button>
                    <vm-button active color="primary" round>primary+round</vm-button>
                    <vm-button active color="primary" outline>primary+outline</vm-button>
                    <vm-button active color="primary" clear>primary+clear</vm-button>
                </vm-row>
            </vm-grid>
            <h4>Spinner</h4>
            <vm-grid>
                <vm-row justify-content-center>
                    <vm-button>
                        <span>Loading</span>
                        <vm-spinner color="light" name="ios-small"></vm-spinner>
                    </vm-button>
                </vm-row>
            </vm-grid>
            <h4>Full/Block/Round</h4>
            <vm-grid>
                <vm-row justify-content-center>
                    <vm-button full>full</vm-button>
                    <vm-button block>block</vm-button>
                    <vm-button round>round</vm-button>
                </vm-row>
            </vm-grid>
            <h4>Solid/Outline/Clear</h4>
            <vm-grid>
                <vm-row justify-content-center>
                    <!--solid-->
                    <vm-button solid color="secondary">solid</vm-button>
                    <vm-button outline color="secondary">outline</vm-button>
                    <vm-button outline color="danger">outline</vm-button>
                    <vm-button clear color="secondary">clear</vm-button>
                </vm-row>
            </vm-grid>
            <h4>Outline + Full/Block/Round</h4>
            <vm-grid>
                <vm-row justify-content-center>
                    <vm-button outline full color="secondary">outline + full</vm-button>
                    <vm-button outline block color="secondary">outline + block</vm-button>
                    <vm-button outline round color="secondary">outline + round</vm-button>
                </vm-row>
            </vm-grid>
            <h4>Large/Default/Small</h4>
            <vm-grid>
                <vm-row justify-content-center>
                    <vm-button color="light" large>large</vm-button>
                    <vm-button color="light" default>default</vm-button>
                    <vm-button color="light" small>small</vm-button>
                </vm-row>
            </vm-grid>
            <h4>Icons + Left/Only/Right</h4>
            <vm-grid>
                <vm-row justify-content-center>
                    <!--icon left-->
                    <vm-button color="dark">
                        <vm-icon class="icon" name="star"></vm-icon>
                        <span>Left Icon</span>
                    </vm-button>
                    <!--no icon-->
                    <vm-button color="dark">
                        <span> No Icon</span>
                    </vm-button>
                    <!--icon only-->
                    <vm-button color="dark">
                        <vm-icon class="icon" name="star"></vm-icon>
                    </vm-button>
                    <!--icon only-->
                    <vm-button color="dark">
                        <vm-icon class="icon" name="star"></vm-icon>
                    </vm-button>
                    <!--icon right-->
                    <vm-button color="dark">
                        <span>Right Icon</span>
                        <vm-icon class="icon" name="star"></vm-icon>
                    </vm-button>
                </vm-row>
            </vm-grid>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">
    .buttons {
        text-align: center;
    }
</style>
<script type="text/javascript">
  export default {
    data () {
      return {}
    },
    methods: {
      primary: function () {
        console.log('primary')
      }
    }
  }
</script>

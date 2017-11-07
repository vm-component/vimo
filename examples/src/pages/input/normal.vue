<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Normal</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-list>
                <vm-list-header>
                    <span>布局</span>
                </vm-list-header>
                <vm-item>
                    <vm-label color="primary">Inline Label</vm-label>
                    <Input placeholder="Text Input"></Input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" fixed>Fixed Label with fixed width</vm-label>
                    <Input type="tel" placeholder="Tel Input"></Input>
                </vm-item>
                <vm-item>
                    <Input type="number" placeholder="Number Input with no label"></Input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>Stacked Label</vm-label>
                    <Input type="email" placeholder="Email Input"></Input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" floating>Floating Label</vm-label>
                    <Input type="text"></Input>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>
                    <span>右侧清除按钮</span>
                </vm-list-header>
                <vm-item>
                    <Input placeholder="Clear Input" clearInput></Input>
                </vm-item>
            </vm-list>

            <vm-list>
                <vm-list-header>
                    <span>Password(自动清除)</span>
                </vm-list-header>
                <vm-item>
                    <vm-label color="primary" stacked>Password</vm-label>
                    <Input type="password" placeholder="Password Input"></Input>
                </vm-item>
            </vm-list>

            <vm-list>
                <vm-list-header>
                    <span>Test</span>
                </vm-list-header>
                <vm-item>
                    <vm-label color="primary">TestValue</vm-label>
                    <Input :clearInput="true"
                           :max="18"
                           placeholder="最多输入18个字符"
                           v-model="testValue"
                           :disabled="testDisabled"></Input>
                </vm-item>
                <vm-item>
                    <span slot="item-left"> 当前的值({{testValue.length}}): {{testValue}}</span>
                    <vm-button slot="item-right" small outline @click="testDisabled = !testDisabled">Disable</vm-button>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>Focus Highlight</vm-list-header>
                <vm-item>
                    <vm-label color="primary">聚焦高亮</vm-label>
                    <Input :showFocusHighlight="true" placeholder="输入文本" type="text" clearInput></Input>
                </vm-item>
            </vm-list>

            <vm-list>
                <vm-list-header>Input单独使用</vm-list-header>

                <section class="customer">
                    <Input :showFocusHighlight="true" placeholder="输入文本" type="text" clearInput></Input>
                </section>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<script type="text/javascript">
  export default {
    name: 'InputDemo',
    data () {
      return {
        testValue: 'Edit...',
        testDisabled: false
      }
    }
  }
</script>
<style lang="less">
    .customer {
        width: 80%;
        height: 40px;
        background-color: #ffffff;
        color: #000000;
        margin: 10px auto;
        padding-left: 10px;
    }
</style>
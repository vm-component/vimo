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
                    <vm-input placeholder="Text Input"></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" fixed>Fixed Label with fixed width</vm-label>
                    <vm-input type="tel" placeholder="Tel Input"></vm-input>
                </vm-item>
                <vm-item>
                    <vm-input type="number" placeholder="Number Input with no label"></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>Stacked Label</vm-label>
                    <vm-input type="email" placeholder="Email Input"></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" floating>Floating Label</vm-label>
                    <vm-input type="text"></vm-input>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>
                    <span>右侧清除按钮</span>
                </vm-list-header>
                <vm-item>
                    <vm-input placeholder="Clear Input" clearInput></vm-input>
                </vm-item>
            </vm-list>

            <vm-list>
                <vm-list-header>
                    <span>Password(自动清除)</span>
                </vm-list-header>
                <vm-item>
                    <vm-label color="primary" stacked>Password</vm-label>
                    <vm-input type="password" placeholder="Password Input"></vm-input>
                </vm-item>
            </vm-list>

            <vm-list>
                <vm-list-header>
                    <span>Test</span>
                </vm-list-header>
                <vm-item>
                    <vm-label color="primary">TestValue</vm-label>
                    <vm-input :clearInput="true"
                           :max="18"
                           placeholder="最多输入18个字符"
                           v-model="testValue"
                           :disabled="testDisabled"></vm-input>
                </vm-item>
                <vm-item>
                    <span slot="item-start"> 当前的值({{testValue && testValue.length}}): {{testValue}}</span>
                    <vm-button slot="item-end" small outline @click="testDisabled = !testDisabled">Disable</vm-button>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>Focus Highlight</vm-list-header>
                <vm-item>
                    <vm-label color="primary">聚焦高亮</vm-label>
                    <vm-input :showFocusHighlight="true" placeholder="输入文本" type="text" clearInput></vm-input>
                </vm-item>
            </vm-list>

            <vm-list>
                <vm-list-header>Input单独使用</vm-list-header>

                <section class="customer">
                    <vm-input :showFocusHighlight="true" placeholder="输入文本" type="text" clearInput></vm-input>
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
<style lang="scss">
    .customer {
        width: 80%;
        height: 40px;
        background-color: #ffffff;
        color: #000000;
        margin: 10px auto;
        padding-left: 10px;
    }
</style>
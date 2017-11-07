<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Limit</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-list>
                <vm-list-header>长度限制</vm-list-header>
                <vm-item>
                    <vm-label color="primary">最长10个字符</vm-label>
                    <vm-input :max="10" show-focus-highlight placeholder="输入文本" type="text" v-model="text" clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">最大数字为10000</vm-label>
                    <vm-input :max="10000" show-focus-highlight placeholder="输入数字" type="number" v-model="number" clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">最小数字为3</vm-label>
                    <vm-input :min="3" show-focus-highlight placeholder="输入数字" type="number" clearInput></vm-input>
                </vm-item>

                <vm-item>
                    <vm-label color="primary">小数点后最多3位</vm-label>
                    <vm-input :decimal="3" show-focus-highlight placeholder="输入数字" type="number" clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">金额(0~100)</vm-label>
                    <vm-input :min="0" :max="100" show-focus-highlight placeholder="输入金额" type="number" clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">数字范围(-2~10)</vm-label>
                    <vm-input :min="-2" :max="10" show-focus-highlight placeholder="-2~10" type="number"
                           clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">数字范围(0~10)</vm-label>
                    <vm-input :min="0" :max="10" show-focus-highlight placeholder="0~10" type="number" clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">数字范围(2~10)</vm-label>
                    <vm-input :min="2" :max="10" show-focus-highlight placeholder="2~10" type="number" clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-label color="primary">url</vm-label>
                    <vm-input show-focus-highlight placeholder="Input urls" type="url" clearInput></vm-input>
                </vm-item>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<script type="text/javascript">
  export default {
    name: 'InputLimitDemo',
    data () {
      return {
        text: null,
        number: null
      }
    }
  }
</script>

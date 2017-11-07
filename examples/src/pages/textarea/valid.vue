<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Valid</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content>
            <vm-list>
                <vm-list-header>
                    <span>必填验证</span>
                </vm-list-header>
                <vm-item>
                    <vm-label stacked color="primary">地址</vm-label>
                    <vm-textarea placeholder="Required..." showFocusHighlight required></vm-textarea>
                </vm-item>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<script type="text/javascript">
  export default {
    name: 'InputDemo',
    data () {
      return {
        testValue: 'hello',
        testDisabled: false
      }
    }
  }
</script>

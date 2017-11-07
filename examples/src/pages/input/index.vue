<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Input</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <div padding>
                <p>Input组件使用示例</p>
            </div>
            <vm-list>
                <vm-list-header>使用场景</vm-list-header>
                <vm-item button :to="{name:'input.normal'}">普通用法</vm-item>
                <vm-item button :to="{name:'input.valid'}">输入验证</vm-item>
                <vm-item button :to="{name:'input.limit'}">输入限制</vm-item>
                <vm-item button :to="{name:'input.event'}">输入事件</vm-item>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<script type="text/javascript">
  export default {
    name: 'InputDemo'
  }
</script>

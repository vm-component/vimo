<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Tabs</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <div padding>
                <h2 text-uppercase>Brief</h2>
                <p>Tabs组件并不是简单的组件, 而是增加了页面结构的组件, 用于和路由配合使用的场景, 而不是单纯的使用它下面的Bar. </p>
                <p>路由切换类似$router, 但是使用的是replace方法, 这里需要注意.</p>
            </div>
            <vm-list>
                <vm-list-header>Demo列表</vm-list-header>
                <vm-item button :to="{name:'tabs.tabsBottom'}">Tab在底部</vm-item>
                <vm-item button :to="{name:'tabs.tabsTop'}">Tab在顶部</vm-item>
                <vm-item button :to="{name:'tabs.iconOnly'}">Tab只有ICON</vm-item>
                <vm-item button :to="{name:'tabs.iconLeft'}">ICON在左边</vm-item>
                <vm-item button :to="{name:'tabs.iconBottom'}">ICON在底部</vm-item>
                <vm-item button :to="{name:'tabs.titleOnly'}">只有Tab文字</vm-item>
                <vm-item button :to="{name:'tabs.tabHighLight'}">Tab下划线跟随</vm-item>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default {}
</script>

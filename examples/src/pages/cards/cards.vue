<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Cards</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-list>
                <!--header-->
                <vm-list-header>
                    <span>Contents</span>
                </vm-list-header>
                <!--group-->
                <vm-item button :to="{name:'cards.basicCards'}">基础卡片</vm-item>
                <vm-item button :to="{name:'cards.listsInCards'}">Card与List组合</vm-item>
                <vm-item button :to="{name:'cards.advancedCards'}">更丰富的Card</vm-item>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">
</style>
<script type="text/javascript">
  export default {
    name: 'cards'
  }
</script>

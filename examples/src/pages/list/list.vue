<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>List</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-list>
                <!--header-->
                <vm-list-header>
                    <span>Contents</span>
                </vm-list-header>
                <!--group-->
                <vm-item-group>
                    <vm-item button to="list.listForAll">全特性</vm-item>
                    <vm-item button :to="{name:'list.basicList'}">基础List</vm-item>
                    <vm-item button :to="{name:'list.noLine'}">没有Border</vm-item>
                    <vm-item button :to="{name:'list.insetList'}">嵌入模式</vm-item>
                    <vm-item button :to="{name:'list.listDividers'}">List分隔符</vm-item>
                    <vm-item button :to="{name:'list.listHeaders'}">ListHeader</vm-item>
                    <vm-item button :to="{name:'list.iconList'}">带Icon的List</vm-item>
                    <vm-item button :to="{name:'list.avatarList'}">圆形头像List</vm-item>
                    <vm-item button :to="{name:'list.thumbnailList'}">方形头像List</vm-item>
                    <vm-item button :to="{name:'list.multi-lineList'}">多行元素</vm-item>
                    <vm-item button :to="{name:'list.slidingList'}">滑动列表</vm-item>
                    <!--<vm-item button :to="{name:'list.reorder'}">Reorder</vm-item>-->
                    <vm-item button :to="{name:'list.collapse'}">折叠列表</vm-item>
                </vm-item-group>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">
    .main {

    }
</style>
<script type="text/javascript">
  export default{
    data () {
      return {
        toggleValue: true,
        silencePhone: 'always'
      }
    },
    watch: {
      toggleValue () {
        console.debug('outer toggleValue change:' + this.toggleValue)
      }
    },
    methods: {
      toggleChange (val) {
        console.debug('Outer Toggle Change Value - airPlane:' + val)
      }
    }
  }
</script>

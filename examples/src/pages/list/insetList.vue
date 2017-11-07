<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>InsetList</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-list inset>
                <vm-item button v-for="(item,index) in list" :key="index">
                    {{item}}
                </vm-item>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default{
    data () {
      return {
        list: [
          'InsetList 1',
          'InsetList 2',
          'InsetList 3',
          'InsetList 4',
          'InsetList 5',
          'InsetList 6',
          'InsetList 7',
          'InsetList 8',
          'InsetList 9',
          'InsetList 10',
          'InsetList 11',
          'InsetList 12',
          'InsetList 13',
          'InsetList 14'
        ]
      }
    }
  }
</script>

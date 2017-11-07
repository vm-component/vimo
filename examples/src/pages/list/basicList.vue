<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>BasicList</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-list>
                <vm-item button v-for="(item,index) in list" :key="index">
                    {{item}}
                </vm-item>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less"></style>
<script type="text/javascript">

  export default {
    data () {
      return {
        list: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Item 4',
          'Item 5',
          'Item 6',
          'Item 7',
          'Item 8',
          'Item 9',
          'Item 10',
          'Item 11',
          'Item 12',
          'Item 13',
          'Item 14'
        ]
      }
    },
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {}
  }
</script>

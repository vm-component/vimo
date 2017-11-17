<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>ListDividers</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-item-group>
                <vm-item-divider color="light">A</vm-item-divider>
                <vm-item>Angola</vm-item>
                <vm-item>Angular</vm-item>
                <vm-item>America</vm-item>
                <vm-item>Arg</vm-item>
            </vm-item-group>
            <vm-item-group>
                <vm-item-divider color="light">B</vm-item-divider>
                <vm-item>Bee</vm-item>
                <vm-item>Book</vm-item>
                <vm-item>Back</vm-item>
                <vm-item>Bear</vm-item>
            </vm-item-group>

        </vm-content>
    </vm-page>
</template>
<style lang="scss">

</style>
<script type="text/javascript">
  export default{
    data () {
      return {
        list: [
          'ListDividers 1',
          'NoLine 2',
          'NoLine 3',
          'NoLine 4',
          'NoLine 5',
          'NoLine 6',
          'NoLine 7',
          'NoLine 8',
          'NoLine 9',
          'NoLine 10',
          'NoLine 11',
          'NoLine 12',
          'NoLine 13',
          'NoLine 14'
        ]
      }
    }
  }
</script>

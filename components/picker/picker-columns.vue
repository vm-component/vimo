<template>
    <div class="picker-columns">
        <div class="picker-above-highlight"></div>
        <!--<div *ngFor="let c of d.columns" [col]="c" class="picker-col" (ionChange)="_colChange($event)"></div>-->
        <div class="picker-below-highlight"></div>



    </div>
</template>
<style lang="scss">
    @import "picker";
    @import "picker.md";
    @import "picker.ios";
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'PickerColumns',
    data(){
      return {}
    },
    props: {
      columns:[Array]
    },
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>

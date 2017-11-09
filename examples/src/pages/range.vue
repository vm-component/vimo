<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Range</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">

            <vm-list>
                <vm-list-header>
                    <span>Brightness</span>
                    <vm-badge slot="item-end">{{brightness}}</vm-badge>
                </vm-list-header>
                <vm-item>
                    <vm-range v-model="brightness">
                        <vm-icon slot="range-left" small name="sunny"></vm-icon>
                        <vm-icon slot="range-right" name="sunny"></vm-icon>
                    </vm-range>
                </vm-item>
            </vm-list>

            <vm-list>
                <vm-list-header>
                    <span>Saturation</span>
                    <vm-badge slot="item-end" color="secondary">{{saturation}}</vm-badge>
                </vm-list-header>
                <vm-item>
                    <vm-range :min="-200" :max="200" :pin="true" v-model="saturation" color="secondary">
                        <vm-label slot="range-left">-200</vm-label>
                        <vm-label slot="range-right">200</vm-label>
                    </vm-range>
                </vm-item>
            </vm-list>


            <vm-list>
                <vm-list-header>
                    <span>Warmth</span>
                    <vm-badge slot="item-end" color="danger">{{warmth}}</vm-badge>
                </vm-list-header>
                <vm-item>
                    <vm-range :min="1000" :max="2000" :step="100" :snaps="true" v-model="warmth" color="danger">
                        <vm-icon slot="range-left" small color="danger" name="thermometer"></vm-icon>
                        <vm-icon slot="range-right" color="danger" name="thermometer"></vm-icon>
                    </vm-range>
                </vm-item>
            </vm-list>

            <vm-list>
                <vm-list-header>
                    <span>Structure</span>
                    <vm-badge slot="item-end" color="dark">{{structure.lower}}</vm-badge>
                    <vm-badge slot="item-end" color="dark">{{structure.upper}}</vm-badge>
                </vm-list-header>
                <vm-item>
                    <vm-range :dualKnobs="true" :pin="true" v-model="structure"
                           color="dark">
                        <vm-label slot="range-left">-0</vm-label>
                        <vm-label slot="range-right">100</vm-label>
                    </vm-range>
                </vm-item>
            </vm-list>

            <vm-list>
                <vm-list-header>
                    <span>Disable</span>
                    <vm-badge slot="item-end" color="secondary">{{disableRange}}</vm-badge>
                </vm-list-header>
                <vm-item>
                    <vm-range :disabled="disabled" :min="-200" :max="200" :pin="true" v-model="disableRange"
                           color="secondary">
                        <vm-label slot="range-left">-200</vm-label>
                        <vm-label slot="range-right">200</vm-label>
                    </vm-range>
                </vm-item>
            </vm-list>

            <vm-grid>
                <vm-row justify-content-center>
                    <vm-col col-6>
                        <vm-button block @click="disableToggle">Disabled Toggle</vm-button>
                    </vm-col>
                </vm-row>
            </vm-grid>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">
</style>
<script type="text/javascript">
  export default{
    name: 'range',
    data () {
      return {

        brightness: 20,
        saturation: 0,
        warmth: 1300,
        structure: {lower: 33, upper: 60},

        disableRange: 10,
        disabled: false
      }
    },
    props: {},
    watch: {
      structure (val) {
        console.log('structure val:')
        console.log(val)
      }
    },
    computed: {},
    methods: {
      disableToggle () {
        this.disabled = !this.disabled
      }
    },
    created () {},
    mounted () {},
    activated () {}
  }
</script>

<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>
                    Toggle
                </vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-list>
                <vm-list-header>
                    <span>普通使用</span>
                </vm-list-header>
                <vm-item>
                    <span>Toggle Danger</span>
                    <vm-toggle slot="item-right" color="danger" v-model="displayData.danger"></vm-toggle>
                </vm-item>
                <vm-item>
                    <span>Toggle Primary</span>
                    <vm-toggle slot="item-right" color="primary" v-model="displayData.primary"></vm-toggle>
                </vm-item>
                <vm-item>
                    <span>Toggle Dark</span>
                    <vm-toggle slot="item-right" color="dark" v-model="displayData.dark"></vm-toggle>
                </vm-item>
                <vm-item>
                    <span>Toggle Light</span>
                    <vm-toggle slot="item-right" color="light" v-model="displayData.light"></vm-toggle>
                </vm-item>
                <vm-item>
                    <span>Toggle Disabled</span>
                    <vm-toggle slot="item-right" :disabled="displayData.disabled" v-model="displayData.disabled"></vm-toggle>
                </vm-item>
            </vm-list>


            <section padding>
                <h5>单独使用</h5>
                <div class="customer-standalone">
                    <vm-toggle slot="item-right" color="danger" v-model="displayData.danger"></vm-toggle>
                </div>
            </section>


            <vm-list>
                <vm-list-header>
                    <span>高级用法</span>
                </vm-list-header>
                <vm-item>
                    <span>下方按钮控制</span>
                    <vm-toggle v-model="checked" slot="item-right" :disabled="disabled"
                            @onChange="toggleChange"></vm-toggle>
                </vm-item>
            </vm-list>

            <vm-grid>
                <vm-row>
                    <vm-col>
                        <vm-button block @click="checked = !checked">设置开/闭</vm-button>
                    </vm-col>
                    <vm-col>
                        <vm-button block @click="disabled = !disabled">设置禁用/启用</vm-button>
                    </vm-col>
                </vm-row>
                <vm-row justify-content-center>
                    <vm-col text-center col-12>当前状态, checked: {{checked}}, disabled: {{disabled}}</vm-col>
                    <vm-col text-center col-12>* 使用v-model切换状态, 不支持checked属性</vm-col>
                </vm-row>
            </vm-grid>

        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">
    .customer-standalone {
        height: 44px;
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed #333;
    }
</style>
<script type="text/javascript">
  export default {
    name: 'toggle',
    data () {
      return {
        displayData: {
          danger: false,
          primary: true,
          dark: false,
          light: true,
          disabled: true
        },

        checked: true,
        disabled: false
      }
    },
    props: {},
    watch: {
      displayData: {
        handler () {
          console.debug(JSON.parse(JSON.stringify(this.displayData)))
        },
        deep: true
      }
    },
    methods: {
      toggleChange (val) {
        console.debug('toogle changed, value:' + val)
      }
    }
  }
</script>

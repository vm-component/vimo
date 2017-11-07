<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Checkbox</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-list>
                <vm-list-header>Checkbox</vm-list-header>
                <vm-item>
                    <vm-label>Danger</vm-label>
                    <vm-checkbox slot="item-left" color="danger" v-model="displayData.danger"></vm-checkbox>
                    <vm-toggle slot="item-right"></vm-toggle>
                </vm-item>
                <vm-item>
                    <vm-label>Primary</vm-label>
                    <vm-checkbox slot="item-left" color="primary" v-model="displayData.primary"></vm-checkbox>
                </vm-item>
                <vm-item>
                    <vm-label>Dark</vm-label>
                    <vm-checkbox slot="item-left" color="dark" v-model="displayData.dark"></vm-checkbox>
                </vm-item>
                <vm-item>
                    <vm-label>Light</vm-label>
                    <vm-checkbox slot="item-left" color="light" v-model="displayData.light"></vm-checkbox>
                </vm-item>
                <vm-item>
                    <vm-label>Disabled</vm-label>
                    <vm-checkbox slot="item-left" :disabled="displayData.disabled"
                              v-model="displayData.disabled"></vm-checkbox>
                </vm-item>
            </vm-list>

            <section padding>
                <h5>单独使用</h5>
                <div class="customer-standalone">
                    <vm-checkbox color="danger" v-model="displayData.danger"></vm-checkbox>
                </div>
                <p>注意这部分样式的写法!</p>
            </section>


            <vm-list>
                <vm-list-header>使用 v-modal 绑定</vm-list-header>
                <vm-item>
                    <vm-label>Danger</vm-label>
                    <vm-checkbox slot="item-left" color="danger" v-model="testModal" :disabled="testDisabled"
                              @onChange="onCheckboxChange"></vm-checkbox>
                </vm-item>
            </vm-list>
            <vm-grid>
                <vm-row justify-content-center>
                    <vm-col text-center>
                        <strong> Current Value: </strong>
                        <span>{{testModal}}</span>
                    </vm-col>
                    <vm-col text-center>
                        <strong> Disabled State: </strong>
                        <span>{{testDisabled}}</span>
                    </vm-col>
                </vm-row>
                <vm-row justify-content-center>
                    <vm-col col-1></vm-col>
                    <vm-col>
                        <vm-button block @click="testModal =!testModal">setValue</vm-button>
                    </vm-col>
                    <vm-col>
                        <vm-button block @click="testDisabled =!testDisabled">Disabled</vm-button>
                    </vm-col>
                    <vm-col col-1></vm-col>
                </vm-row>
            </vm-grid>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">
    .customer-standalone {
        position: relative;
        height: 44px;
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed #333;
        .ion-checkbox {
            position: static;
        }
    }
</style>
<script type="text/javascript">
  export default {
    name: 'name',
    data () {
      return {

        displayData: {
          danger: false,
          primary: true,
          dark: false,
          light: true,
          disabled: true
        },

        testModal: true,
        testDisabled: false
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
    computed: {},
    methods: {
      onCheckboxChange (val) {
        console.debug('onCheckboxChange:' + val)
      }
    },
    created () {},
    mounted () {},
    activated () {}
  }
</script>

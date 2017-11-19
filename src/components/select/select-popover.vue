<template>
    <vm-list radio-group v-model="checkedValue" @onChange="onRadioChecked($event)">
        <vm-item v-for="option in options" key="idx">
            <vm-label>{{option.label}}</vm-label>
            <vm-radio :value="option.value" :disabled="option.disabled"></vm-radio>
        </vm-item>
    </vm-list>
</template>
<script type="text/javascript">
  import VmList from '../list/list.vue'
  import VmItem from '../item/item.vue'
  import VmLabel from '../label/label.vue'
  import VmRadio from '../radio/radio.vue'
  import Popover from '../../services/popover'

  export default {
    name: 'ion-select-popover',
    components: {
      VmRadio,
      VmLabel,
      VmItem,
      VmList
    },
    data () {
      return {
        options: [],
        checkedValue: null
      }
    },
    created () {
      this.options = this.$options.$data.options

      this.checkedValue = this.getValue()
    },
    methods: {
      onRadioChecked (value) {
        let checkedOption = this.options.find(option => option.value === value)
        if (checkedOption && checkedOption.handler) {
          checkedOption.handler()
        }

        Popover.dismiss()
      },

      getValue () {
        let checkedOption = this.options.find(option => option.checked)
        return checkedOption ? checkedOption.value : undefined
      }
    }
  }
</script>
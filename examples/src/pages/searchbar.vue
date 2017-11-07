<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Searchbar</vm-title>
            </vm-navbar>
            <vm-toolbar>
                <vm-searchbar :animated="true"
                           placeholder="Search"
                           :debounce="100"
                           @onInput="onInputHandler"
                           v-model="myInput"
                           :showCancelButton="true"
                           cancelButtonText="取消"></vm-searchbar>
            </vm-toolbar>
        </vm-header>
        <vm-content class="outer-content">
            <div padding>
                <p>Search debounce: 100</p>
                <p no-margin>Search Value: {{myInput}}</p>
            </div>
            <vm-list>
                <vm-item-group>
                    <vm-item button v-for="(city,index) in filteredList" :key="index">{{city.city}}</vm-item>
                </vm-item-group>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">
</style>
<script type="text/javascript">
  import cityList from '../../../src/components/choose-city/cities.json'
  export default {
    data () {
      return {
        myInput: '',
        cityList: [],
        filteredList: []
      }
    },
    watch: {
      myInput () {
        console.debug('myInput changed outer:' + this.myInput)
      }
    },
    computed: {},
    methods: {
      onInputHandler () {
        this.filteredList = this.cityList.filter((item) => {
          if (this.myInput) {
            return item.spell.toString().toLowerCase().indexOf(this.myInput.toLowerCase()) > -1
          }
          return true
        })
      }
    },
    created () {
      this.cityList = cityList
      this.onInputHandler()
    },
    mounted () {},
    activated () {
    }
  }
</script>

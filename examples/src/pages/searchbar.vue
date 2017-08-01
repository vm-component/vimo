<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Searchbar</Title>
            </Navbar>
            <Toolbar>
                <Searchbar :animated="true"
                           placeholder="Search"
                           :debounce="100"
                           @onInput="onInputHandler"
                           v-model="myInput"
                           :showCancelButton="true"
                           cancelButtonText="取消"></Searchbar>
            </Toolbar>
        </Header>
        <Content class="outer-content">
            <div padding>
                <p>Search debounce: 100</p>
                <p no-margin>Search Value: {{myInput}}</p>
            </div>
            <List>
                <ItemGroup>
                    <Item detail-push v-for="(city,index) in filteredList" :key="index">{{city.name}}</Item>
                </ItemGroup>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
</style>
<script type="text/javascript">
  import cityList from '../../static/city-data/cityList'
  export default{
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
      onInputHandler ($event) {
        this.filteredList = this.cityList.filter((item) => {
          if (this.myInput) {
            let index = item.tags.toLowerCase().indexOf(this.myInput.toLowerCase())
            return index > -1
          }
          return true
        })
      }
    },
    created () {
      let tmp = []
      cityList.forEach((item) => {
        tmp = Array.concat(tmp, item.cities)
      })

      let obj = {}
      tmp.forEach((item) => {
        if (!obj[item.cityid]) {
          this.cityList.push(item)
          obj[item.cityid] = item
        }
      })
      obj = null
      this.onInputHandler()
    },
    mounted () {},
    activated () {
    },
  }
</script>

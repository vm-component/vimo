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
                    <Item detail-push v-for="(city,index) in filteredList" :key="index">{{city.city}}</Item>
                </ItemGroup>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
</style>
<script type="text/javascript">
  import cityList from '../../../components/choose-city/cities.json'
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

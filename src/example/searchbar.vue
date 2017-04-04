<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Searchbar</Title>
            </Navbar>
            <Toolbar>
                <Searchbar :animated="false"
                           placeholder="Search"
                           :debounce="100"
                           v-model="myInput"
                           :showCancelButton="true"
                           cancelButtonText="取消"
                           @onInput="onInput"
                           @onFocus="onFocus"
                           @onBlur="onBlur"
                           @onCancel="onCancel"
                           @onClear="onClear"></Searchbar>
            </Toolbar>
        </Header>
        <Content padding>
            <p>Search debounce: 100</p>
            <p>Search Value: {{myInput}}</p>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
</style>
<script type="text/ecmascript-6">
  import { Searchbar } from 'vimo/components/searchbar'
  export default{
    data(){
      return {
        myInput: ''
      }
    },
    watch: {
      myInput () {
        console.debug('myInput changed outer:' + this.myInput)
      }
    },
    computed: {},
    methods: {
      onInput ($event) {
        console.debug('outer-onInput:');
      },
      onCancel ($event) {
        console.debug('outer-onCancel:');
      },
      onClear ($event) {
        console.debug('outer-onClear:');
      },
      onBlur ($event) {
        console.debug('outer-onBlur:');
      },
      onFocus ($event) {
        console.debug('outer-onFocus:');
      }
    },
    created () {
    },
    mounted () {
    },
    activated () {
    },
    components: {Searchbar}
  }
</script>

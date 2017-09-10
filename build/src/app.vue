<template>
    <div>
        <h1>{{ msg }}</h1>
        <clock></clock>
    </div>
</template>

<script>
  import Clock from './components/clock.vue'

  export default {
    data () {
      return {
        msg: 'Welcome to Vue.js World!'
      }
    },
    method: {
      getMsg () {
        console.log(this.msg)
      }
    },
    components: {
      Clock
    }
  }
</script>

<style>
    body {
        font: 100% Helvetica, sans-serif;
        color: #ecf0f1;
        text-align: center;
        background-color: #34495e;
    }

    .container {
        margin: 0 auto;
        padding-top: 70px;
    }
</style>
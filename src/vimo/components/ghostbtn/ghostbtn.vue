<template>
  <div>
    <div id="ghost" @click="animation()">
      <!-- <span> CREATE MY ACCOUNT</span> -->
      <div id="top" class="line-1 top-1 topAnimation"></div>
      <div id="left" class="line-2 top-1 leftAnimation"></div>
      <div id="right" class="line-2 top-1 rightAnimation"></div>
      <div id="bottom" class="line-1 top-1 bottomAnimation"></div>
      <span id="banner"><slot></slot></span>
    </div>
    <br>
    <button @click="removeAni()">remove</button>
  </div>
  
</template>
<style lang="scss">
  @import './ghost.css';
</style>
<script type="text/ecmascript-6">
  import {setElementClass} from '../../util/dom';
  import {startAni,stopAni} from './ghost'
  export default{
    name:'Ghost',
    data(){
      return {

      }
    },
    props:{

    },
    methods:{
      animation(){
        stopAni();
        startAni();
        stopAni();
      },
      removeAni(){
       // stopAni();
      }
    }
    
  }
</script>

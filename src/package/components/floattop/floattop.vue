<template>
  <div style="width:130px;height: 120px;margin:100px;background:#000;">
    <div id="font"  style="width:130px;height: 100px;margin-top: 20px;">
      <span >
        <h3>
            I SLETP WITH HIM BECAUSE OF HIS CAR . LOL.
        </h3>
      </span>
    </div>
    <Button @click="run()">click</Button>
  </div>
  
</template>
<style lang="scss">
  @import './floattop.scss';
</style>
<script type="text/ecmascript-6">
  import {startFloat} from './floattop.js'
  import velocity from 'velocity'
  import 'velocity.ui'
  export default{
    name:'Floattop',
    data(){
      return{
        easing:[0.9,0.2,0.8,0.1]
      }
    },
    props:{

    },
    methods:{
      run(){
        //startFloat(document.querySelector("#font"));
       var el = document.querySelector("#font") 
       const _this = this;
       velocity(el,{
        top:"0px"
       },{
        duration:800,
        easing:_this.easing,
        queue:"a"
       });
        velocity(el,{
        top:"-130px"
       },{
        duration:800,
        easing:_this.easing,
        queue:"a"
       });
        velocity.Utilities.dequeue(el,"a");
      /* velocity(el,{
          top:"0px",
        },{
          duration:800,
          easing:[0.9,0.2,0.8,0.1],
          complete:function(){
            velocity(el,{
              top:"-105px"
            },{
              easing:[0.9,0.2,0.8,0.1],
              duration:800,delay:500
            })
          }
        });*/
      }
    }
    
  }
</script>

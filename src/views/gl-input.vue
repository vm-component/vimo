<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Gl-Input</Title>
      </Navbar>
    </Header>
    <Content padding>
      <p> Gl-Input</p>


      <div class="gl-inputBox" :class="{'active':isActive}">
        <!--border-->
        <div class="gl-border"></div>
        <!--border Cover-->
        <div class="gl-borderCover"></div>
        <!--content-->
        <div class="gl-content" @click="focusInput">
          <transition-group name="list" tag="span" class="gl-content--spanBox">
            <span class="gl-content__spanBox--span" v-for="item in inputValueForDisplay"
                  v-bind:key="item">{{item}}</span>
          </transition-group>

        </div>
      </div>

      <Button type="solid" @click="toggle">toggle</Button>
      <input type="number" v-model="inputValue" id="hidedInput" @keyup="valueChange" class="">


      <div class="demo">
        <SnakeBox color="#333" class="snakebox">
          <section class="inner">
dfasd
          </section>
        </SnakeBox>
      </div>

      <div class="demo">
        <SnakeBox class="snakebox">123</SnakeBox>
      </div>

      <div class="demo">
        <SnakeBox class="snakebox">123</SnakeBox>
      </div>

      <div class="demo">
        <SnakeBox class="snakebox">123</SnakeBox>
      </div>

      <div class="demo">
        <SnakeBox class="snakebox">123</SnakeBox>
      </div>

      <div class="demo">
        <SnakeBox class="snakebox">123</SnakeBox>
      </div>

    </Content>
  </Page>
</template>
<style scoped lang="scss">
  * {
    /*outline: 1px solid #eee;*/
  }

  $boxHeight: 50px;
  $boxWidth: 300px;
  .gl-inputBox {
    overflow: hidden;
    height: $boxHeight;
    width: $boxWidth;
    position: relative;
    background: #000;
    &.active {
      .gl-borderCover {
        transform: rotate(12deg);
      }
    }
    .gl-border {
      position: absolute;
      top: 0;
      left: 0;
      border: 3px solid red;
      height: 100%;
      width: 100%;
      z-index: 1;
    }
    .gl-borderCover {
      background: #000;
      position: absolute;
      height: $boxWidth;
      width: 2*$boxWidth;
      z-index: 2;
      top: $boxHeight/2;
      left: 50%;
      margin-left: -$boxWidth;

      transform-origin: $boxWidth 0;
      transform: rotate(-171deg);

      transition: all cubic-bezier(1, 0.19, 0, 0.82) 1000ms;

    }
    .gl-content {
      position: absolute;
      top: 10px;
      bottom: 10px;
      left: 10px;
      right: 10px;
      background: #fff;
      z-index: 3;
      font-size: 20px;
      #hidedInput {
        display: block;
        position: absolute;
        z-index: 0;
        opacity: 0;
        height: 0;
        width: 0;
        min-height: 0;
        min-width: 0;
        left: -60px;

      }
      .gl-content--spanBox {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        .gl-content__spanBox--span {
          font-weight: bold;
          display: inline-block;
        }
      }
    }
  }

  .list-enter-active, .list-leave-active {
    transition: all 300ms;
  }

  .list-enter, .list-leave-active {
    opacity: 0;
  }

  /**/
  .demo {
    width: 100%;
    height: 100px;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    .snakebox {
      width: 300px;
      height: 50px;
      .inner{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
      }
    }
  }



</style>
<script type="text/ecmascript-6">


  export default{
    name: 'name',
    data(){
      return {
        isActive: false,
        inputValue: '',
        inputValueForDisplay: [],

      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      toggle(){
        this.isActive = !this.isActive;
      },
      focusInput(){
        document.getElementById('hidedInput').focus()
      },
      valueChange(){
        console.debug('valueChange')
        let _arr = this.inputValue.toString().split('');
        if (_arr.length < 12) {
          this.inputValueForDisplay = _arr
        } else {
          _arr.pop();
          this.inputValue = _arr.join('');
        }
      },

    },
    created () {},
    mounted () {

    },
    activated () {},
    components: {}
  }
</script>

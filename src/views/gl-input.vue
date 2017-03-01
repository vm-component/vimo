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
        <div class="circleButton" @click="circleGo">
          <div class="circleButton__bottom"></div>
          <div class="circleButton__left"></div>
          <div class="circleButton__top"></div>
          <div class="circleButton__right"></div>
        </div>
      </div>

      <Grid>
        <Row>
          <label>Start Percent</label>
          <input type="number" v-model="start">
        </Row>
        <Row>
          <label>Color Before</label>
          <input type="text" v-model="colorBefore">
        </Row>
        <Row>
          <label>Color After</label>
          <input type="text" v-model="colorAfter">
        </Row>
        <Row>
          <label>startDuration</label>
          <input type="number" v-model="startDuration">
        </Row>
        <Row>
          <label>middleDuration</label>
          <input type="number" v-model="middleDuration">
        </Row>
        <Row>
          <label>endDuration</label>
          <input type="number" v-model="endDuration">
        </Row>
      </Grid>
      <Button @click="resetCircle()">ResetCircle</Button>
      <Button @click="circleGo()">CircleGo</Button>


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
  }

  .circleButton {
    height: 50px;
    width: 200px;
    position: relative;

    background: #cdcdcd;
    .circleButton__bottom,
    .circleButton__left,
    .circleButton__top,
    .circleButton__right {
      position: absolute;
      opacity: 1;
      display: block;
      background: #000;
      z-index: 1;
    }
    .circleButton__bottom {
      height: 3px;
      bottom: 0;
      /*width: 100%;*/
    }
    .circleButton__left {
      width: 3px;
      left: 0;
      /*height: 100%;*/
    }
    .circleButton__top {
      height: 3px;
      top: 0;
      /*width: 100%;*/
    }
    .circleButton__right {
      width: 3px;
      right: 0;
      /*height: 100%;*/
    }
  }
</style>
<script type="text/ecmascript-6">
  import  'velocity';
  import  'velocity.ui';

  export default{
    name: 'name',
    data(){
      return {
        isActive: false,
        inputValue: '',
        inputValueForDisplay: [],

        _bottom: null,
        _left: null,
        _top: null,
        _right: null,

        start: 30,
        colorBefore: '#fff',
        colorAfter: '#000',

        isAnimate: false,
        startCubicBezier: [1, 0.01, 0.9, 0.73],
        middleCubicBezier: [0.31, 0.81, 0.4, 0.97],
        endCubicBezier: [0.15, 0.6, 0.27, 0.9],
        startDuration: 300,
        middleDuration: 150,
        endDuration: 300,

      }
    },
    props: {},
    watch: {},
    computed: {
      startPercent(){
        return this.start + '%'
      },
      restPercent(){
        return (100 - this.start) + '%'
      },
      totalDuration(){
        return this.startDuration + this.middleDuration + this.endDuration
      }

    },
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
      resetCircle(){
        const _this = this;
        _this._bottom.style.width = _this.restPercent;
        _this._bottom.style.left = 0;
        _this._left.style.height = '100%';
        _this._top.style.width = _this.startPercent;
        _this._top.style.left = 0;
        _this._right.style.height = '0%';
      },
      circleGo(){
        const _this = this;
        let sequenceBottom;
        let sequenceTop;
        let sequenceColor;
        if (_this.isAnimate) {
          return
        }
        _this.isAnimate = true;
        let startPercent = _this.startPercent;
        let restPercent = _this.restPercent;

        if (parseInt(_this._left.style.height) > 0) {
          sequenceColor = [
            {
              e: _this._bottom,
              p: {backgroundColor: _this.colorBefore},
              o: {duration: _this.totalDuration, sequenceQueue: false}
            },
            {
              e: _this._left,
              p: {backgroundColor: _this.colorBefore},
              o: {duration: _this.totalDuration, sequenceQueue: false}
            },
            {
              e: _this._top,
              p: {backgroundColor: _this.colorBefore},
              o: {duration: _this.totalDuration, sequenceQueue: false}
            },
            {
              e: _this._right,
              p: {backgroundColor: _this.colorBefore},
              o: {duration: _this.totalDuration, sequenceQueue: false}
            },

          ];
          sequenceBottom = [
            {
              e: _this._bottom,
              p: {width: ['0%', restPercent]},
              o: {
                begin () {
                  _this._bottom.style.left = 0;
                },
                duration: _this.startDuration,
                easing: _this.startCubicBezier
              }
            },
            {
              e: _this._left,
              p: {height: ['0%', '100%']},
              o: {
                begin () {
                  _this._bottom.style.left = 'inherit';
                  _this._left.style.top = 0;
                },
                duration: _this.middleDuration,
                easing: _this.middleCubicBezier
              }
            },
            {
              e: _this._top,
              p: {width: [restPercent, '100%']},
              o: {
                begin () {
                  _this._top.style.right = 0;
                },
                duration: _this.endDuration,
                easing: _this.endCubicBezier,
                complete(){
                  _this.isAnimate = false;
                }
              }
            },
          ];
          sequenceTop = [
            {
              e: _this._top,
              p: {width: ['100%', startPercent]},
              o: {
                begin () {
                  _this._top.style.left = 0;
                },
                duration: _this.startDuration,
                easing: _this.startCubicBezier
              }
            },
            {
              e: _this._right,
              p: {height: ['100%', '0%']},
              o: {
                begin () {
                  _this._top.style.left = 'inherit';
                  _this._right.style.top = 0;
                },
                duration: _this.middleDuration,
                easing: _this.middleCubicBezier
              }
            },
            {
              e: _this._bottom,
              p: {width: [startPercent, '0%']},
              o: {
                begin () {
                  _this._bottom.style.right = 0;
                },
                duration: _this.endDuration,
                easing: _this.endCubicBezier,
                complete(){
                  _this.isAnimate = false;
                }
              }
            },
          ];
          Velocity.RunSequence(sequenceColor);
          Velocity.RunSequence(sequenceBottom);
          Velocity.RunSequence(sequenceTop);

        } else {
          sequenceTop = [
            {
              e: _this._top,
              p: {width: ['0%', restPercent]},
              o: {
                begin () {
                  _this._top.style.right = 0;
                },
                duration: _this.startDuration,
                easing: _this.startCubicBezier
              }
            },
            {
              e: _this._right,
              p: {height: ['0%', '100%']},
              o: {
                begin () {
                  _this._top.style.right = 'inherit';
                  _this._right.style.top = 'inherit';
                  _this._right.style.bottom = 0;
                },
                duration: _this.middleDuration,
                easing: _this.middleCubicBezier
              }
            },
            {
              e: _this._bottom,
              p: {width: [restPercent, '100%']},
              o: {
                begin () {
                  _this._right.style.bottom = 'inherit';
                  _this._bottom.style.right = 'inherit';
                  _this._bottom.style.left = 0;
                },
                duration: _this.endDuration,
                easing: _this.endCubicBezier,
                complete(){
                  _this._bottom.style.left = 'inherit';
                  _this.isAnimate = false;
                }
              }
            },
          ];
          sequenceBottom = [
            {
              e: _this._bottom,
              p: {width: ['100%', startPercent]},
              o: {
                begin () {
                  _this._bottom.style.right = 0;
                  _this._bottom.style.left = 'inherit';
                },
                duration: _this.startDuration,
                easing: _this.startCubicBezier
              }
            },
            {
              e: _this._left,
              p: {height: ['100%', '0%']},
              o: {
                begin () {
                  _this._bottom.style.left = 'inherit';
                  _this._left.style.top = 'inherit';
                  _this._left.style.bottom = 0;
                },
                duration: _this.middleDuration,
                easing: _this.middleCubicBezier
              }
            },
            {
              e: _this._top,
              p: {width: [startPercent, '0%']},
              o: {
                begin () {
                  _this._top.style.left = 0;
                  _this._top.style.right = 'inherit';
                },
                duration: _this.endDuration,
                easing: _this.endCubicBezier,
                complete(){
                  _this.isAnimate = false;
                }
              }
            },
          ];
          Velocity.RunSequence(sequenceBottom);
          Velocity.RunSequence(sequenceTop);
        }
      }
    },
    created () {},
    mounted () {
      this._bottom = document.querySelectorAll('.circleButton__bottom')[0];
      this._left = document.querySelectorAll('.circleButton__left')[0];
      this._top = document.querySelectorAll('.circleButton__top')[0];
      this._right = document.querySelectorAll('.circleButton__right')[0];
    },
    activated () {},
    components: {}
  }
</script>

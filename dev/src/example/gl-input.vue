<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Gl-Input</Title>
            </Navbar>
        </Header>
        <Content padding>

            <div class="gl__input">
                <SnakeBox :trigger="trigger" :disableClick="true" :auto="true" :duration="750" :startPosition="20"
                          color="#fff"
                          class="snakebox">
                    <section class="inner" @click="focusInput">
                        <transition-group name="list" tag="span" class="gl-content--spanBox">
            <span class="gl-content__spanBox--span" v-for="item in inputValueForDisplay"
                  v-bind:key="item">{{item}}</span>
                        </transition-group>
                        <input type="number" v-model="inputValue" id="hidedInput" @focus="onfocus" @keyup="valueChange"
                               class="">
                    </section>
                </SnakeBox>
            </div>


            <Button type="solid" @click="GoSnake">GoSnake</Button>

            <div class="gl__button">
                <SnakeBox :delay="500" :auto="true" :duration="750" :startPosition="20" color="red" class="snakebox">
                    <section class="inner">
                        CREATE MY ACCOUNT
                    </section>
                </SnakeBox>
            </div>

            <p>* 刷新之后才能再次看到效果</p>


            <p>自动运行及点击</p>
            <div class="demo">
                <SnakeBox :auto="true" color="red" class="snakebox">
                    <section class="inner">
                        动画自动执行
                    </section>
                </SnakeBox>
            </div>
            <div class="demo">
                <SnakeBox color="red" class="snakebox">
                    <section class="inner">
                        点击运行动画
                    </section>
                </SnakeBox>
            </div>

            <p>选择起始位置及持续时间</p>
            <div class="demo">
                <SnakeBox :startPosition="50" :duration="500" class="snakebox">
                    <section class="inner">
                        左侧从一半开始,持续500ms
                    </section>
                </SnakeBox>
            </div>

            <div class="demo">
                <SnakeBox initState="right" :startPosition="50" :duration="500" class="snakebox">
                    <section class="inner">
                        右侧从一半开始,持续500ms
                    </section>
                </SnakeBox>
            </div>

            <p>设置延迟</p>
            <div class="demo">
                <SnakeBox color="blue" :delay="500" :startPosition="30" :duration="500" class="snakebox">
                    <section class="inner">
                        延迟500ms后再执行
                    </section>
                </SnakeBox>
            </div>

            <p>设置动画比例</p>
            <div class="demo">
                <SnakeBox :radio="40" color="green" :startPosition="30" :duration="500" class="snakebox">
                    <section class="inner">
                        动画比例40
                    </section>
                </SnakeBox>
            </div>

            <div class="demo">
                <SnakeBox :radio="4" color="green" :startPosition="30" :duration="500" class="snakebox">
                    <section class="inner">
                        动画比例4
                    </section>
                </SnakeBox>
            </div>

        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .gl__button {
        width: 100%;
        height: 100px;
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        .snakebox {
            width: 250px;
            height: 50px;
            .inner {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
                color: red;
                font-size: 18px;
                opacity: 1;
            }
        }
    }

    .gl__input {
        width: 100%;
        height: 100px;
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        .snakebox {
            width: 250px;
            height: 50px;
            .inner {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 100%;
                width: 100%;
                color: #fff;
                font-size: 24px;
                opacity: 1;
                padding: 0 15px;
                #hidedInput {
                    position: absolute;
                    top: 0;
                    left: -1px;
                    padding: 0 15px;
                    opacity: 0;
                    height: 100%;
                    width: 100%;
                    background: transparent;
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
            .inner {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
            }
        }
    }
</style>
<script type="text/javascript">

  export default{
    name: 'name',
    data () {
      return {
        isActive: false,
        inputValue: '',
        inputValueForDisplay: [],

        trigger: 0
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      GoSnake () {
        this.trigger = Math.random()
      },
      focusInput () {
        console.debug('focusInput')
        document.getElementById('hidedInput').focus()
      },
      onfocus () {
        // document.getElementById('hidedInput').style.left = "-20%";
      },

      valueChange () {
        console.debug('valueChange')
        let _arr = this.inputValue.toString().split('')
        if (_arr.length < 12) {
          this.inputValueForDisplay = _arr
        } else {
          _arr.pop()
          this.inputValue = _arr.join('')
        }
      }

    },
    created () {},
    mounted () {

    },
    activated () {},
    components: {}
  }
</script>

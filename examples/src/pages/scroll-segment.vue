<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>网易新闻</vm-title>
            </vm-navbar>
            <div class="scrollBar">
                <vm-scroll-segment v-model="newIndex">
                    <vm-scroll-segment-button v-for="(item, index) in arrs" :key="index">
                        <div class="scrollBar__btn">{{item}}</div>
                    </vm-scroll-segment-button>
                </vm-scroll-segment>
            </div>
        </vm-header>
        <vm-content class="outer-content">

            <div padding>
                <h4>简介</h4>
                <p>这个组件专注于提供水平滚动的业务需求, 比如像上方的滚动选择条. 通过给value传递index确定初始化时, 哪个btn将被选中.</p>
                <p>
                    此外, 监听组件的onChange事件可也判断是哪个Btn被选择. 比如当前的新闻类别为: <strong>{{newIndex}} {{arrs[newIndex]}}</strong>
                </p>
                <p>组件是根据组件的的中心定位, 当左右两边或有障碍物时, 居中效果会有偏移.</p>
                <p>另外, 只有在手机上才能体验到左右回弹的效果.</p>
            </div>

            <div class="horizontal">
                <div class="space">Space</div>
                <div class="content">
                    <div class="contentInner">
                        <vm-scroll-segment :value="2">
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">0</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">1</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">2</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">3</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">4</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">5</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">6</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">7</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">8</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">9</div>
                            </vm-scroll-segment-button>
                        </vm-scroll-segment>
                    </div>
                </div>
            </div>
            <section class="horizontal">
                <div class="content">
                    <div class="contentInner">
                        <vm-scroll-segment :value="2">
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">0</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">1</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">2</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">3</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">4</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">5</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">6</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">7</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">8</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">9</div>
                            </vm-scroll-segment-button>
                        </vm-scroll-segment>
                    </div>
                </div>
                <div class="space">Space</div>
            </section>
            <section class="horizontal">
                <div class="space">Space</div>
                <div class="content">
                    <div class="contentInner">
                        <vm-scroll-segment :value="2">
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">0</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">1</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">2</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">3</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">4</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">5</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">6</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">7</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">8</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">9</div>
                            </vm-scroll-segment-button>
                        </vm-scroll-segment>
                    </div>
                </div>
                <div class="space">Space</div>
            </section>

            <section class="horizontal">
                <div class="content">
                    <div class="contentInner">
                        <vm-scroll-segment :value="2">
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">鱼香肉丝</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">红烧狮子头</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">卷了三个鸡蛋的煎饼果子</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">新疆烤肉和香酥烤全羊</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">土家酱饼</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">杭椒牛柳</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">鸡蛋灌饼</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">超级辣的BT变态烤翅</div>
                            </vm-scroll-segment-button>
                            <vm-scroll-segment-button>
                                <div class="srollSegmentButton">啤酒</div>
                            </vm-scroll-segment-button>
                        </vm-scroll-segment>
                    </div>
                </div>
            </section>

            <div padding>
                <h4>异步子组件</h4>
                <p>可以通过增加value值实现手动控制,</p>
            </div>
            <vm-grid no-padding>
                <vm-row>
                    <vm-col class="colBox">
                        <vm-button outline small @click="changedValue--">Minus -- </vm-button>
                    </vm-col>
                    <vm-col class="colBox">
                        Value: {{changedValue}}
                    </vm-col>
                    <vm-col class="colBox">
                        <vm-button outline small @click="changedValue++">Add ++ </vm-button>
                    </vm-col>
                </vm-row>
                <vm-scroll-segment v-model="changedValue" class="header-scroll">
                    <vm-scroll-segment-button v-for="i in asynData" :key="i">
                        <div class="srollSegmentButton">{{i}}</div>
                    </vm-scroll-segment-button>
                </vm-scroll-segment>
            </vm-grid>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="scss">
    .scrollBar {
        width: 100%;
        height: 38px;
        background: #fff;
        position: relative;
        .scrollBar__btn {
            width: 60px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 0 0 38px;
            box-sizing: border-box;
        }
        .segment-button-active {
            color: red;
            font-size: 1.2em;
        }

        &:before, &:after {
            content: '';
            height: 100%;
            width: 20px;
            position: absolute;
            top: 0;
            z-index: 1;
        }
        &:before {
            left: 0;
            background: linear-gradient(to right, white 30%, rgba(255, 255, 255, 0.2) 100%);
        }
        &:after {
            right: 0;
            background: linear-gradient(to left, white 30%, rgba(255, 255, 255, 0.2) 100%);
        }
    }

    .horizontal {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 44px;
        width: 100%;
        border-top: 1px solid #333;
        border-bottom: 1px solid #333;
        margin-bottom: 30px;
        .space {
            display: inline-flex;
            width: 50px;
            height: 100%;
            background: #737373;
            flex: 0 0 50px;
            justify-content: center;
            align-items: center;
            color: #fff;
        }
        .content {
            display: flex;
            flex: 1 0 auto;
            height: 100%;
            position: relative;
            box-sizing: border-box;
            .contentInner {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                box-sizing: border-box;
            }
            .srollSegmentButton {
                min-width: 60px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                outline: 1px solid #ddd;
                /*flex: 0 0 100px;*/
                box-sizing: border-box;
                white-space: nowrap;
                padding: 0 20px;
            }
        }
        .segment-button-active {
            background: #ddd;
        }

    }

    .header-scroll {
        width: 100%;
        height: 44px;
        background: #fff;
        margin: 20px auto 30px;
        border-top: 1px solid #333;
        border-bottom: 1px solid #333;
        .srollSegmentButton {
            width: 80px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            outline: 1px solid #ddd;
            flex: 0 0 100px;
            box-sizing: border-box;
        }
        .segment-button-active {
            background: #ddd;
        }
    }

    .colBox {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<script type="text/javascript">
  export default{
    name: 'name',
    data () {
      return {
        changedValue: 3,
        arrs: ['头条', '科技', '独家', '搞笑', '娱乐', '体育', '视频', '财经', '汽车'],
        asynData: [],
        newIndex: 2
      }
    },
    props: {},
    watch: {
      newIndex (val) {
        console.log(val)
      }
    },
    computed: {},
    methods: {},
    created () {},
    mounted () {
      window.setTimeout(() => {
        let tmps = []
        for (let i = 0; i < 10; i++) {
          tmps.push(i)
        }
        this.asynData = tmps
      }, 500)
    },
    activated () {},
    deactivate () {},
    destroyed () {}
  }
</script>

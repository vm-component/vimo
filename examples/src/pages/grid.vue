<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Grid</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">

            <div padding>
                <h1>Grid组件</h1>
                <p>栅格系统类似于Bootstrap的栅格, 使用方法大同小异. 栅格组件用于 <strong>响应式布局</strong> 场景, 比如兼容 Mobile / Pad / PC 等设备. 一般移动小屏项目运用较少, 使用 <strong>Flex布局</strong> 即可Hold住绝大多数场景.</p>
            </div>

            <div padding>
                <h4>九宫格</h4>
                <p>需要在Grid加上属性[sudoku]即可</p>
            </div>
            <vm-grid no-padding class="nine" sudoku>
                <vm-row>
                    <vm-col class="box"></vm-col>
                    <vm-col class="box arrow">
                        <vm-icon name="arrow-dropup"></vm-icon>
                    </vm-col>
                    <vm-col class="box"></vm-col>
                </vm-row>
                <vm-row>
                    <vm-col class="box arrow">
                        <vm-icon name="arrow-dropleft"></vm-icon>
                    </vm-col>
                    <vm-col class="box arrow">
                        <vm-icon name="logo-javascript"></vm-icon>
                    </vm-col>
                    <vm-col class="box arrow">
                        <vm-icon name="arrow-dropright"></vm-icon>
                    </vm-col>
                </vm-row>
                <vm-row>
                    <vm-col class="box"></vm-col>
                    <vm-col class="box arrow">
                        <vm-icon name="arrow-dropdown"></vm-icon>
                    </vm-col>
                    <vm-col class="box"></vm-col>
                </vm-row>
            </vm-grid>

            <div class="demo" padding>
                <h4>传统用法</h4>
                <p>1. 普通用法</p>
                <vm-grid>
                    <vm-row>
                        <vm-col>1 of 2</vm-col>
                        <vm-col>
                            2 of 2


                        </vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col>
                            1 of 3


                        </vm-col>
                        <vm-col>
                            2 of 3


                        </vm-col>
                        <vm-col>
                            3 of 3


                        </vm-col>
                    </vm-row>
                </vm-grid>

                <p>2. 自定义宽度</p>
                <vm-grid>
                    <vm-row>
                        <vm-col>
                            1 of 3


                        </vm-col>
                        <vm-col col-8>
                            2 of 3 (col-8)


                        </vm-col>
                        <vm-col>
                            3 of 3


                        </vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col>
                            1 of 3


                        </vm-col>
                        <vm-col col-6>
                            2 of 3 (col-6)


                        </vm-col>
                        <vm-col>
                            3 of 3


                        </vm-col>
                    </vm-row>
                </vm-grid>
                <p>3. 根据内容自适应宽度</p>
                <vm-grid>
                    <vm-row>
                        <vm-col>
                            1 of 3
                        </vm-col>
                        <vm-col col-auto>
                            Variable width content
                        </vm-col>
                        <vm-col>
                            3 of 3
                        </vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col>
                            1 of 3
                        </vm-col>
                        <vm-col col-auto>
                            <vm-input placeholder="Variable width input"></vm-input>
                        </vm-col>
                        <vm-col>
                            3 of 3
                        </vm-col>
                    </vm-row>
                </vm-grid>

                <p>4. 自定义列宽</p>

                <vm-grid>
                    <vm-row>
                        <vm-col col-4>
                            col-4
                        </vm-col>
                        <vm-col col-2>
                            col-2
                        </vm-col>
                        <vm-col col-2>
                            col-2
                        </vm-col>
                        <vm-col col-4>
                            col-4
                        </vm-col>
                    </vm-row>
                </vm-grid>

                <p>5. 在小屏(col-sm)上改成堆叠方式</p>
                <vm-grid>
                    <vm-row>
                        <vm-col col-12 col-sm>
                            1 of 4
                        </vm-col>
                        <vm-col col-12 col-sm>
                            2 of 4
                        </vm-col>
                        <vm-col col-12 col-sm>
                            3 of 4
                        </vm-col>
                        <vm-col col-12 col-sm>
                            4 of 4
                        </vm-col>
                    </vm-row>
                </vm-grid>

                <p>6. 列偏移</p>
                <vm-grid>
                    <vm-row>
                        <vm-col col-3>
                            1 of 2
                        </vm-col>
                        <vm-col col-3 offset-3>
                            2 of 2
                        </vm-col>
                    </vm-row>
                </vm-grid>

                <p>7. 针对屏幕的列偏移</p>
                <vm-grid>
                    <vm-row>
                        <vm-col col-md-3>
                            1 of 3
                        </vm-col>
                        <vm-col col-md-3>
                            2 of 3
                        </vm-col>
                        <vm-col col-md-3 offset-md-3>
                            3 of 3
                        </vm-col>
                    </vm-row>
                </vm-grid>


                <p>8. push(左偏移-left)和pull(右偏移-right)的用法</p>
                <vm-grid>
                    <vm-row>
                        <vm-col col-6 push-6>
                            1 of 2
                        </vm-col>
                        <vm-col col-6 pull-6>
                            2 of 2
                        </vm-col>
                    </vm-row>
                </vm-grid>


                <p>9. 针对特定屏幕尺寸的push和pull的用法</p>
                <vm-grid>
                    <vm-row>
                        <vm-col col-md-6 push-md-3>
                            1 of 3
                        </vm-col>
                        <vm-col col-md-3 push-md-3>
                            2 of 3
                        </vm-col>
                        <vm-col col-md-3 pull-md-9>
                            3 of 3
                        </vm-col>
                    </vm-row>
                </vm-grid>

                <p>10. 行对齐方式</p>
                <vm-grid>
                    <vm-row align-items-start style="outline:2px solid blue;">
                        <vm-col>
                            1 of 4
                        </vm-col>
                        <vm-col>
                            2 of 4
                        </vm-col>
                        <vm-col>
                            3 of 4
                        </vm-col>
                        <vm-col>
                            4 of 4 <br>#<br>#<br>#
                        </vm-col>
                    </vm-row>

                    <vm-row align-items-center style="outline:2px solid blue;">
                        <vm-col>
                            1 of 4
                        </vm-col>
                        <vm-col>
                            2 of 4
                        </vm-col>
                        <vm-col>
                            3 of 4
                        </vm-col>
                        <vm-col>
                            4 of 4 <br>#<br>#<br>#
                        </vm-col>
                    </vm-row>

                    <vm-row align-items-end style="outline:2px solid blue;">
                        <vm-col>
                            1 of 4
                        </vm-col>
                        <vm-col>
                            2 of 4
                        </vm-col>
                        <vm-col>
                            3 of 4
                        </vm-col>
                        <vm-col>
                            4 of 4 <br>#<br>#<br>#
                        </vm-col>
                    </vm-row>
                </vm-grid>


                <p>11. 列对齐方式</p>
                <vm-grid>
                    <vm-row style="outline:2px solid blue;">
                        <vm-col align-self-start>
                            <div>
                                1 of 4
                            </div>
                        </vm-col>
                        <vm-col align-self-center>
                            <div>
                                2 of 4
                            </div>
                        </vm-col>
                        <vm-col align-self-end>
                            <div>
                                3 of 4
                            </div>
                        </vm-col>
                        <vm-col>
                            <div>
                                4 of 4 <br>#<br>#<br>#
                            </div>
                        </vm-col>
                    </vm-row>
                </vm-grid>


                <p>12. 水平对齐方式</p>
                <vm-grid>
                    <vm-row justify-content-start style="outline:2px solid blue;">
                        <vm-col col-3>
                            1 of 2
                        </vm-col>
                        <vm-col col-3>
                            2 of 2
                        </vm-col>
                    </vm-row>

                    <vm-row justify-content-center style="outline:2px solid blue;">
                        <vm-col col-3>
                            1 of 2
                        </vm-col>
                        <vm-col col-3>
                            2 of 2
                        </vm-col>
                    </vm-row>

                    <vm-row justify-content-end style="outline:2px solid blue;">
                        <vm-col col-3>
                            1 of 2
                        </vm-col>
                        <vm-col col-3>
                            2 of 2
                        </vm-col>
                    </vm-row>

                    <vm-row justify-content-around style="outline:2px solid blue;">
                        <vm-col col-3>
                            1 of 2
                        </vm-col>
                        <vm-col col-3>
                            2 of 2
                        </vm-col>
                    </vm-row>

                    <vm-row justify-content-between style="outline:2px solid blue;">
                        <vm-col col-3>
                            1 of 2
                        </vm-col>
                        <vm-col col-3>
                            2 of 2
                        </vm-col>
                    </vm-row>
                </vm-grid>


            </div>

        </vm-content>
    </vm-page>

</template>
<style scoped lang="scss">


    .demo {
        .grid, .row, .col {
            outline: 1px solid #a9a9a9;
        }
    }

    .box {
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        &:active {
            background: #ddd;
        }
    }

    .nine {
        background: #fff;
    }

</style>
<script type="text/javascript">
  export default{
    name: 'name',
    data () {
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>

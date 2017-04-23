<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Grid</Title>
            </Navbar>
        </Header>
        <Content padding>
            <p>1. 普通用法</p>
            <Grid>
                <Row>
                    <Column>1 of 2</Column>
                    <Column>
                        2 of 2


                    </Column>
                </Row>
                <Row>
                    <Column>
                        1 of 3


                    </Column>
                    <Column>
                        2 of 3


                    </Column>
                    <Column>
                        3 of 3


                    </Column>
                </Row>
            </Grid>


            <p>2. 自定义宽度</p>
            <Grid>
                <Row>
                    <Column>
                        1 of 3


                    </Column>
                    <Column col-8>
                        2 of 3 (col-8)


                    </Column>
                    <Column>
                        3 of 3


                    </Column>
                </Row>
                <Row>
                    <Column>
                        1 of 3


                    </Column>
                    <Column col-6>
                        2 of 3 (col-6)


                    </Column>
                    <Column>
                        3 of 3


                    </Column>
                </Row>
            </Grid>
            <p>3. 根据内容自适应宽度</p>
            <Grid>
                <Row>
                    <Column>
                        1 of 3


                    </Column>
                    <Column col-auto>
                        Variable width content


                    </Column>
                    <Column>
                        3 of 3


                    </Column>
                </Row>
                <Row>
                    <Column>
                        1 of 3


                    </Column>
                    <Column col-auto>
                        <Input placeholder="Variable width input"></Input>
                    </Column>
                    <Column>
                        3 of 3
                    </Column>
                </Row>
            </Grid>

            <p>4. 自定义列宽</p>

            <Grid>
                <Row>
                    <Column col-4>
                        col-4


                    </Column>
                    <Column col-2>
                        col-2


                    </Column>
                    <Column col-2>
                        col-2


                    </Column>
                    <Column col-4>
                        col-4


                    </Column>
                </Row>
            </Grid>

            <p>5. 在小屏(col-sm)上改成堆叠方式</p>
            <Grid>
                <Row>
                    <Column col-12 col-sm>
                        1 of 4


                    </Column>
                    <Column col-12 col-sm>
                        2 of 4


                    </Column>
                    <Column col-12 col-sm>
                        3 of 4


                    </Column>
                    <Column col-12 col-sm>
                        4 of 4


                    </Column>
                </Row>
            </Grid>

            <p>6. 列偏移</p>
            <Grid>
                <Row>
                    <Column col-3>
                        1 of 2


                    </Column>
                    <Column col-3 offset-3>
                        2 of 2


                    </Column>
                </Row>
            </Grid>

            <p>7. 针对屏幕的列偏移</p>
            <Grid>
                <Row>
                    <Column col-md-3>
                        1 of 3


                    </Column>
                    <Column col-md-3>
                        2 of 3


                    </Column>
                    <Column col-md-3 offset-md-3>
                        3 of 3


                    </Column>
                </Row>
            </Grid>


            <p>8. push(左偏移-left)和pull(右偏移-right)的用法</p>
            <Grid>
                <Row>
                    <Column col-6 push-6>
                        1 of 2


                    </Column>
                    <Column col-6 pull-6>
                        2 of 2


                    </Column>
                </Row>
            </Grid>


            <p>9. 针对特定屏幕尺寸的push和pull的用法</p>
            <Grid>
                <Row>
                    <Column col-md-6 push-md-3>
                        1 of 3


                    </Column>
                    <Column col-md-3 push-md-3>
                        2 of 3


                    </Column>
                    <Column col-md-3 pull-md-9>
                        3 of 3


                    </Column>
                </Row>
            </Grid>

            <p>10. 行对齐方式</p>
            <Grid>
                <Row align-items-start style="outline:2px solid blue;">
                    <Column>
                        1 of 4


                    </Column>
                    <Column>
                        2 of 4


                    </Column>
                    <Column>
                        3 of 4


                    </Column>
                    <Column>
                        4 of 4 <br>#<br>#<br>#


                    </Column>
                </Row>

                <Row align-items-center style="outline:2px solid blue;">
                    <Column>
                        1 of 4


                    </Column>
                    <Column>
                        2 of 4


                    </Column>
                    <Column>
                        3 of 4


                    </Column>
                    <Column>
                        4 of 4 <br>#<br>#<br>#


                    </Column>
                </Row>

                <Row align-items-end style="outline:2px solid blue;">
                    <Column>
                        1 of 4


                    </Column>
                    <Column>
                        2 of 4


                    </Column>
                    <Column>
                        3 of 4


                    </Column>
                    <Column>
                        4 of 4 <br>#<br>#<br>#


                    </Column>
                </Row>
            </Grid>


            <p>11. 列对齐方式</p>
            <Grid>
                <Row style="outline:2px solid blue;">
                    <Column align-self-start>
                        <div>
                            1 of 4


                        </div>
                    </Column>
                    <Column align-self-center>
                        <div>
                            2 of 4


                        </div>
                    </Column>
                    <Column align-self-end>
                        <div>
                            3 of 4


                        </div>
                    </Column>
                    <Column>
                        <div>
                            4 of 4 <br>#<br>#<br>#


                        </div>
                    </Column>
                </Row>
            </Grid>


            <p>12. 水平对齐方式</p>
            <Grid>
                <Row justify-content-start style="outline:2px solid blue;">
                    <Column col-3>
                        1 of 2


                    </Column>
                    <Column col-3>
                        2 of 2


                    </Column>
                </Row>

                <Row justify-content-center style="outline:2px solid blue;">
                    <Column col-3>
                        1 of 2


                    </Column>
                    <Column col-3>
                        2 of 2


                    </Column>
                </Row>

                <Row justify-content-end style="outline:2px solid blue;">
                    <Column col-3>
                        1 of 2


                    </Column>
                    <Column col-3>
                        2 of 2


                    </Column>
                </Row>

                <Row justify-content-around style="outline:2px solid blue;">
                    <Column col-3>
                        1 of 2


                    </Column>
                    <Column col-3>
                        2 of 2


                    </Column>
                </Row>

                <Row justify-content-between style="outline:2px solid blue;">
                    <Column col-3>
                        1 of 2


                    </Column>
                    <Column col-3>
                        2 of 2


                    </Column>
                </Row>
            </Grid>

        </Content>
    </Page>

</template>
<style scoped lang="scss">
    .grid, .row, .col {
        outline: 1px solid #a9a9a9;
    }
</style>
<script>
  export default{
    name: 'name',
    data(){
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

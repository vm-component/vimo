<template>
    <Page>
        <Header>
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <div padding>
                <h4>{{$t('sudoku')}}</h4>
            </div>
            <Grid no-padding class="nine" sudoku>
                <Row>
                    <Column class="box"></Column>
                    <Column class="box arrow">
                        <Icon name="arrow-dropup"></Icon>
                    </Column>
                    <Column class="box"></Column>
                </Row>
                <Row>
                    <Column class="box arrow">
                        <Icon name="arrow-dropleft"></Icon>
                    </Column>
                    <Column class="box arrow">
                        <Icon name="logo-javascript"></Icon>
                    </Column>
                    <Column class="box arrow">
                        <Icon name="arrow-dropright"></Icon>
                    </Column>
                </Row>
                <Row>
                    <Column class="box"></Column>
                    <Column class="box arrow">
                        <Icon name="arrow-dropdown"></Icon>
                    </Column>
                    <Column class="box"></Column>
                </Row>
            </Grid>

            <div class="demo" padding>
                <h4>{{$t('title')}}</h4>
                <p>1. {{$t('usage1')}}</p>
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

                <p>2. {{$t('usage2')}}</p>
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
                <p>3. {{$t('usage3')}}</p>
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

                <p>4. {{$t('usage4')}}</p>

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

                <p>5. {{$t('usage5')}}</p>
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

                <p>6. {{$t('usage6')}}</p>
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

                <p>7. {{$t('usage7')}}</p>
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

                <p>8. {{$t('usage8')}}</p>
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

                <p>9. {{$t('usage9')}}</p>
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

                <p>10. {{$t('usage10')}}</p>
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

                <p>11. {{$t('usage11')}}</p>
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

                <p>12. {{$t('usage12')}}</p>
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
            </div>
        </Content>
    </Page>

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
  export default {
    name: 'DemoGrid',
    i18n: {
      messages: {
        'zh-CN': {
          title: '栅格',
          sudoku: '九宫格',
          usage1: '普通用法',
          usage2: '自定义宽度',
          usage3: '根据内容自适应宽度',
          usage4: '自定义列宽',
          usage5: '在小屏(col-sm)上改成堆叠方式',
          usage6: '列偏移',
          usage7: '针对屏幕的列偏移',
          usage8: 'push(左偏移-left)和pull(右偏移-right)的用法',
          usage9: '针对特定屏幕尺寸的push和pull的用法',
          usage10: '行对齐方式',
          usage11: '列对齐方式',
          usage12: '水平对齐方式'
        },
        'en-US': {
          title: 'Grid',
          sudoku: 'Sudoku',
          usage1: 'General usage',
          usage2: 'Custom width',
          usage3: 'Content adaptive width',
          usage4: 'Custom column width',
          usage5: 'Change the stacking mode on the col-sm',
          usage6: 'Column offset',
          usage7: 'Column offsets for the screen',
          usage8: 'The use of push (left offset -left) and pull (right offset -right)',
          usage9: 'Push and pull usage for a specific screen size',
          usage10: 'Line alignment',
          usage11: 'Column alignment',
          usage12: 'Horizontal alignment'
        }
      }
    }
  }
</script>

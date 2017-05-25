<template>
    <Page>
        <Header>
            <Navbar>
                <Title>ScrollSegment</Title>
            </Navbar>
            <section class="header-scroll">
                <ScrollSegment :value="2">
                    <ScrollSegmentButton>
                        <div class="srollSegmentButton">0</div>
                    </ScrollSegmentButton>
                    <ScrollSegmentButton>
                        <div class="srollSegmentButton">1</div>
                    </ScrollSegmentButton>
                    <ScrollSegmentButton>
                        <div class="srollSegmentButton">2</div>
                    </ScrollSegmentButton>
                    <ScrollSegmentButton>
                        <div class="srollSegmentButton">3</div>
                    </ScrollSegmentButton>
                    <ScrollSegmentButton>
                        <div class="srollSegmentButton">4</div>
                    </ScrollSegmentButton>
                    <ScrollSegmentButton>
                        <div class="srollSegmentButton">5</div>
                    </ScrollSegmentButton>
                    <ScrollSegmentButton>
                        <div class="srollSegmentButton">6</div>
                    </ScrollSegmentButton>
                    <ScrollSegmentButton>
                        <div class="srollSegmentButton">7</div>
                    </ScrollSegmentButton>
                    <ScrollSegmentButton>
                        <div class="srollSegmentButton">8</div>
                    </ScrollSegmentButton>
                    <ScrollSegmentButton>
                        <div class="srollSegmentButton">9</div>
                    </ScrollSegmentButton>
                </ScrollSegment>
            </section>
        </Header>
        <Content class="outer-content">

            <h1>123</h1>

            <section class="horizontal">
                <div class="space"></div>
                <div class="content">
                    <div class="contentInner">
                        <ScrollSegment :value="2">
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">0</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">1</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">2</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">3</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">4</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">5</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">6</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">7</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">8</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">9</div>
                            </ScrollSegmentButton>
                        </ScrollSegment>
                    </div>
                </div>
            </section>
            <section class="horizontal">
                <div class="content">
                    <div class="contentInner">
                        <ScrollSegment :value="2">
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">0</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">1</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">2</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">3</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">4</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">5</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">6</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">7</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">8</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">9</div>
                            </ScrollSegmentButton>
                        </ScrollSegment>
                    </div>
                </div>
                <div class="space"></div>
            </section>
            <section class="horizontal">
                <div class="space"></div>
                <div class="content">
                    <div class="contentInner">
                        <ScrollSegment :value="2">
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">0</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">1</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">2</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">3</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">4</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">5</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">6</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">7</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">8</div>
                            </ScrollSegmentButton>
                            <ScrollSegmentButton>
                                <div class="srollSegmentButton">9</div>
                            </ScrollSegmentButton>
                        </ScrollSegment>
                    </div>
                </div>
                <div class="space"></div>
            </section>

            <Grid>
                <Row>
                    <Column>
                        <Button @click="changedValue--">change -- </Button>
                    </Column>
                    <Column>
                        {{changedValue}}
                    </Column>
                    <Column>
                        <Button @click="changedValue++">change ++ </Button>
                    </Column>
                </Row>
            </Grid>
        </Content>
        <Footer>
            <section class="header-scroll">
                <ScrollSegment v-model="changedValue">
                    <ScrollSegmentButton v-for="i in 10" :key="i">
                        <div class="srollSegmentButton">{{i}}</div>
                    </ScrollSegmentButton>
                </ScrollSegment>
            </section>
        </Footer>
    </Page>
</template>
<style scoped lang="scss">
    * {
        outline: 1px solid #ddd;
    }

    .horizontal {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 44px;
        width: 100%;
        .space {
            display: inline-flex;
            width: 50px;
            height: 100%;
            background: #000;
            flex: 0 0 50px;
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
                width: 100px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                outline: 1px solid #ddd;
                flex: 0 0 100px;
                box-sizing: border-box;
            }
        }

    }

    .header-scroll {
        width: 100%;
        height: 44px;
        background: #fff;
        .srollSegmentButton {
            width: 100px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            outline: 1px solid #ddd;
            flex: 0 0 100px;
            box-sizing: border-box;
        }
    }


</style>
<script type="text/javascript">
  import { ScrollSegment, ScrollSegmentButton } from 'vimo/components/scroll-segment'
  export default{
    name: 'name',
    components: {ScrollSegment, ScrollSegmentButton},
    data () {
      return {
        changedValue: 3
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {},
    deactivate () {},

    destroyed () {}
  }
</script>

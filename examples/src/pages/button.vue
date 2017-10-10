<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Button</Title>
            </Navbar>
        </Header>
        <Content padding>
            <h1>Button组件</h1>
            <p>该组件属于通用组件, 一般用于绑定事件触发动作, 可以是不用加native修饰符使用, 例如: @click="action()"</p>
            <h4>Colors</h4>
            <Grid>
                <Row justify-content-center>
                    <Button @click="primary()" color="primary">primary</Button>
                    <Button color="secondary" :isStrong="true">secondary</Button>
                    <Button color="danger">danger</Button>
                    <Button color="light">light</Button>
                    <Button color="light" disabled>light</Button>
                    <Button color="dark">dark</Button>
                    <Button>default color</Button>
                </Row>
            </Grid>
            <h4>Strong</h4>
            <Grid>
                <Row justify-content-center>
                    <Button active color="primary">primary</Button>
                    <Button active color="primary" strong>primary(strong)</Button>
                </Row>
            </Grid>
            <h4>Active</h4>
            <Grid>
                <Row justify-content-center>
                    <Button active color="primary">primary</Button>
                    <Button active color="primary" full>primary+full</Button>
                    <Button active color="primary" block>primary+block</Button>
                    <Button active color="primary" round>primary+round</Button>
                    <Button active color="primary" outline>primary+outline</Button>
                    <Button active color="primary" clear>primary+clear</Button>
                </Row>
            </Grid>
            <h4>Spinner</h4>
            <Grid>
                <Row justify-content-center>
                    <Button>
                        <span>Loading</span>
                        <Spinner color="light" name="ios-small"></Spinner>
                    </Button>
                </Row>
            </Grid>
            <h4>Full/Block/Round</h4>
            <Grid>
                <Row justify-content-center>
                    <Button full>full</Button>
                    <Button block>block</Button>
                    <Button round>round</Button>
                </Row>
            </Grid>
            <h4>Solid/Outline/Clear</h4>
            <Grid>
                <Row justify-content-center>
                    <!--solid-->
                    <Button solid color="secondary">solid</Button>
                    <Button outline color="secondary">outline</Button>
                    <Button outline color="danger">outline</Button>
                    <Button clear color="secondary">clear</Button>
                </Row>
            </Grid>
            <h4>Outline + Full/Block/Round</h4>
            <Grid>
                <Row justify-content-center>
                    <Button outline full color="secondary">outline + full</Button>
                    <Button outline block color="secondary">outline + block</Button>
                    <Button outline round color="secondary">outline + round</Button>
                </Row>
            </Grid>
            <h4>Large/Default/Small</h4>
            <Grid>
                <Row justify-content-center>
                    <Button color="light" large>large</Button>
                    <Button color="light" default>default</Button>
                    <Button color="light" small>small</Button>
                </Row>
            </Grid>
            <h4>Icons + Left/Only/Right</h4>
            <Grid>
                <Row justify-content-center>
                    <!--icon left-->
                    <Button color="dark">
                        <Icon class="icon" name="star"></Icon>
                        <span>Left Icon</span>
                    </Button>
                    <!--no icon-->
                    <Button color="dark">
                        <span> No Icon</span>
                    </Button>
                    <!--icon only-->
                    <Button color="dark">
                        <Icon class="icon" name="star"></Icon>
                    </Button>
                    <!--icon only-->
                    <Button color="dark">
                        <Icon class="icon" name="star"></Icon>
                    </Button>
                    <!--icon right-->
                    <Button color="dark">
                        <span>Right Icon</span>
                        <Icon class="icon" name="star"></Icon>
                    </Button>
                </Row>
            </Grid>
        </Content>
    </Page>
</template>
<style scoped lang="less">
    .buttons {
        text-align: center;
    }
</style>
<script type="text/javascript">
  export default {
    data () {
      return {}
    },
    methods: {
      primary: function () {
        console.log('primary')
      }
    }
  }
</script>

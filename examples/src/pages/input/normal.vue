<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Normal</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>
                    <span>布局</span>
                </ListHeader>
                <Item>
                    <Label color="primary">Inline Label</Label>
                    <Input placeholder="Text Input"></Input>
                </Item>
                <Item>
                    <Label color="primary" fixed>Fixed Label with fixed width</Label>
                    <Input type="tel" placeholder="Tel Input"></Input>
                </Item>
                <Item>
                    <Input type="number" placeholder="Number Input with no label"></Input>
                </Item>
                <Item>
                    <Label color="primary" stacked>Stacked Label</Label>
                    <Input type="email" placeholder="Email Input"></Input>
                </Item>
                <Item>
                    <Label color="primary" floating>Floating Label</Label>
                    <Input type="text"></Input>
                </Item>
            </List>
            <List>
                <ListHeader>
                    <span>右侧清除按钮</span>
                </ListHeader>
                <Item>
                    <Input v-model="normalValue" placeholder="Clear Input" clearInput></Input>
                </Item>
                <Item>
                    <Label>Value:</Label>
                    <span slot="item-right">{{normalValue}}</span>
                </Item>
            </List>
            <List>
                <ListHeader>
                    <span>Debounce</span>
                </ListHeader>
                <Item>
                    <Input v-model="debounceValue" :debounce="1000" placeholder="Debounce 1000ms" clearInput></Input>
                </Item>
                <Item>
                    <Label>Value:</Label>
                    <span slot="item-right">{{debounceValue}}</span>
                </Item>
            </List>
            <List>
                <ListHeader>
                    <span>Password(自动清除)</span>
                </ListHeader>
                <Item>
                    <Label color="primary" stacked>Password</Label>
                    <Input type="password" placeholder="Password Input" clear-input></Input>
                </Item>
            </List>

            <List>
                <ListHeader>
                    <span>Test</span>
                </ListHeader>
                <Item>
                    <Label color="primary">TestValue</Label>
                    <Input :clearInput="true"
                           :max="18"
                           placeholder="最多输入18个字符"
                           v-model="testValue"
                           :disabled="testDisabled"></Input>
                </Item>
                <Item>
                    <span slot="item-left"> 当前的值({{testValue ? testValue.length : 0}}): {{testValue}}</span>
                    <Button slot="item-right" small outline @click="testDisabled = !testDisabled">Disable</Button>
                </Item>
            </List>
            <List>
                <ListHeader>Focus Highlight</ListHeader>
                <Item>
                    <Label color="primary">聚焦高亮1</Label>
                    <Input :showFocusHighlight="true" placeholder="输入文本" type="text" clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">聚焦高亮2</Label>
                    <Input :showFocusHighlight="true" placeholder="输入文本" type="text" clearInput></Input>
                </Item>
            </List>

            <List>
                <ListHeader>Input单独使用</ListHeader>

                <section class="customer">
                    <Input :showFocusHighlight="true" placeholder="输入文本" type="text" clearInput></Input>
                </section>
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'InputDemo',
    data () {
      return {
        debounceValue: null,
        normalValue: null,
        testValue: 'Edit...',
        testDisabled: false
      }
    }
  }
</script>
<style lang="scss">
    .customer {
        width: 80%;
        height: 40px;
        background-color: #ffffff;
        color: #000000;
        margin: 10px auto;
        padding-left: 10px;
    }
</style>
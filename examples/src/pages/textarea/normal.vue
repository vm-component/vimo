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
                    <Textarea placeholder="Text Input"></Textarea>
                </Item>
                <Item>
                    <Label color="primary" fixed>Fixed Label with fixed width</Label>
                    <Textarea placeholder="Text Input"></Textarea>
                </Item>
                <Item>
                    <Label color="primary" floating>Floating Label</Label>
                    <Textarea></Textarea>
                </Item>

                <Item>
                    <Textarea :cols="3" placeholder="Text here"></Textarea>
                </Item>
                <Item>
                    <Label color="primary" stacked>Stacked Label</Label>
                    <Textarea placeholder="Text here"></Textarea>
                </Item>
            </List>
            <List>
                <Item>
                    <Label color="primary" stacked>计数</Label>
                    <Textarea :count="10000"  placeholder="输入文本"></Textarea>
                </Item>
                <Item>
                    <Label color="primary" stacked>聚焦高亮</Label>
                    <Textarea showFocusHighlight placeholder="输入文本"></Textarea>
                </Item>
                <Item>
                    <Label color="primary" stacked>自动高度</Label>
                    <Textarea autosize placeholder="输入文本"></Textarea>
                </Item>
                <Item>
                    <Label color="primary" stacked>禁用</Label>
                    <Textarea :rows="1" disabled placeholder="输入文本"></Textarea>
                </Item>
                <Item>
                    <Label color="primary" stacked>最长20个字符</Label>
                    <Textarea :rows="1" :maxlength="20" placeholder="输入文本"></Textarea>
                </Item>
                <Item>
                    <Label color="primary" stacked>只读</Label>
                    <Textarea :rows="1" readonly placeholder="输入文本"></Textarea>
                </Item>
            </List>
            <List>
                <ListHeader>
                    <span>单独使用</span>
                </ListHeader>
                <section class="customer">
                    <Textarea :count="300" autosize placeholder="Text here"></Textarea>
                </section>
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'TextareaDemo',
    data () {
      return {}
    },
    methods: {}
  }
</script>
<style scoped lang="less">
    .customer {
        width: 80%;
        background-color: #ffffff;
        color: #000000;
        margin: 10px auto;
        padding: 1px 10px;
    }
</style>

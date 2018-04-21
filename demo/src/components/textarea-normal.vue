<template>
    <Page>
        <Header>
            <Navbar>
                <Title>{{$t('title')}}</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>
                    <span>With Label</span>
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
                    <Label color="primary" stacked>Input Count</Label>
                    <Textarea :count="10000" placeholder="Please input text..."></Textarea>
                </Item>
                <Item>
                    <Label color="primary" stacked>Highlighting</Label>
                    <Textarea showFocusHighlight placeholder="Please input text..."></Textarea>
                </Item>
                <Item>
                    <Label color="primary" stacked>Auto Height</Label>
                    <Textarea autosize placeholder="Please input text..."></Textarea>
                </Item>
                <Item>
                    <Label color="primary" stacked>Disabled</Label>
                    <Textarea :rows="1" disabled placeholder="Please input text..."></Textarea>
                </Item>
                <Item>
                    <Label color="primary" stacked>Up to 20 characters</Label>
                    <Textarea :rows="1" :maxlength="20" placeholder="Please input text..."></Textarea>
                </Item>
                <Item>
                    <Label color="primary" stacked>ReadOnly</Label>
                    <Textarea :rows="1" readonly placeholder="Please input text..."></Textarea>
                </Item>
            </List>
            <List>
                <ListHeader>
                    <span>Use Alone</span>
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
    name: 'DemoTextareaNormal',
    i18n: {
      messages: {
        'zh-CN': {
          title: '普通用法',
        },
        'en-US': {
          title: 'Normal',
        }
      }
    }
  }
</script>
<style scoped lang="scss">
    .customer {
        width: 80%;
        background-color: #ffffff;
        color: #000000;
        margin: 10px auto;
        padding: 1px 10px;
        outline: 1px solid #ddd;
    }
</style>

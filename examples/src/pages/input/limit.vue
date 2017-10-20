<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Limit</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>长度限制</ListHeader>
                <Item>
                    <Label color="primary">最长10个字符</Label>
                    <Input :max="10" show-focus-highlight placeholder="输入文本" type="text" v-model="text" clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">最大数字为10000</Label>
                    <Input :max="10000" show-focus-highlight placeholder="输入数字" type="number" v-model="number" clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">最小数字为3</Label>
                    <Input :min="3" show-focus-highlight placeholder="输入数字" type="number" clearInput></Input>
                </Item>

                <Item>
                    <Label color="primary">小数点后最多3位</Label>
                    <Input :decimal="3" show-focus-highlight placeholder="输入数字" type="number" clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">金额(0~100)</Label>
                    <Input :min="0" :max="100" show-focus-highlight placeholder="输入金额" type="number" clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">数字范围(-2~10)</Label>
                    <Input :min="-2" :max="10" show-focus-highlight placeholder="-2~10" type="number"
                           clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">数字范围(0~10)</Label>
                    <Input :min="0" :max="10" show-focus-highlight placeholder="0~10" type="number" clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">数字范围(2~10)</Label>
                    <Input :min="2" :max="10" show-focus-highlight placeholder="2~10" type="number" clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">url</Label>
                    <Input show-focus-highlight placeholder="Input urls" type="url" clearInput></Input>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'InputLimitDemo',
    data () {
      return {
        text: null,
        number: null
      }
    }
  }
</script>

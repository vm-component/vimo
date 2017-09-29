<template>
    <Page>
        <Header>
            <Navbar>
                <Title>ListDividers</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <ItemGroup>
                <ItemDivider color="light">A</ItemDivider>
                <Item>Angola</Item>
                <Item>Angular</Item>
                <Item>America</Item>
                <Item>Arg</Item>
            </ItemGroup>
            <ItemGroup>
                <ItemDivider color="light">B</ItemDivider>
                <Item>Bee</Item>
                <Item>Book</Item>
                <Item>Back</Item>
                <Item>Bear</Item>
            </ItemGroup>

        </Content>
    </Page>
</template>
<style lang="less">

</style>
<script type="text/javascript">
  export default{
    data () {
      return {
        list: [
          'ListDividers 1',
          'NoLine 2',
          'NoLine 3',
          'NoLine 4',
          'NoLine 5',
          'NoLine 6',
          'NoLine 7',
          'NoLine 8',
          'NoLine 9',
          'NoLine 10',
          'NoLine 11',
          'NoLine 12',
          'NoLine 13',
          'NoLine 14'
        ]
      }
    }
  }
</script>

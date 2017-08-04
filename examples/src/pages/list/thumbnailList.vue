<template>
    <Page>
        <Header>
            <Navbar>
                <Title>ThumbnailList</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">

            <List>
                <Item>
                    <Thumbnail slot="item-left">
                        <img src="./img/thumbnail-totoro.png">
                    </Thumbnail>
                    <Label>
                        <h2>My Neighbor Totoro</h2>
                        <p>Hayao Miyazaki • 1988</p>
                    </Label>
                    <Button ion-button clear slot="item-right">View</Button>
                </Item>
                <Item>
                    <Thumbnail slot="item-left">
                        <img src="./img/thumbnail-rotla.png">
                    </Thumbnail>
                    <Label>
                        <h2>My Neighbor Totoro</h2>
                        <p>Hayao Miyazaki • 1988</p>
                    </Label>
                    <Button ion-button clear slot="item-right">View</Button>
                </Item>

            </List>

        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default{}
</script>

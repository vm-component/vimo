<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Advanced Cards</Title>
      </Navbar>
    </Header>
    <Content>

      <!--card type 1-->
      <Card>
        <img src="./img/nin-live.png"/>
        <CardContent>
          <CardTitle>
            Nine Inch Nails Live
          </CardTitle>
          <p>
            The most popular industrial group ever, and largely
            responsible for bringing the music to a mass audience.
          </p>
        </CardContent>
        <Grid>
          <Row>
            <Column>
              <Button size="small" type="clear">
                <Icon class="icon" name="fa-star"></Icon>
                Favourite
              </Button>
            </Column>
            <Column>
              <Button size="small" type="clear">
                <Icon class="icon" name="fa-music"></Icon>
                Music
              </Button>
            </Column>
            <Column>
              <Button size="small" type="clear">
                <Icon class="icon" name="fa-share"></Icon>
                Share
              </Button>
            </Column>
          </Row>
        </Grid>
      </Card>

      <!--card type 2-->
      <Card class="card-background-page">
        <img src="./img/card-saopaolo.png"/>
        <div class="card-title">São Paulo</div>
        <div class="card-subtitle">41 Listings</div>
      </Card>
      <Card class="card-background-page">
        <img src="./img/card-amsterdam.png"/>
        <div class="card-title">Amsterdam</div>
        <div class="card-subtitle">64 Listings</div>
      </Card>
      <Card class="card-background-page">
        <img src="./img/card-sf.png"/>
        <div class="card-title">San Francisco</div>
        <div class="card-subtitle">72 Listings</div>
      </Card>
      <Card class="card-background-page">
        <img src="./img/card-madison.png"/>
        <div class="card-title">Madison</div>
        <div class="card-subtitle">28 Listings</div>
      </Card>


      <!--card type 3-->
      <Card>
        <Item>
          <Avatar item-left>
            <img src="./img/marty-avatar.png">
          </Avatar>
          <Label>
            <h2>Marty McFly</h2>
            <p>November 5, 1955</p>
          </Label>
        </Item>
        <img src="./img/advance-card-bttf.png">
        <Card-content>
          <p>Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a
            DeLorean?! Whoa. This is heavy.</p>
        </Card-content>
        <Row>
          <Column>
            <Button type="clear"  clear size="small">
              <Icon name="fa-thumbs-up"></Icon>
              <div>12 Likes</div>
            </Button>
          </Column>
          <Column>
            <Button type="clear" clear  size="small">
              <Icon name="fa-text"></Icon>
              <div>4 Comments</div>
            </Button>
          </Column>
          <Column align-self-center text-center>
            <Note>
              11h ago
            </Note>
          </Column>
        </Row>
      </Card>
    </Content>
  </Page>
</template>
<style lang="scss">

  .card-background-page.ion-card {
    position: relative;
    text-align: center;
    .card-title {
      position: absolute;
      top: 36%;
      font-size: 2.0em;
      width: 100%;
      font-weight: bold;
      color: #fff;
    }

    .card-subtitle {
      font-size: 1.0em;
      position: absolute;
      top: 52%;
      width: 100%;
      color: #fff;
    }
  }

</style>


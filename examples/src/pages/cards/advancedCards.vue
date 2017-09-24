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
                        <span> Nine Inch Nails Live</span>
                    </CardTitle>
                    <p>
                        The most popular industrial group ever, and largely
                        responsible for bringing the music to a mass audience.
                    </p>
                </CardContent>
                <Row>
                    <Column>
                        <Button small clear>
                            <Icon class="icon" name="star"></Icon>
                            <span>Favourite</span>
                        </Button>
                    </Column>
                    <Column>
                        <Button small clear>
                            <Icon class="icon" name="car"></Icon>
                            <span>Music</span>
                        </Button>
                    </Column>
                    <Column>
                        <Button small clear>
                            <Icon class="icon" name="share"></Icon>
                            <span>Share</span>
                        </Button>
                    </Column>
                </Row>
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
                <CardContent>
                    <p>
                        Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a
                        DeLorean?! Whoa. This is heavy.</p>
                </CardContent>
                <Row>
                    <Column>
                        <Button clear small>
                            <Icon name="thumbs-up"></Icon>
                            <div>12 Likes</div>
                        </Button>
                    </Column>
                    <Column>
                        <Button clear small>
                            <Icon name="text"></Icon>
                            <div>4 Comments</div>
                        </Button>
                    </Column>
                    <Column align-self-center text-center>
                        <Note>
                            <span>11h ago</span>
                        </Note>
                    </Column>
                </Row>
            </Card>
        </Content>
    </Page>
</template>
<style lang="less">

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
<script type="text/javascript">
  export default{}
</script>

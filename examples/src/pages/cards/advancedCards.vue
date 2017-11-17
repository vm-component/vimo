<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Advanced Cards</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content>

            <!--card type 1-->
            <vm-card>
                <img src="./img/nin-live.png"/>
                <vm-card-content>
                    <vm-card-title>
                        <span> Nine Inch Nails Live</span>
                    </vm-card-title>
                    <p>
                        The most popular industrial group ever, and largely
                        responsible for bringing the music to a mass audience.
                    </p>
                </vm-card-content>
                <vm-row>
                    <vm-col>
                        <vm-button small clear>
                            <vm-icon class="icon" name="star"></vm-icon>
                            <span>Favourite</span>
                        </vm-button>
                    </vm-col>
                    <vm-col>
                        <vm-button small clear>
                            <vm-icon class="icon" name="car"></vm-icon>
                            <span>Music</span>
                        </vm-button>
                    </vm-col>
                    <vm-col>
                        <vm-button small clear>
                            <vm-icon class="icon" name="share"></vm-icon>
                            <span>Share</span>
                        </vm-button>
                    </vm-col>
                </vm-row>
            </vm-card>

            <!--card type 2-->
            <vm-card class="card-background-page">
                <img src="./img/card-saopaolo.png"/>
                <div class="card-title">São Paulo</div>
                <div class="card-subtitle">41 Listings</div>
            </vm-card>
            <vm-card class="card-background-page">
                <img src="./img/card-amsterdam.png"/>
                <div class="card-title">Amsterdam</div>
                <div class="card-subtitle">64 Listings</div>
            </vm-card>
            <vm-card class="card-background-page">
                <img src="./img/card-sf.png"/>
                <div class="card-title">San Francisco</div>
                <div class="card-subtitle">72 Listings</div>
            </vm-card>
            <vm-card class="card-background-page">
                <img src="./img/card-madison.png"/>
                <div class="card-title">Madison</div>
                <div class="card-subtitle">28 Listings</div>
            </vm-card>


            <!--card type 3-->
            <vm-card>
                <vm-item>
                    <vm-avatar item-start>
                        <img src="./img/marty-avatar.png">
                    </vm-avatar>
                    <vm-label>
                        <h2>Marty McFly</h2>
                        <p>November 5, 1955</p>
                    </vm-label>
                </vm-item>
                <img src="./img/advance-card-bttf.png">
                <vm-card-content>
                    <p>
                        Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a
                        DeLorean?! Whoa. This is heavy.</p>
                </vm-card-content>
                <vm-row>
                    <vm-col>
                        <vm-button clear small>
                            <vm-icon name="thumbs-up"></vm-icon>
                            <div>12 Likes</div>
                        </vm-button>
                    </vm-col>
                    <vm-col>
                        <vm-button clear small>
                            <vm-icon name="text"></vm-icon>
                            <div>4 Comments</div>
                        </vm-button>
                    </vm-col>
                    <vm-col align-self-center text-center>
                        <vm-note>
                            <span>11h ago</span>
                        </vm-note>
                    </vm-col>
                </vm-row>
            </vm-card>
        </vm-content>
    </vm-page>
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
<script type="text/javascript">
  export default{}
</script>

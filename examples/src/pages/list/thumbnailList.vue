<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>ThumbnailList</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">

            <vm-list>
                <vm-item>
                    <Thumbnail slot="item-left">
                        <img src="./img/thumbnail-totoro.png">
                    </Thumbnail>
                    <vm-label>
                        <h2>My Neighbor Totoro</h2>
                        <p>Hayao Miyazaki • 1988</p>
                    </vm-label>
                    <vm-button ion-button clear slot="item-right">View</vm-button>
                </vm-item>
                <vm-item>
                    <Thumbnail slot="item-left">
                        <img src="./img/thumbnail-rotla.png">
                    </Thumbnail>
                    <vm-label>
                        <h2>My Neighbor Totoro</h2>
                        <p>Hayao Miyazaki • 1988</p>
                    </vm-label>
                    <vm-button ion-button clear slot="item-right">View</vm-button>
                </vm-item>

            </vm-list>

        </vm-content>
    </vm-page>
</template>
<script type="text/javascript">
  export default{}
</script>

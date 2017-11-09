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
                    <vm-thumbnail slot="item-start">
                        <img src="./img/thumbnail-totoro.png">
                    </vm-thumbnail>
                    <vm-label>
                        <h2>My Neighbor Totoro</h2>
                        <p>Hayao Miyazaki • 1988</p>
                    </vm-label>
                    <vm-button ion-button clear slot="item-end">View</vm-button>
                </vm-item>
                <vm-item>
                    <vm-thumbnail slot="item-start">
                        <img src="./img/thumbnail-rotla.png">
                    </vm-thumbnail>
                    <vm-label>
                        <h2>My Neighbor Totoro</h2>
                        <p>Hayao Miyazaki • 1988</p>
                    </vm-label>
                    <vm-button ion-button clear slot="item-end">View</vm-button>
                </vm-item>

            </vm-list>

        </vm-content>
    </vm-page>
</template>
<script type="text/javascript">
  export default{}
</script>

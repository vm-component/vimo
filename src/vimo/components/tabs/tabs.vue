<template>
    <div class="ion-tabs">
        <div class="tabbar" role="tablist" #tabbar>
        <a *ngFor="let t of _tabs" [tab]="t" class="tab-button" [class.tab-disabled]="!t.enabled" [class.tab-hidden]="!t.show" role="tab" href="#" (ionSelect)="select($event)">
            <Icon *ngIf="t.tabIcon" [name]="t.tabIcon" [isActive]="t.isSelected" class="tab-button-icon"></Icon>
            <span *ngIf="t.tabTitle" class="tab-button-text">{{t.tabTitle}}</span>
            <ion-badge *ngIf="t.tabBadge" class="tab-badge" [color]="t.tabBadgeStyle">{{t.tabBadge}}</ion-badge>
            <div class="button-effect"></div>
            </a>
        <div class="tab-highlight"></div>
        </div>
        <ng-content></ng-content>
        <div #portal tab-portal></div>

    </div>
</template>
<style scoped lang="scss">
 .main{

 }
</style>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{}
        },
        watch:{},
        computed:{},
        methods:{},
        created:function(){},
        mounted:function(){},
        activated:function(){},
        components:{}
    }
</script>

<template>
    <div>   
        <view-box >
            <keep-alive>
                <router-view  v-wechat-title="$route.meta.title"/>
            </keep-alive>
        </view-box>
    </div>
</template>

<script>
    import { Tabbar, TabbarItem,ViewBox,Drawer} from 'vux'
    export default{
        components:{
            Tabbar,
            TabbarItem,
            ViewBox,
            Drawer
        },
    mounted(){
        console.info('用户控制中心');
    }
       
    }
</script>

<style>
    .albert-tab-item{
        text-decoration: none;
    }
</style>


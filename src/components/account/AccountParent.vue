<template>
    <div>   
            <view-box >
                <keep-alive>
                    <router-view  v-wechat-title="$route.meta.title"/>
                </keep-alive>
            </view-box>
        <tabbar style="position:fixed" body-padding-bottom="55px" slot="bottom">
            <tabbar-item  :selected="selectTabItem===2" link="/account" class="albert-tab-item">
                <img slot="icon" src="../../assets/account_tab_home.png">
                <span slot="label">成长记录</span>
            </tabbar-item>
            <tabbar-item :selected="selectTabItem===4" link="/account/myaccount" class="albert-tab-item">
                <img slot="icon" src="../../assets/account_tab_home.png">
                <span slot="label">个人中心</span>
            </tabbar-item>
        </tabbar>
        
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
        data(){
            return {
                selectTabItem:0
            }
        },
        mounted(){
            this.selectTabItem = this.$router.currentRoute.meta.id
        },
        watch: {
            '$route' (to, from) {
                this.selectTabItem = to.meta.id
            }
        }
       
    }
</script>

<style>
    .albert-tab-item{
        text-decoration: none;
    }
</style>


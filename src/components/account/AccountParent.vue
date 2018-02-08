<template>
    <div>   
            头部
            <view-box >
                <div >
                <keep-alive>
                    <router-view/>
                </keep-alive>
                </div>
            </view-box>
        <tabbar style="position:fixed" body-padding-bottom="55px" slot="bottom">
            <tabbar-item selected link="/account">
                <img slot="icon" src="../../assets/account_tab_home.png">
                <span slot="label">会所服务</span>
            </tabbar-item>
            <tabbar-item link="/account/growthrecord" show-dot>
                <img slot="icon" src="../../assets/account_tab_home.png">
                <span slot="label">成长记录</span>
            </tabbar-item>
            <tabbar-item link="/account/healthmom">
                <img slot="icon" src="../../assets/account_tab_home.png">
                <span slot="label">健康妈妈</span>
            </tabbar-item>
            <tabbar-item badge="2" link="/account/myaccount">
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
                
            }
        }
    }
</script>


<template>
    <div>
        <div>{{$route.params.username}}</div>
        <router-view/>
        <tabbar>
            <tabbar-item selected link="/account/张亚强/clubservice">
                <img slot="icon" src="../../assets/account_tab_home.png">
                <span slot="label">会所服务</span>
            </tabbar-item>
            <tabbar-item link="/account/张亚强/growthrecord" show-dot>
                <img slot="icon" src="../../assets/account_tab_home.png">
                <span slot="label">成长记录</span>
            </tabbar-item>
            <tabbar-item link="/account/张亚强/healthmom">
                <img slot="icon" src="../../assets/account_tab_home.png">
                <span slot="label">健康妈妈</span>
            </tabbar-item>
            <tabbar-item badge="2" link="/account/张亚强/myaccount">
                <img slot="icon" src="../../assets/account_tab_home.png">
                <span slot="label">个人中心</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import { Tabbar, TabbarItem} from 'vux'
    export default{
        components:{
            Tabbar,
            TabbarItem
        },
        data(){
            return {
                
            }
        }
    }
</script>


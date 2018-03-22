<template>
    <div class='sy-page'>
        <x-header class="sy-topbar" :left-options="{showBack: false}" title='选择门店'>
                <i slot='left' class='fa fa-chevron-left' @click='back'></i>
        </x-header>
        <loading-box v-show="show.loading"></loading-box>
        <div v-show='show.post' v-for='item in stores' class='store' @click='selectedStore(item)' :class="{'sy-select' : item==selectStore}">
            <div>
                <p class='name'>{{item.name}}</p>
                <p class='address'>地址：{{item.address}}</p>
                <p class='tel'>电话：{{item.tel}}</p>
            </div>
            <div class='nav'></div>
        </div>
    </div>
</template>
<script>
    import { TransferDom,XHeader,XTextarea, Group,XButton,Popup,PopupHeader,Radio  } from 'vux'
    
    import loadingBox from '@/components/LoadingBox'
    import myPopup from '@/components/MyPopup'

    export default{
        components:{
            XHeader,
            XTextarea,
            Group,XButton,
            loadingBox,Popup,PopupHeader,Radio,
            myPopup
        },
        data(){
            return{
                show:{
                    loading:false,
                    post:false,
                },
                stores:[],
                selectStore:{}
            }
        },
        mounted(){
            this.apiStore()
        },
        methods:{
            back(){
                this.$router.back()
            },
            selectedStore:function(item){
                this.selectStore = item
                this.$store.dispatch('selectStore',this.selectStore)
                this.$router.back()
            },
            apiStore() {
                this.show.loading = true
                this.show.post = false
                let _this = this;
                if(this.stores.length>0){
                    this.show.post = true
                    this.show.loading = false
                    return
                }
                this.$api.get('/wechat/show/store')
                .then(function(data){
                    _this.show.post = true
                    _this.show.loading = false
                    _this.stores = data.object
                })
                .catch(this.$errorHandle)
            },
        }
    }
</script>

<style lang='less'>
    @import '../../assets/app.less';
    .sy-select{
        background: #ffffff url(../../assets/select.svg) no-repeat right bottom;
        background-size:1.6rem;
    }
    .store{
        .sy-box();
        padding:@padding1;
        margin:@padding0;
        font-size:0.8rem;
        display: flex;
        justify-content:space-between;
        div:nth-child(1){
            border-left:3px solid spin(@basecolor,180);
            padding-left:@padding4;
            display: flex;
            flex-direction: column;
        }
        p{
            margin:@padding4;
            color:@black1;
        }
        p.name{
            font-size:1rem;
            color:@black0;
        }
        .nav{
            //border-left:3px solid #E51C23;
        }
    }
</style>
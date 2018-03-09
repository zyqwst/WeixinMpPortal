<template>
    <div>  
           
        <x-header :left-options="{showBack: false}" :title="selectStore.name">
            <svg slot="right" @click="showStorePop" type="navicon" size="35" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-navicon" style="fill: rgb(255, 255, 255); position: relative; top: -8px; left: -3px;"><path d="M96 241h320v32H96zm0-96h320v32H96zm0 192h320v32H96z"></path></svg>
        </x-header>
        <view-box >
            <loading-box v-show='show.isLoading'>

            </loading-box>
            <show-dtl :content='showItem.content' v-show="show.post"></show-dtl>
            <div v-show="show.isError">
                网络请求出错，请稍后重试
            </div>
        </view-box>
        <tabbar style="position:fixed" body-padding-bottom="55px" slot="bottom">
            <tabbar-item :selected="selectTabId === item.type+'/'+selectStore.id" v-for="item in tabItems" :key="item.id" @on-item-click="onItemClick" class="albert-tab-item">
                <span slot="label">{{item.title}}</span>
            </tabbar-item>
        </tabbar>
        <div v-transfer-dom>
            <popup v-model="showMenus" position="left" max-height="100%" width="100%">
                <popup-header
                right-text="取消"
                title="选择门店"
                :show-bottom-border="false"
                @on-click-right="showMenus = false"
                >
                </popup-header>
                    <group gutter="0">
                        <radio :options="storeMenus" @on-change="onSelectStore" value="selectStore.id">
                            <template slot-scope="props" slot="each-item">
                                <span v-text="props.label"></span>
                            </template>
                        </radio>
                    </group>
            </popup>
        </div>
    </div>
</template>

<script>
    import {TransferDom,Popup,PopupHeader,Group,Radio,Icon,XHeader, ViewBox,Tabbar,TabbarItem,Sticky,XButton} from 'vux'
    import showDtl from './ShowDtl'
    import loadingBox from '@/components/LoadingBox'
    import { mapState, mapGetters } from "vuex";
   
    export default{
        directives: {
            TransferDom
        },
        components:{
            XHeader,
            Icon,
            Group,
            Radio,
            XButton,
            Popup,
            PopupHeader,
            ViewBox,
            Tabbar,
            TabbarItem,
            Sticky,
            showDtl,
            loadingBox
        },
        data(){
            return {
                tabItems:[],
                selectTabId:'',/*type+tabItem*/
                stores:[],
                selectStore:{id:null,name:''},
                show:{
                    post:false,
                    isLoading:false,
                    isError:false
                },
                showItem:{content:''},
                showMenus:false,
                storeMenus:[]
            }
        },
        created(){
             document.title='震元母婴护理中心'
             let list = [{title:'客房展示',type:'room'}, {title:'月嫂展示',type:'nanny'},{title:'专家介绍',type:'expert'}, {title:'护士介绍',type:'nurse'}, {title:'套餐介绍',type:'package'}]
             this.tabItems = list
        },
        mounted(){
            this.show.isLoading=true
            this.$store.dispatch('clearContent');
            this.fetchStore()
        },
        watch:{
            selectStore: function(val){
                this.getItemContent();
            }
        },
        methods:{
            getItemContent:function(){
                this.show.post = false;
                this.show.isLoading = true;
                let item = this.$store.getters.getItemById(this.selectTabId);
                if(!item){
                    this.fetchData(this.selectTabId);
                }else{
                    this.showItem = item;
                    this.show.post = true;
                    this.show.isLoading = false;
                }
            },
            onItemClick:function(index){
                this.selectTabId = this.tabItems[index].type+'/'+this.selectStore.id;
                this.getItemContent();
            },
            showStorePop:function(){
                let _this = this;
                _this.showMenus = true
                _this.storeMenus=[];
                _this.stores.forEach(function(item){
                    _this.storeMenus.push({key:item.id,value:item.name});
                })
            },
            onSelectStore:function(value,label){
                let _this = this;
                _this.showMenus = false;
                _this.stores.forEach(function(item){
                    if(item.id==value){
                        _this.selectStore=item
                        _this.selectTabId= _this.$route.params.type+'/'+_this.selectStore.id
                    }
                })
            },
            fetchData: function(id) {
                let _this = this;
                _this.$router.replace("/show/"+id);
                this.$api.get('/show/'+id)
                .then(function(data){
                    _this.$store.dispatch('addContent',{id:id,content:data.object})
                    _this.show.post = true;
                    _this.show.isLoading = false;
                    _this.showItem = _this.$store.getters.getItemById(id);
                })
                .catch(this.$errorHandle);
            },
            fetchStore:function(){
                let _this=this
                _this.$api.get('/show/store')
                .then(function(data){
                    _this.stores = data.object
                    _this.selectStore = _this.stores[0]
                    _this.selectTabId = _this.$route.params.type+'/'+_this.selectStore.id;
                    _this.fetchData(_this.selectTabId);
                })
                .catch(_this.$errorHandle);
            }
        }
    }
</script>

<style lang="less">
    @import './style.less';
    .vux-tabbar-simple .weui-tabbar__label{
        line-height: 20px !important
    }
    .albert-tab-item{
        text-decoration: none;
    }
</style>


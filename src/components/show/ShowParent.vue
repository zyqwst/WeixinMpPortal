<template>
    <div>   
        <view-box >
            <loading-box v-show='show.isLoading'>

            </loading-box>
            <show-dtl :content='showItem.content' v-show="show.post"></show-dtl>
            <div v-show="show.isError">
                网络请求错误
            </div>
        </view-box>
        <tabbar style="position:fixed" body-padding-bottom="55px" slot="bottom">
            <tabbar-item :selected="selectTabId === item.id" v-for="item in tabItems" :key="item.id" @on-item-click="onItemClick">
                <span slot="label">{{item.title}}</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import { ViewBox,Tabbar,TabbarItem,Sticky} from 'vux'
    import showDtl from './ShowDtl'
    import loadingBox from '@/components/LoadingBox'
    import { mapState, mapGetters } from "vuex";

   
    export default{
        components:{
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
                selectTabId:0,
                show:{
                    post:false,
                    isLoading:false,
                    isError:false
                },
                showItem:{content:''}
            }
        },
        created(){
             let list = [{title:'客房展示',id:10}, {title:'月嫂展示',id:20},{title:'专家介绍',id:30}, {title:'护士介绍',id:40}, {title:'套餐介绍',id:50}]
             this.tabItems = list
        },
        mounted(){
            this.show.isLoading=true
            this.$store.dispatch('clearContent');
            this.selectTabId = parseInt(this.$route.params.id);
            this.fetchData(this.selectTabId);
        },
        computed:{
            // ...mapState(['showItem'])
        },
        methods:{
            onItemClick:function(index){
                this.selectTabId = this.tabItems[index].id;
                console.info('selectTabId',this.selectTabId)
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
                this.$router.replace("/show/"+this.selectTabId);
            },
            fetchData: function(id) {
                let _this = this;
                this.$api.post('/html')
                .then(function(data){
                    _this.$store.dispatch('addContent',{id:id,content:data.object})
                    _this.show.post = true;
                    _this.show.isLoading = false;
                    _this.showItem = _this.$store.getters.getItemById(id);
                })
                .catch(this.$errorHandle);
            }
        }
    }
</script>

<style>
    .vux-tabbar-simple .weui-tabbar__label{
        line-height: 20px !important
    }
</style>


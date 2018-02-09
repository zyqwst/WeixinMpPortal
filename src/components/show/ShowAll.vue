<template>
    <div>   
            <sticky scrollBox="vux_view_box_body" :check-sticky-support="false" :offset="46">
            <tab v-model="index">
                <tab-item class="vux-center" :selected="selectTitle === item.index" v-for="(item, index) in showList" @click="selectTitle = item.title" :key="index">{{item.title}}</tab-item>
            </tab>
            </sticky>
            <ViewBox>
            <swiper v-model="index" height="100vh" :show-dots="false" @on-index-change="getData">
                <swiper-item v-for="(item, index) in showList" :key="index">
                    <div class="tab-swiper vux-center" v-html="showData"></div>
                </swiper-item>
            </swiper>
            </ViewBox>
    </div>
</template>

<script>
    import { ViewBox,Tab,TabItem,Swiper, SwiperItem,Sticky} from 'vux'
    const list = () => [{title:'精选',content:''}, {title:'美食',content:''},
     {title:'电影',content:''}, {title:'酒店',content:''}, {title:'外卖',content:''}]
    export default{
        components:{
            ViewBox,
            Tab,
            TabItem,
            Swiper, SwiperItem
            ,Sticky
        },
        data(){
            return {
                showList:list(),
                selectTitle:'',
                index:0,
                showData:'...'
            }
        },
        methods:{
            onItemClick:function(index){
                console.log(index);
            },
            getData: function(index){
                console.log(index);
                let that = this;
                that.$api.post('/html')
                .then(function(data){
                    that.showData = data.data;
                })
                .catch(that.$errorHandle);
            }
        }
    }
</script>


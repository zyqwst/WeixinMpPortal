<template>
    <div>   
            <sticky scrollBox="vux_view_box_body" :check-sticky-support="false" :offset="46">
            <tab v-model="index">
                <tab-item class="vux-center" :selected="selectIndex === index" v-for="(item, index) in showList" @on-item-click="onItemClick"	@click="selectIndex=index" :key="index">{{item.title}}</tab-item>
            </tab>
            </sticky>
            <keep-alive>
                <router-view/>
            </keep-alive>
    </div>
</template>

<script>
    import { ViewBox,Tab,TabItem,Swiper, SwiperItem,Sticky} from 'vux'
    const list = () => [{title:'客房展示',content:''}, {title:'月嫂展示',content:''},
     {title:'专家介绍',content:''}, {title:'护士介绍',content:''}, {title:'套餐介绍',content:''}]
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
                selectIndex:null,
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


<template>
    <div>
        <x-header :left-options="{backText: '返回'}">成长记录</x-header>
        <div style="padding: 15px;">
            <button-tab>
                <button-tab-item selected @on-item-click="getHeight">身高</button-tab-item>
                <button-tab-item @on-item-click="getWeight">体重</button-tab-item>
            </button-tab>
        </div>
        <loading-box v-show='show.isLoading'>
        </loading-box>
        <div v-show='show.post'>
            <div v-for="item in showData" class="chart-div">
                <line-chart :options="item.options" :chart-data="item" :height="200"></line-chart>
            </div>
        </div>
    </div>
</template>
<script>
    import loadingBox from '@/components/LoadingBox'
    import LineChart from '@/components/LineChart'
    import {ButtonTab,ButtonTabItem,XHeader} from 'vux'
    export default{
        components:{
            loadingBox,
            LineChart,
            ButtonTab,
            ButtonTabItem,
            XHeader
        },
        data(){
            return{
                show:{
                    post:false,
                    isLoading:true
                },
                showData:null,
                weightData:null,
                heightData:null
                
            }
        },
        mounted(){
            this.getFetch();
        },
        methods:{
            getFetch(){
                let _this = this;
                this.$api.get('/wechat/member/baby/height')
                .then(function(data){
                    _this.show.post = true
                    _this.show.isLoading = false
                    _this.heightData = data.object
                    _this.showData = data.object
                })
                .catch(this.$errorHandle);
                this.$api.get('/wechat/member/baby/weight')
                .then(function(data){
                    _this.show.post = true
                    _this.show.isLoading = false
                    _this.weightData = data.object
                })
                .catch(this.$errorHandle);
            },
            getWeight(){
                this.showData=this.weightData
            },
            getHeight(){
                this.showData=this.heightData
            }
        }
    }
</script>
<style lang="less">
    .vux-button-group{
        a {
            text-decoration:none
        }
    }
    .chart-div{
        padding-bottom:1em
    }
</style>
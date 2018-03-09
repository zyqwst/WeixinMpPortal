<template>
    <div>
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
    import LineChart from './LineChart'
    import {ButtonTab,ButtonTabItem} from 'vux'
    export default{
        components:{
            loadingBox,
            LineChart,
            ButtonTab,
            ButtonTabItem
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
                this.$api.get('/member/baby/height/11')
                .then(function(data){
                    _this.show.post = true
                    _this.show.isLoading = false
                    _this.heightData = data.object
                    _this.showData = data.object
                })
                .catch(this.$errorHandle);
                this.$api.get('/member/baby/weight/11')
                .then(function(data){
                    _this.show.post = true
                    _this.show.isLoading = false
                    _this.weightData = data.object
                })
                .catch(this.$errorHandle);
            },
            getWeight(){
                console.log('体重');
                this.showData=this.weightData
            },
            getHeight(){
                console.log('身高')
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
<template>
    <div>
        <loading-box v-show='show.isLoading'>
        </loading-box>
        <div v-show='show.post'>
            <line-chart :data="chartList" ></line-chart>
        </div>
    </div>
</template>
<script>
    import loadingBox from '@/components/LoadingBox'

    export default{

        components:{
            loadingBox
        },
        data(){
            return{
                show:{
                    post:false,
                    isLoading:false
                },
                chartList:null
            }
        },
        mounted(){
            this.getFetch();
        },
        methods:{
            getFetch(){
                let _this = this;
                this.$api.post('/account/growthrecord')
                .then(function(data){
                    _this.show.post = true
                    _this.show.isLoading = false
                    _this.chartList = data.object
                    console.info("chartlist{}",_this.chartList)
                    this.renderChart(_this.chartList, {})
                })
                .catch(this.$errorHandle);
                
            }
        }
    }
</script>
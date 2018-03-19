<template>
    <div>
        <flow>
            <flow-line :is-done="isDone==1"></flow-line>
            <flow-state title="SPA服务" :is-done="isDone==2"></flow-state>
            <flow-line :is-done="isDone==3"></flow-line>
        
            <flow-state title="服务门店" :is-done="isDone==4"></flow-state>
            <flow-line :is-done="isDone==5"></flow-line>
            <flow-state title="预约时间" :is-done="isDone==6"></flow-state>
        </flow>
        <div></div>   
    </div>
</template>
<script>
    import { Flow, FlowState, FlowLine } from 'vux'
    export default{
        components: {
            Flow,
            FlowState,
            FlowLine
        },
        data(){
            return{
                stores:[],
                spas:[],
                isDone:1
            }
        },
        mounted(){
            this.getSpaAndStore()
        },
        methods:{
            getSpaAndStore(){
                let _this = this;
                this.$api.all([{url:'/wechat/show/spa'},{url:'/wechat/show/store'}])
                .then(this.$api.spread(function(spaData,storeData){
                    _this.spas = spaData.object
                    _this.stores = storeData.object
                }))
                .catch(this.$errorHandle);
            }
        }
    
    }
</script>
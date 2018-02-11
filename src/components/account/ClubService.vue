<template>
    <div>
        会所服务
        <pre v-html="clubData">loading...</pre>
    </div>
</template>
<script>
    export default{
        data (){
            return{
                loading: false,
                post : null,
                error : null,
                clubData:''
            }
        },
        mounted(){
            this.getFetch();
        },
        watch:{
            
        },
        methods:{
            getFetch:function(){
            let that = this;
            that.$api.post('/html')
            .then(function(data){
                that.clubData = data.data;
            })
            .catch(that.$errorHandle);
        }
        }
    }
</script>
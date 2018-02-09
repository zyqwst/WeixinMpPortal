<template>
    <div>
        会所服务
        <pre v-html="clubData"></pre>
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
        mounted: function(){
            let that = this;
            that.$api.post('/clubService')
            .then(function(data){
                that.clubData = data.data;
            })
            .catch(that.$errorHandle);
        },
        watch:{
            
        },
        methods:{
            
        }
    }
</script>
<template>
    <div>
        会所服务
        <p v-for="i in 100">{{i}}</p>
    </div>
</template>
<script>
    export default{
        data (){
            return{
                loading: false,
                post : null,
                error : null
            }
        },
        created: function(){
            let that = this;
            that.$api.get('/clubService')
            .then(function(data){
                alert(data);
            })
            .catch(that.$errorHandle);
        },
        watch:{
            
        },
        methods:{
            
        }
    }
</script>
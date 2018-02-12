<template>
    <div>
        <loading-box v-show='show.isLoading'>
        </loading-box>
        <pre v-html="clubData" v-show='show.post'>loading...</pre>
    </div>
</template>
<script>
    import loadingBox from '@/components/LoadingBox'
    export default{
        components:{
            loadingBox
        },
        data (){
            return{
                show:{
                    post:false,
                    isLoading:false
                },
                clubData:''
            }
        },
        mounted(){
            this.getFetch();
        },
        methods:{
        getFetch:function(){
            let _this = this;
            this.show.isLoading = true;
            this.$api.post('/html')
            .then(function(data){
                _this.clubData = data.object;
                _this.show.isLoading = false;
                _this.show.post = true;
            })
            .catch(this.$errorHandle);
        }
        }
    }
</script>
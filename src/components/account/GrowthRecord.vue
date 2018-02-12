<template>
    <div>
        <loading-box v-show='show.isLoading'>
        </loading-box>
        <div v-show='show.post'></div>
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
                }
            }
        },
        mounted(){
            this.getFetch();
        },
        methods:{
            getFetch(){
                let _this = this
                _this.show.isLoading = true;
                
            }
        }
    }
</script>
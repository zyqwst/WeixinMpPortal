<template>
    <div  class="loading">
        <spinner type="android"/>
        <div style="color:#999"><slot></slot></div>
    </div>
</template>
<script>
    import { Spinner } from 'vux'
    export default{
        components:{
            Spinner
        },
        data () {
            return{
                
            }
        }
    }
</script>
<style scoped>
    .loading{
        text-align:center;
        margin-top:2em;
    }
</style>
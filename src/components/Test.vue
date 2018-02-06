<template>
        <div>
            <x-button  type="primary"  @click.native="checkJsApi">检查jsapi可用</x-button>
        </div>
</template>
<script>
    import {XButton} from 'vux'
    export default{
        components: {
            XButton
        },
        data () {
            return{
                title :'测试微信JSSDK'
            }
        },
        methods:{
            checkJsApi: function(){
                wx.checkJsApi({
                    jsApiList: [
                    'getNetworkType',
                    'previewImage'
                    ],
                    success: function (res) {
                        console.log("albert支持："+JSON.stringify(res));
                    }
                });
            }
        }
    }
</script>
<style scoped>

</style>
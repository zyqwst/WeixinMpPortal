<template>
    <div>
        <x-header :left-options="{backText: '返回'}">会员卡</x-header>
        <loading-box v-show='show.isLoading'></loading-box>
        <div v-show='show.post'>
            <qrcode @click.native='refreshQr' :value="qrcode.qrcode" :size='240' style="text-align:center;margin-top:20%;"></qrcode>
            <p></p>
        </div>
    </div>
</template>
<script>
    import {XHeader,Qrcode} from 'vux'
    import loadingBox from '@/components/LoadingBox'
    export default{
        components:{
            XHeader,Qrcode,
            loadingBox
        },
        data(){
            return{
                show:{
                    post:false,
                    isLoading:true
                },
                qrcode:{qrcode:'123',timestamp:0}
            }
        },
        mounted(){
            this.getFetch()
        },
        methods:{
            getFetch(){
                let _this = this;
                this.$api.get('/wechat/member/qrcode')
                .then(function(data){
                     console.info(data.object);
                    _this.show.post = true
                    _this.show.isLoading = false
                    _this.qrcode = data.object
                })
                .catch(this.$errorHandle);
            },
            refreshQr(){
                this.show.post=false
                this.show.isLoading = true
                this.getFetch()
            }
        }

    }
</script>
<template>
    <div class='sy-page'>
        <x-header class="sy-topbar" :left-options="{showBack: false}" title='预约服务'>
            <i slot='left' class='fa fa-chevron-left' @click='back'></i>
            <i slot='right' class='fa' style='color:#EF5350'  @click='confirm'>确认</i>
        </x-header>
        <loading-box v-show="show.loading"></loading-box>
        <div v-show='show.post' v-for='item in spas' class='spa' @click='selected(item)' :class="{'sy-select' : selectSpa.includes(item)}">
            <div>    
                <img src='https://modao.cc/uploads3/images/1806/18063564/raw_1521604760.jpeg'/>
                <p class='name'>{{item}}</p>
            </div>
            <p class='sale'>已售89份</p>
        </div>
    </div>
</template>
<script>
    import { TransferDom,XHeader,XTextarea, Group,XButton,Popup,PopupHeader,Radio  } from 'vux'
    
    import loadingBox from '@/components/LoadingBox'
    import myPopup from '@/components/MyPopup'

    export default{
        components:{
            XHeader,
            XTextarea,
            Group,XButton,
            loadingBox,Popup,PopupHeader,Radio,
            myPopup
        },
        data(){
            return{
                show:{
                    loading:false,
                    post:false,
                },
                spas:[],
                selectSpa:[]
            }
        },
        mounted(){
            this.api()
        },
        methods:{
            back(){
                this.$router.back()
            },
            confirm(){
                this.$store.dispatch('selectSpa',this.selectSpa)
                this.$router.back()
            },
            selected:function(item){
                if(this.selectSpa.includes(item)){
                    this.selectSpa.splice(this.selectSpa.findIndex(v => v==item),1)
                }else{
                    this.selectSpa.push(item)
                }
            },
            api() {
                this.show.loading = true
                this.show.post = false
                let _this = this;
                if(this.spas.length>0){
                    this.show.post = true
                    this.show.loading = false
                    return
                }
                this.$api.post('/wechat/member/spa',{'storeId':this.$store.state.spa.selectStore.id})
                .then(function(data){
                    
                    _this.show.post = true
                    _this.show.loading = false
                    _this.spas = data.object
                })
                .catch(this.$errorHandle)
            },
        }
    }
</script>

<style lang='less'>
    @import '../../assets/app.less';
    .sy-select{
        background: #ffffff url(../../assets/select.svg) no-repeat right bottom;
        background-size:1.6rem;
    }
    .spa{
        .sy-box();
        padding:@padding1;
        margin:@padding0;
        font-size:1rem;
        display: flex;
        justify-content:space-between;
            div{
                display: flex;
            }
            img{
                width:4rem;
                height:4rem;
                border-radius:2rem;
            }
            p{
                margin-top:auto;
                margin-bottom:auto;
            }
            p.name{
                margin-left:@padding0;
                
            }
            p.sale{
                color:@white0;
                background:@basecolor;
                border-radius:3px;
                font-size:@padding3;
                padding:@padding3;
                height:@padding0;
                line-height:@padding0;
            }
        
    
    }
</style>
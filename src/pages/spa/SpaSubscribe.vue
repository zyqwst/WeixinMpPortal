<template>
    <div id='spa'class='sy-page'>
        <x-header class="sy-topbar" :left-options="{showBack: false}" title='服务预约'>
            <font-awesome-icon slot='left' v-show='success' icon="chevron-left"  @click='back' />
            <font-awesome-icon slot='right' icon='user' style="color:#8F8E94;font-size:1.4rem" @click='gohome'/>
        </x-header>
        <loading-box v-show="show.loading"></loading-box>
        <div class="card1 shadow0" v-show='!success && show.post'>
            <div class='title'>
                <p>服务预约</p>
            </div>
            <div class="content">
                <div class='item' @click='onSelectStore'>
                    <p class='left'>选择门店</p>
                    <p class='right'>{{getSelectStore.name|| '选择门店'}}<i class='fa fa-angle-right'/></p>
                </div>
                <div class='item' @click='onSelectService'>
                    <p class='left'>SPA服务</p>
                    <p class='right'>{{getSelectSpas||'选择服务'}}<i class='fa fa-angle-right'/></p>
                </div>
                <div class='item' @click='onSelectTime'>
                    <p class='left'>预约时间</p>
                    <p class='right'>{{getSelectDate || '选择时间'}} {{getSelectTime.key}}<i class='fa fa-angle-right'/></p>
                </div>
                <div class="remark">
                    <x-textarea :max="80" v-model='remark' placeholder='备注...' style='border:2px dashed #bbb'></x-textarea>
                </div>
                <div class='btn'>
                    <x-button type='primary' class='btn-bg shadow1' @click.native='commit'>预约</x-button>
                </div>
            </div>
        </div>
        <div v-show='success'>
            <div class="card1 shadow0">
                <div class='title'>
                    <p>预约成功</p>
                </div>
                <div class="content">
                    <div class='item'>
                        <p class='left'>所选门店</p>
                        <p class='right'>{{successData.store}}</p>
                    </div>
                    <div class='item'>
                        <p class='left'>SPA服务</p>
                        <p class='right'>{{successData.spa}}</p>
                    </div>
                    <div class='item'>
                        <p class='left'>预约时间</p>
                        <p class='right'>{{successData.beginTime}} </p>
                    </div>
                    <div class="remark">
                        <p>备注：{{successData.remark}}</p>
                    </div>
                </div>
            </div>
                <div class='noitem'>
                    预约成功后请提前10分钟到店，疑问请咨询0572-0909890，感谢您！
                </div>
            </div>
    </div>
</template>
<script>
    import { TransferDom,XHeader,XTextarea, Group,XButton,Popup,PopupHeader,Radio  } from 'vux'
    import loadingBox from '@/components/LoadingBox'
    export default{
        directives: {
            TransferDom
        },
        components:{
            XHeader,
            XTextarea,
            Group,XButton,
            Popup,PopupHeader,Radio,
            loadingBox
        },
        data(){
            return{
                show:{
                    loading:false,
                    post:true
                },
                selectStore:{},
                selectSpas:[],
                selectDate:null,
                selectTime:null,
                remark:'',
                success:false,
                successData:{}
            }
        },
        computed:{
            getSelectStore(){
                return this.$store.state.spa.selectStore
            },
            getSelectSpas(){
                return this.$store.state.spa.selectSpas.join('+')
            },
            getSelectDate(){
                return this.$store.state.spa.selectDate
            },
            getSelectTime(){
                return this.$store.state.spa.selectTime
            }
        },
        methods:{
            back(){
                this.success = false
            },
            gohome(){
                this.$router.replace({name:'MyAccount'})
            },
            onSelectStore(){
                this.$router.push({name:'ChooseStore'})
            },
            onSelectService(){
                this.$router.push({name:'ChooseService'})
            },
            onSelectTime(){
                this.$router.push({name:'ChooseTime'})
            },
        
            commit(){
                if(JSON.stringify(this.getSelectStore)=='{}'){
                    this.$store.dispatch('toast',{show:true,text:'请选择门店'})
                    return
                }
                if(!this.getSelectSpas){
                    this.$store.dispatch('toast',{show:true,text:'请选择服务'})
                    return
                }
                if(!this.getSelectDate){
                    this.$store.dispatch('toast',{show:true,text:'请选择预约时间'})
                    return
                }
                
                let _this = this
                this.show.post = false
                this.show.loading = true
                this.$api.post('/wechat/member/spa/subscribe',{
                    'storeId':this.getSelectStore.id,
                    'spaArray[]':this.getSelectSpas,
                    'selectDate':this.getSelectDate,
                    'selectTime':this.getSelectTime.key,
                    'encryptInfo':this.getSelectTime.value,
                    'remark':this.remark
                }).then(function(data){
                    _this.show.post = true
                    _this.show.loading = false
                    if(data.errorCode){
                        _this.$store.dispatch('toast',{show:true,text:'data.msg'})
                    }else{
                        _this.success = true
                        _this.successData = data.object
                        _this.$store.dispatch('clear')
                    }
                })
                .catch(this.$errorHandle)
            }
        }
    }
</script>

<style lang='less' >
    @import '~vux/src/styles/1px.less';
    @import '../../assets/app.less';
    #spa{
        .card1{
            display: flex;
            flex-direction: column;
            margin: 1rem;
            overflow: hidden;
            text-align:center;
            color:@white0;
            .title{
                background:@basecolor;
                padding:@padding0;
                font-size:@titlesize;
            }
            .content{
                color:@black0;
                padding:@padding0;
                div.item{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    font-size:@itemsize;
                    padding:@padding0;
                    p{margin:0}
                    p.left{
                        
                    }
                    p.right{
                        color: @black1;
                    }
                    i{margin-left:1rem}
                
                }
                div.remark{
                    padding:@padding0;
                    text-align:left;
                    font-size:@itemsize;
                    color:@black0
                }
                div.btn{
                    padding:@padding0;
                    button{font-size:@itemsize;}
                }
            }
        }
        
    }
    
</style>
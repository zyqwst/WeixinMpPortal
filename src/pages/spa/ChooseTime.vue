<template>
    <div class='sy-page'>
        <x-header class="sy-topbar" :left-options="{showBack: false}" title='预约时间'>
            <i slot='left' class='fa fa-chevron-left' @click='back'></i>
            <i slot='right' class='fa' style='color:#EF5350'  @click='confirm'>确认</i>
        </x-header>
        <div class="time">
            <div class="title">
                <i class='fa fa-chevron-left' @click='lastDay'></i>
                <span>{{selectDate}}</span>
                <i class='fa fa-chevron-right' @click='nextDay'></i>
            </div>
            
            <div class="content">
                <div @click='selected(i)' class="item" :class="{select:selectTime==i}" v-for='i in times' :key='i.key'>
                    {{i.key}}
                </div>
                <div class='noitem' v-show='times.length==0'>当天无可预约时间段</div>
            </div>
        </div>
    </div>
</template>
<script>
    import { TransferDom,XHeader,XTextarea, Group,XButton,Popup,PopupHeader,Radio,dateFormat  } from 'vux'
    
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
                
                times:[],
                selectDate:dateFormat(new Date(), 'YYYY-MM-DD'),
                selectTime:null
            }
        },
        mounted(){
            if(JSON.stringify(this.$store.state.spa.selectStore)=="{}"){
                this.$store.dispatch('toast',{show:true,text:'请先选择门店'})
                this.$router.replace({name:'SpaSubscribe'});
                return;
            }
            if(this.$store.state.spa.selectSpas.length==0){
                this.$store.dispatch('toast',{show:true,text:'请先选择服务'})
                this.$router.replace({name:'SpaSubscribe'});
                return;
            }
            this.api();
        },
        methods:{
            lastDay(){
                this.selectDate = dateFormat(new Date(new Date(this.selectDate).getTime()-24*60*60*1000),'YYYY-MM-DD')
                this.$store.dispatch('selectedTime',{'selectDate':this.selectDate,'selectTime':{}})
                this.api()
            },
            nextDay(){
                this.selectDate = dateFormat(new Date(new Date(this.selectDate).getTime()+24*60*60*1000),'YYYY-MM-DD')
                this.$store.dispatch('selectedTime',{'selectDate':this.selectDate,'selectTime':{}})
                this.api()
            },
            back(){
                this.$router.back()
            },
            confirm(){
                if(!this.selectDate || !this.selectTime){
                    this.$store.dispatch('toast',{show:true,text:'请选择预约时间'})
                    return
                }
                let _this = this
                this.$store.dispatch('loading',true);
                this.$api.post('/wechat/member/spa/validate/time',
                {'storeId':this.$store.state.spa.selectStore.id,
                 'spaArray[]':this.$store.state.spa.selectSpas,
                 'selectDate':this.selectDate,
                 'selectTime':this.selectTime.key,
                 'encryptInfo':this.selectTime.value
                })
                .then(function(data){
                    _this.$store.dispatch('loading',false);
                    if(data.errorCode){
                        _this.$store.dispatch('toast',{show:true,text:data.msg})
                    }else{
                        _this.$store.dispatch('selectedTime',{'selectDate':_this.selectDate,'selectTime':_this.selectTime})
                        _this.$router.back()
                    }
                })
                .catch(this.$errorHandle)
            },
            selected:function(item){
                this.selectTime = item;
            },
            api() {
                
                let _this = this
                this.times.length=0
                this.$store.dispatch('loading',true);
                this.$api.post('/wechat/member/spa/schedule',
                {'storeId':this.$store.state.spa.selectStore.id,
                 'spaArray[]':this.$store.state.spa.selectSpas,
                 'selectDate':this.selectDate})
                .then(function(data){
                    _this.$store.dispatch('loading',false);
                   
                    if(data.errorCode){
                        _this.$store.dispatch('toast',{show:true,text:data.msg})
                    }else{
                        Object.keys(data.object).forEach(key=>{
                            _this.times.push({'key':key,'value':data.object[key]})
                        })
                    }
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
    .time{
        .sy-box();
        display: flex;
        flex-direction: column;
        margin: 1.4rem;
        overflow: hidden;
        text-align:center;
        color:@white0;
        .title{
            background:@basecolor;
            padding:@padding0;
            display: flex;
            justify-content: space-between;
            .fa{
                margin-top:3px
            }
        }
        .content{
            color:@black0;
            padding:@padding0;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-arround;
            .item{
                border:1px solid @basecolor;
                border-radius:1rem;
                padding:@padding4 @padding0;
                margin:@padding2;
            }
            .select{
                background: @basecolor;
                color:@white0;
            }
        }
        
    }
</style>
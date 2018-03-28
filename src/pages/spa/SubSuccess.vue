<template>
        <div id='spa'class='sy-page'>
            <x-header class="sy-topbar" :left-options="{showBack: false}" title='服务预约'>
                <font-awesome-icon slot='left' icon='chevron-left' @click='back'/>
            </x-header>
            <div>
            <div class="card1 shadow0">
                <div class='title'>
                    <p>预约成功</p>
                </div>
                <div class="content">
                    <div class='item'>
                        <p class='left'>所选门店</p>
                        <p class='right'>{{getSelectStore.name|| '选择门店'}}</p>
                    </div>
                    <div class='item'>
                        <p class='left'>SPA服务</p>
                        <p class='right'>{{getSelectSpas||'选择服务'}}</p>
                    </div>
                    <div class='item'>
                        <p class='left'>预约时间</p>
                        <p class='right'>{{getSelectDate || '选择时间'}} {{getSelectTime.key}}</p>
                    </div>
                    <div class="remark">
                        <p>备注</p>
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
        
        export default{
            directives: {
                TransferDom
            },
            components:{
                XHeader,
                XTextarea,
                Group,XButton,
                Popup,PopupHeader,Radio,
                
            },
            data(){
                return{
                    selectStore:{},
                    selectSpas:[],
                    selectDate:null,
                    selectTime:null,
                    remark:''
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
                },
                getRemark(){
                    return this.$store.state.spa.remark
                }
            },
            methods:{
                back(){
                    this.$router.back()
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
                gohome(){
                    alert('回到个人中心')
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
                }
                .content{
                    color:@black0;
                    padding:@padding0;
                    div.item{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        font-size:0.9rem;
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
                    }
                    div.btn{
                        padding:@padding0;
                        button{font-size:0.9rem;}
                    }
                }
            }
            
        }
        
    </style>
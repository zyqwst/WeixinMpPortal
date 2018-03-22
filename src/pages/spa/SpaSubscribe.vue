<template>
    <div id='spa'class='sy-page'>
        <x-header class="sy-topbar" :left-options="{showBack: false}" title='服务预约'>
            <i slot='left' class='fa fa-user-o' @click='gohome'></i>
        </x-header>
        <div class="card1 shadow0">
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
                <div class='item'>
                    <p class='left'>预约时间</p>
                    <p class='right'>{{selectDate || '选择时间'}}{{selectTime}}<i class='fa fa-angle-right'/></p>
                </div>
                <div class="remark">
                    <x-textarea :max="80" placeholder='备注...' style='border:2px dashed #bbb'></x-textarea>
                </div>
                <div class='btn'>
                    <x-button type='primary' class='btn-bg shadow1'>预约</x-button>
                </div>
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
                show:{
                    post:false,
                    isLoading:false,
                },
                selectStore:{},
                selectSpas:[],
                selectDate:null,
                selectTime:null,
                spas:[],
            }
        },
        computed:{
            getSelectStore(){
                return this.$store.state.spa.selectStore
            },
            getSelectSpas(){
                return this.$store.state.spa.selectSpas.join('+')
            }
        },
        methods:{
            onSelectStore(){
                this.$router.push({name:'ChooseStore'})
            },
            onSelectService(){
                this.$router.push({name:'ChooseService'})
            },
            gohome(){
                alert('回到个人中心')
            }
        }
    }
</script>

<style lang='less'>
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
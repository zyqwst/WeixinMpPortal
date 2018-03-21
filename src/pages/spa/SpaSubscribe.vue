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
                <div class='item'>
                    <p class='left'>选择门店</p>
                    <p class='right'>太空一号母婴护理中心<i class='fa fa-angle-right'/></p>
                </div>
                <div class='item'>
                    <p class='left'>SPA服务</p>
                    <p class='right'>游泳+沐浴<i class='fa fa-angle-right'/></p>
                </div>
                <div class='item'>
                    <p class='left'>预约时间</p>
                    <p class='right'>3月21日 13:30<i class='fa fa-angle-right'/></p>
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
    import { XHeader,XTextarea, Group,XButton  } from 'vux'
    export default{
        components:{
            XHeader,
            XTextarea,
            Group,XButton
        },
        methods:{
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
            margin: 1em;
            overflow: hidden;
            text-align:center;
            color:@white0;
            font-size:16px;
            .title{
                background:@basecolor;
                padding:0.8em;
            }
            .content{
                color:@black0;
                padding:0.6em;
                div.item{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    font-size:0.9em;
                    padding:0.8em;
                    p{margin:0}
                    p.left{
                        
                    }
                    p.right{
                        color: @black1;
                    }
                    i{margin-left:1em}
                
                }
                div.remark{
                    padding:0.8em;
                }
                div.btn{
                    padding:0.8em;
                }
            }
        }
    }
</style>
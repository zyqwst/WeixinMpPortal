<template>
    <div class='sy-page' v-transfer-dom>
        
        <popup v-model="show" :position="direction" height="100%" width="100%" style='background:#fff'>
            <x-header v-show='header' class="sy-topbar" :left-options="{showBack: false}" :title='title'>
                <i slot='left' v-show='headerLeft' :class='leftClass' @click='leftClick'></i>
                <i slot='right' v-show='headerRight' :class='rightClass' @click='rightClick'></i>
            </x-header>
            <slot>
                
            </slot> 
        </popup>
    </div>
</template>
<script>
    import { TransferDom,Popup,PopupHeader,Radio ,XHeader } from 'vux'
    export default{
        directives: {
            TransferDom
        },
        components:{
            TransferDom,Popup,PopupHeader,Radio,XHeader
        },
        data(){
            return{
               
            }
        },
        props:[
        'show',//控制显示
        'direction',//打开方向

        'header',//显示工具栏
        'title',
        'headerLeft',
        'headerRight',
        'leftClass',
        'rightClass',
    ],
        methods:{
            leftClick(){
                this.$emit('leftClick')
            },
            rightClick(){
                this.$emit('rightClick')
            }
        }
    }
</script>
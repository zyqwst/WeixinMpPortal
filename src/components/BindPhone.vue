<template>
        <div>
        <div class="vux-demo" style="text-align:center">
        <img class="logo" src="../assets/logo.png">
        </div>
          <group class="weui-cells_form">
            <x-input name="mobile" type="number" placeholder="输入手机号码" :show-clear="false" keyboard="number" is-type="china-mobile" v-model="phoneNumber">
                <i class="fa fa-phone fa-lg pr-1" slot="label"></i>
            </x-input>
          </group>
          <group>
            <x-input placeholder="输入短信验证码" :max="5" :show-clear="false" :min="5" class="weui-vcode" v-model="vcode.val">
                <x-button slot="right" plain type="primary" mini :disabled="vcode.disabled" :text="vcode.text" v-show="vcode.show" @click.native="getVcode">
                </x-button>
                <countdown slot="right" v-model="vcode.time" :start="vcode.start"  @on-finish="finish" v-show="!vcode.show"></countdown>
                <span slot="right" v-show="!vcode.show">秒</span>
            </x-input>
            </group>
            <div style="padding:15px;">
                <x-button  type="primary" :text="confirmBtn.text" :disabled="confirmBtn.disabled"
                :show-loading="confirmBtn.loading" @click.native="confirm"></x-button>
              </div>
            <toast v-model="toast.show" :type="toast.type" :text="toast.text"></toast>
        </div>
      </template>
      
      <script>
      import { Group, XButton,XInput,Countdown,Toast } from 'vux'
      import {Cookies} from '../utils/cookie-util'
      export default {
        components: {
          Group,
          XButton,
          XInput,
          Countdown,
          Toast
        },
        mounted(){
        },
        data (){
          return {
            toast :{show:false,text:"提示",type:"text"},
            phoneNumber : "",
            vcode : {val:"",text:"获取验证码",time:59,disabled:false,show:true,start:false},
            confirmBtn : {text:'绑定',disabled:false,loading:false},
          }
        },
        methods:{
          getVcode: function(){
            if(this.phoneNumber.length<11){
                this.toast.show = true;
                this.toast.text = "手机号码不正确";
                this.toast.type = "warn";
                return;
            }
            this.vcode.show = false
            this.vcode.start = true
            this.vcode.time = 59
            let _this = this;
            this.$api.post('/push/sms/vcode',{'phone':this.phoneNumber})
            .then(function(data){
                sessionStorage.setItem(Cookies.bindVcode,data.object)
            })
            .catch(this.$errorHandle);
          },
          finish: function(){
            this.vcode.show = true;
            this.vcode.start = false;
          },
          confirm : function(){
            if(this.vcode.val.length<4){
                this.toast = {show:true,text:'输入动态验证码',type:'warn'};
                return;
            }
            this.confirmBtn.text='提交中...';
            this.confirmBtn.disabled=true;
            this.confirmBtn.loading=true;
            let _this = this
            this.$api.post('/wechat/binding',
            {
              "token":sessionStorage.getItem(Cookies.Authorization),
              "encryptInfo":sessionStorage.getItem(Cookies.bindVcode),
              "vcode":_this.vcode
            })
            .then(function(data){
               console.info('绑定成功：',data)
               alert(data.object)
               sessionStorage.setItem(Cookies.Authorization,data.object)
               _this.$store.dispatch('setCurrentUser',data.object)
               _this.$router.replace(sessionStorage.getItem(Cookies.pathBeforeAuthor))
            })
            .catch(this.$errorHandle)
          }
        }
      }
      </script>

      <style scoped>
        .pr-1{
            padding-right: 0.2em !important;
        }
      </style>
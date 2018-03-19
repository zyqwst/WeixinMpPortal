<template>
    <div>
        <div v-show='show.post' class="vux-demo" style="text-align:center">
            <img class="logo" src="../assets/logo.png">
            <p>震元母婴护理中心欢迎您</p>
        </div>
        <loading-box v-show='show.isLoading'></loading-box>
    </div>
</template>
<script>
    import {Cookies} from '../utils/cookie-util'
    import loadingBox from '@/components/LoadingBox'
    import { base64 } from 'vux'
    export default{
        data(){
            return{
                codeUrl:null,
                show:{
                    post:false,
                    isLoading:true
                },
            }
        },
        mounted(){
            this.isLogin()
        },
        methods:{
            
            isLogin: function(){
                let _this = this
                let token = sessionStorage.getItem(Cookies.Authorization)

                if(!token) {
                    _this.show.post = true
                    _this.show.isLoading = false
                    _this.getCodeUrlAndRedirect()
                }else{
                    _this.show.post = false
                    _this.show.isLoading = true
                    this.$api.post('/wechat/web/realtoken',{'token':token})
                    .then(function(data){
                        if(data.errorCode && data.errorCode=='-1'){
                            _this.getCodeUrlAndRedirect()
                        }else if (data.status==1 && !localStorage.getItem(Cookies.currentUser)){
                            sessionStorage.setItem(Cookies.Authorization,data.object);
                            sessionStorage.setItem(Cookies.currentUser,JSON.stringify(JSON.parse(base64.decode(data.object.split('.')[1])).sub));
                            _this.$router.push(sessionStorage.getItem(Cookies.pathBeforeAuthor))
                        }else{
                            _this.$router.push(sessionStorage.getItem(Cookies.pathBeforeAuthor))
                        }
                    })
                    .catch(this.$errorHandle)
                }
            },
            getCodeUrlAndRedirect: function(){
                let _this = this;
                this.$api.get('/wechat/web/codeurl')
                .then(function(data){
                    _this.codeUrl = data.object.codeurl
                    sessionStorage.setItem(Cookies.Authorization,data.object.token);
                    window.location.href = _this.codeUrl
                })
                .catch(this.$errorHandle);
            }
        }

    }
</script>
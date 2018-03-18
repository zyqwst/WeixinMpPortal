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
                        if(data.status==-1){
                            _this.getCodeUrlAndRedirect()
                        }else if (data.status==1 && !_this.$store.getters.getCurrentUser()){
                            sessionStorage.setItem(Cookies.Authorization,data.object);
                            _this.$store.dispatch('setCurrentUser',data.object)
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
            },
            
            // getOpenId:function(){
            //     let _this = this;
            //     this.$api.get('/wechat/web/author',{code:_this.code})
            //     .then(function(data){
            //         sessionStorage.setItem(Cookies.Authorization,data.object)
            //         if(data.status==1){
            //             console.info('该微信号已经注册');
            //             _this.$router.push(sessionStorage.getItem(Cookies.pathBeforeAuthor))
            //         }else{
            //             console.info('该微信号未注册');
            //             _this.$router.push('/BindPhone')
            //         }
            //     })
            //     .catch(this.$errorHandle);
            // }
        }

    }
</script>
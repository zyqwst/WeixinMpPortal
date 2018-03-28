<template>
    <div>
        <loading-box v-show="show.isLoading"></loading-box>
        <div v-show="show.post">
            <group>
                <cell :title='username' :inline-desc='userid'>
                    <img slot='icon' style="width:4em;height:4em;margin-right:1em" :src='url'/>
                    <img :src='cardImg' style='width:1.5em'  @click="showQrcode"/>
                </cell>
            </group>
            <group>
                <cell :title="wallet.card.label" :value='wallet.card.amount' link="/member/recharge">
                    <img slot='icon' style="height: 1.3em;vertical-align:middle;margin-right:0.8em" :src='cardImg'/>
                </cell>
                <cell :title="wallet.coupons.label" :value='wallet.coupons.amount' link="/member/coupons">
                    <img slot='icon' style="height: 1.3em;vertical-align:middle;margin-right:0.8em" :src='couponsImg'/>
                </cell>
                <cell :title="wallet.score.label" :value='wallet.score.amount'  link="/member/score">
                    <img slot='icon' style="height: 1.3em;vertical-align:middle;margin-right:0.8em" :src='scoreImg'/>
                </cell>
            </group>
    
            <group>
                <cell title="成长记录" v-show='wallet.growthrecord.show' link="/member/growthrecord">
                    <img slot='icon' style="height: 1.3em;vertical-align:middle;margin-right:0.8em" :src='scoreImg'/>
                </cell>
                <cell title="陪客餐" v-show='wallet.meal.show' link="ddd">
                    <img slot='icon' style="height: 1.3em;vertical-align:middle;margin-right:0.8em" :src='scoreImg'/>
                </cell>
                <cell title="调查问卷" v-show='wallet.question.show'  link="ddd">
                    <img slot='icon' style="height: 1.3em;vertical-align:middle;margin-right:0.8em" :src='scoreImg'/>
                </cell>
                <cell title="出所评价" v-show='wallet.evaluate.show'  link="ddd">
                    <img slot='icon' style="height: 1.3em;vertical-align:middle;margin-right:0.8em" :src='scoreImg'/>
                </cell>
            </group>
            <group>
                <cell title="在线反馈"  link="ddd">
                        <img slot='icon' style="height: 1.3em;vertical-align:middle;margin-right:0.8em" :src='scoreImg'/>
                    </cell>
            </group>
        </div>
    </div>
</template>
<script>
    import {  Group, Cell, CellBox ,Blur,Card } from 'vux'
    import loadingBox from '@/components/LoadingBox'
    import {Cookies} from '@/utils/cookie-util'
    export default {
      components: {
        Blur,loadingBox,
        Card,Group, Cell, CellBox 
      },
      data(){
        return {
            show:{
                post:false,
                isLoading:true
            },
            url: '',
            wallet_header:'我的钱包',
            cardImg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=',
            couponsImg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=',
            scoreImg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=',
            wallet:{
                card:{label:'卡余额',amount:68},
                coupons:{label:'卡券',amount:4},
                score:{label:'积分',amount:980},
                growthrecord:{show:false},//成长记录
                meal:{show:false}, //陪客餐
                question:{show:false}, //调查问卷
                evaluate:{show:false} //出所评价
            },
            username:'',
            userid:''
        }
      },
      mounted(){
        if(sessionStorage.getItem(Cookies.currentUser)){
            let curUser = JSON.parse(sessionStorage.getItem(Cookies.currentUser))
            console.info('currentUser',curUser);
            this.username = curUser.nickName
            this.userid = curUser.id
            this.url = curUser.headImageUrl
            this.getFetch()
        }
      },
      methods:{
        getFetch(){
            let _this = this;
            this.$api.get('/wechat/member/wallet')
            .then(function(data){
                _this.wallet = data.object
                _this.show.post = true;
                _this.show.isLoading = false;
            })
            .catch(this.$errorHandle);
          },
        showQrcode(){
            this.$router.push({name:'Barcode'});
        }
      }
    }
</script>
<style lang="less">
@import '~vux/src/styles/1px.less';

.center {
  text-align: center;
  padding-top: 20px;
  color: #fff;
  font-size: 18px;
}
.center img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ececec;
}
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
a{
    text-decoration: none ;
}
.weui-cells{
    font-size:14px !important;
    .weui-cell__bd,.vux-cell-bd   {
        p{
        margin: 0;
        padding: 0;
        }
    }
    .weui-cell__hd{

    }
}
</style>
<template>
    <div>
        <blur :blur-amount=40 :url="url">
            <p class="center"><img :src="url"></p>
        </blur>
        <card :header='{title:header}'>
            <div slot="content" class="card-demo-flex card-demo-content01">
                <div class="vux-1px-r">
                <span>1130</span>
                <br/>
                    储值卡
                </div>
                <div class="vux-1px-r">
                <span>15</span>
                <br/>
                    微信账户
                </div>
                <div class="vux-1px-r">
                <span>0</span>
                <br/>
                    可用积分
                </div>
                <div>
                <span>88</span>
                <br/>
                    其他
                </div>
            </div>    
        </card>
    </div>
</template>
<script>
    import {  Blur,Card } from 'vux'
    export default {
      components: {
        Blur,
        Card
      },
      data(){
        return {
            url: 'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
            header:'我的钱包'
        }
      }
    }
</script>
<style scoped lang="less">
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
</style>
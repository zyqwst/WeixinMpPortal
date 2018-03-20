<template>
    <div>
        <div class='padding0'>
            <div style='padding:0.8em'>
                <step v-model="step" background-color='#fbf9fe'>
                    <step-item title="SPA服务" @click.native='stepClick(0)'></step-item>
                    <step-item title="预约门店" @click.native='stepClick(1)'></step-item>
                    <step-item title="预约时间" @click.native='stepClick(2)'></step-item>
                    <step-item title="完成"></step-item>
                </step>
            </div>
            <div>
                <loading-box v-show="show.isLoading"></loading-box>
                <cell-box v-for='item in spas' :key="item.name" style='margin-top:0.8em' v-show='step==0 && show.post'>
                    <blur :class='{selected:selectSpa==item}' :blur-amount=40 :height='100' :url='item.url' @click.native='chooseSpa(item)'>
                        <div class="spa">
                            <div>
                                <img :src="item.url">
                            </div>
                            <div class='title'> {{item.name}}</div>
                            <div class='sales'>
                                <span>已售98份</span>
                            </div>
                        </div>
                    </blur>
                </cell-box>
                <div v-show='step==1 && show.post' class='store' :class='{selected:selectStore==item}' v-for='item in stores' :key='item.name' @click='chooseStore(item)'>
                    <p class='title'>{{item.name}}</p>
                    <p class='address'>地址：
                        <span>{{item.address}}</span>
                    </p>
                    <p class='phone'>电话：
                        <span>{{item.tel}}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class='cal'>
            <vue-event-calendar v-show='step==2 && show.post' :events="calMenus" @day-changed="chooseCal">
                <template scope="props">
                
                </template>
            </vue-event-calendar>
        </div>
        <div v-transfer-dom>
            <popup v-model="showMenus" position="bottom" max-height="60%" width="100%">
                <popup-header
                right-text="取消"
                title="预约时间"
                :show-bottom-border="false"
                @on-click-right="showMenus = false"
                >
                </popup-header>
                    <group gutter="0">
                        <radio :options="timeMenus" @on-change="onSelectTimeMenu" value="selectTime">
                            <template slot-scope="props" slot="each-item">
                                <span v-text="props.label"></span>
                            </template>
                        </radio>
                    </group>
            </popup>
        </div>
    </div>
</template>
<script>
    import { TransferDom,Popup,PopupHeader,Group,Radio,CellBox, Step, StepItem, Blur } from 'vux'
    import loadingBox from '@/components/LoadingBox'
    export default {
        directives: {
            TransferDom
        },
        components: {
            Step,
            StepItem,
            CellBox,
            Blur,
            loadingBox,Group,Radio,
            TransferDom,Popup,PopupHeader
        },
        data() {
            return {
                showMenus:false,
                show:{
                    post:false,
                    isLoading:false
                },
                stores: [],
                spas: [],
                step: 0,
                selectSpa: null,
                selectStore: null,
                selectCal:null,
                selectTime:null,
                calMenus: [],
                timeMenus:[]
            }
        },
        mounted() {
            this.getSpaAndStore()
        },
        methods: {
            getSpaAndStore() {
                this.show.isLoading = true
                this.show.post = false
                let _this = this;
                this.$api.all([{ url: '/wechat/member/spa' }, { url: '/wechat/show/store' }])
                    .then(this.$api.spread(function (spaData, storeData) {
                        spaData.object.forEach(item => {
                            _this.spas.push({
                                id: item.id,
                                name: item.name,
                                url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg'
                            })
                        })
                        storeData.object.forEach(item => {
                            _this.stores.push({
                                id: item.id,
                                name: item.name,
                                address: '绍兴市XX区XX街道XX号',
                                tel: '0572-5635676'
                            })
                        })
                        _this.show.isLoading = false
                        _this.show.post = true
                    }))
                    .catch(this.$errorHandle);
            },
            chooseSpa(item) {
                this.selectSpa = item
                this.step = 1
            },
            chooseStore(item) {
                this.selectStore = item
                this.step = 2
                this.show.isLoading = true
                this.show.post = false
                let _this = this
                this.$api.post('/wechat/member/spa/arrangement',{'storeId':this.selectStore.id})
                .then(function(data){
                    _this.show.isLoading = false
                    _this.show.post = true
                    data.object.forEach(item=>{
                        _this.calMenus.push({
                            date:item,
                            title:'123'
                        })
                    })
                })
                .catch(this.$errorHandle)
            },
            stepClick(curStep) {
                if (curStep < this.step) {
                    this.step = curStep
                    return
                }
                if (curStep == 1 && this.selectSpa != null) {
                    this.step = curStep
                    return
                }
                if (curStep == 2 && this.selectStore != null) {
                    this.step = curStep
                    return
                }
            },
            chooseCal(day) {
                let _this = this
               
                this.show.isLoading = true
                this.show.post = false
                this.$api.post('/wechat/member/spa/schedule',{'storeId':this.selectStore.id,'spaId':this.selectSpa.id,'selectDate':day.date.replace(/\//g,'-')})
                .then(function(data){
                    console.info(data)
                    _this.show.isLoading = false
                    _this.show.post = true
                    _this.timeMenus.length=0
                    for(let key in data.object){
                        _this.timeMenus.push(key)
                    }
                    _this.showMenus = true

                })
                .catch(this.$errorHandle)
            },
            onSelectTimeMenu(value,label){
                this.selectTime=value
                this.showMenus = false
                this.step = 3
            }
        }

    }
</script>

<style lang="less">
    @import '~vux/src/styles/1px.less';
    .padding0 {
        margin: 0;
        padding:0 a {
            text-decoration: none
        }
        .weui-cell {
            padding: 0 !important
        }
        .selected{
            position:relative;
        }
        .selected:before{
            position:absolute;
            content:'';
            width:98%;
            border:1px solid #c30;
        }
        .selected:after{
            position:absolute;
            right:0;
            top:0;
            content:'';
            border-bottom: 30px solid transparent;
            border-right: 30px solid #c30;
        }
        .spa {
            text-align: left;
            color: #fff;
            width: 100vw;
            display: flex;
            div:child[0] {
                height: 100px;
                flex: 1;
            }
            div {
                img {
                    height: 70px;
                    width: 70px;
                    border-radius: 50%;
                    border: 1px solid #868686;
                    margin: 14px;
                }
            }
            .title {
                font-size: 18px;
                height: 100px;
                flex: 1;
                line-height: 100px;
            }
            .sales {
                text-align: right;
                margin-right: 10px;
                font-size: 14px;
                height: 100px;
                line-height: 100px;
                vertical-align: middle;
                flex: 1;
                span {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 0.4em;
                    padding: 2px 4px;
                }
            }
        }
        .store {
            margin: 0.8em;
            border-left: 3px solid #10a335;
            background: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
            p {
                padding: 0.2em 0.4em;
                font-size: 0.8em;
                color: #8a8a8a;
            }
            .title {
                font-size: 1em;
                color: #6a6a6a;
            }
            .address {}
            .phone {}
        }
    }
    .events-wrapper{
        display:none
    }
</style>
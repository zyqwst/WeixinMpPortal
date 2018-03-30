<template>
    <div id="eshop-cart" class='sy-page'>
        <div class='background'></div>
        <x-header class="sy-topbar vux-header-deep" :left-options="{showBack: false}" title='购物车'>
            <font-awesome-icon slot='left' icon='chevron-left' @click='back' />
        </x-header>
        <div class="scroll" ref="foodsWrapper">
            <div class="foods-wrapper">
                <div class='noitem' v-show='totalCount==0'>购物车空空如也，快去挑选商品吧</div>
                <ul>
                    <li v-for="food in cartgoods" class="food-item border-1px">
                        <div class="icon">
                            <img width="100%" height="100%" :src="food.icon">
                        </div>
                        <div class="content">
                            <h2 class="name">{{food.name}}</h2>
                            <div class="price">
                                <span class="now">￥{{food.price}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cart-control @add="addCart" :food="food"></cart-control>
                            </div>
                            <div class="delete" @click="deleteItem(food)">
                                ×
                            </div>
                        </div>
                    </li>

                </ul>
            </div>
        </div>
        <div class="total">
            <div class='content-left'>合计：¥ {{getAmount}}</div>
            <div class='content-right' :class="{settle:totalCount>0}" @click='settle'>
                <div>结算</div>
            </div>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import { XHeader } from 'vux'
    import { mapState } from 'vuex'
    import cartControl from './CartControl'
    export default {
        components: {
            XHeader, cartControl
        },
        computed: {
            ...mapState({
                cartgoods: state => state.cart.cartgoods
            }),
            totalCount() {
                let cnt = 0;
                this.cartgoods.forEach(item => {
                    cnt += item.count
                })
                return cnt
            },
            getAmount() {
                let amount = 0;
                this.cartgoods.forEach(item => {
                    amount += item.count * item.price
                })
                return amount
            }
        },
        mounted() {
            console.info('新建了');
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.foodsWrapper, {})
                this.scroll.on('touchend', (pos) => {
                    // 下拉动作
                    if (pos.y > 50) {
                        this.loadData()
                    }
                })
            })

        },
        methods: {
            deleteItem(food){
                food.count = 0;
            },
            settle(){
                alert(1);
            },
            back() {
                this.$router.back()
                this.$destroy()
            },
            addCart() {

            }
        }
    }
</script>

<style scope lang='less'>
    @import '../../assets/app.less';

    #eshop-cart {
        .background {
            background: rgba(241, 242, 243, 1);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
        height:100%;
        li {
            list-style: none;
        }
        ul {
            padding: 0;
        }
        .scroll {
            position: absolute;
            width: 100%;
            top: 3rem;
            bottom: 2rem;
            overflow: hidden;
        }
        .foods-wrapper {
            .food-item {
                background: #fff;
                display: flex;
                margin: 1rem 0;
                padding: @smallsize;
                position: relative;

                .icon {
                    width: 4rem;
                    height: 4rem;
                    margin-right: @xssize;
                }
                .content {
                    flex: 1;
                    .name {
                        margin: 2px 0 8px 0;
                        min-height: @smallsize;
                        line-height: @smallsize;
                        font-size: @smallsize;
                        color: @deepcolor;
                    }
                    .desc {
                        line-height: 12px;
                        margin-bottom: 8px;
                    }
                    .extra {
                        .count {
                            margin-right: 12px;
                        }
                    }
                    .price {
                        position: absolute;
                        bottom: @smallsize;
                        font-weight: 700;
                        line-height: 24px;
                        .now {
                            margin-right: 8px;
                            font-size: 14px;
                            color: #f01414;
                        }
                        .old {
                            text-decoration: line-through;
                            font-size: 10px;
                            color: #93999f;
                        }
                    }
                    .cartcontrol-wrapper {
                        position: absolute;
                        right: 3rem;
                        bottom: @smallsize;
                        color: @basecolor;

                    }
                    .delete {
                        background: #ff8a80;
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 2rem;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: Center;
                        color: @white0;
                    }
                }
            }
        }
        .total{
            position: fixed;
            bottom:0;
            background:@white0;
            left:0;
            right:0;
            color:@black1;
            display:flex;
            justify-content: space-between;
            font-size:@smallsize;
            .content-left{
                height:@smallsize*3;
                display: flex;
                padding-left:@itemsize;
                justify-content: center;
                align-items: center;
            }
            .content-right{
                color:@white0;
                background: @black2;
                display: flex;
                justify-content: center;
                padding-left:2*@itemsize;
                padding-right:2*@itemsize;
                align-items: center;
            }
            .settle{
                background:@basecolor;
            }
        }
    }
</style>
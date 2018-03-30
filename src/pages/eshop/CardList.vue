<template>
    <div id="eshop-cardlist" class='sy-page'>
        <div class="header">
            <div class="background">
                <img src="../../assets/baby.png" width='100%' height='100%'>
            </div>
            <div class="content-wrapper">
                <div class="content">
                    <div class="logo">
                        <img src="../../assets/baby_head.png" width='100%' height='100%' alt="">
                    </div>
                    <span class="title">卡券商城</span>
                    <div class="description">
                        星级母婴护理师服务
                    </div>

                </div>
            </div>
            <div class="bulletin-wrapper">
                <span class="bulletin-title"></span>
                <span class="bulletin-text">
                    购买成功后微信收到卡券信息，请领取卡券到微信卡包
                </span>
                <i class="icon-keyboard_arrow_right">
                    <font-awesome-icon icon='angle-right' />
                </i>
            </div>

        </div>
        <div class="goods">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li v-for="(item,index) in cards" class="menu-item" :class="{'current':currentIndex==index}" @click="selectMenu(index,$event)"
                        ref="menuList">
                        <span class="text border-1px">
                            <font-awesome-icon icon='fire' color='red' v-show='index==0' /> {{item.menuid}}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper" ref="foodsWrapper">
                <ul>
                    <li v-for="item,index in cards" class="food-list" ref="foodList">
                        <h1 class="title">{{cards.find(i=>i.menuid==item.menuid).menuid}}</h1>
                        <ul>
                            <li @click="selectFood(food,$event)" v-for="food,index2 in item.foods" class="food-item border-1px">
                                <div class="icon">
                                    <img width="57" height="57" :src="food.icon">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <div class="extra">
                                        <span class="count">月售{{food.monthSales}}份</span>
                                        <span class="count">库存{{food.quantity}}份</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cart-control @add="addCart" :food="food"></cart-control>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div v-show='false'>
                详情
            </div>
        </div>
        <div class="shopcart">
            <div class="content">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo">
                            <span>
                                <font-awesome-icon icon='shopping-cart' />
                            </span>
                        </div>
                        <div class="num">
                            {{totalCount}}
                        </div>
                    </div>
                    <div class="price">
                        <p>¥ {{getAmount|| 0}}</p>
                    </div>
                </div>
                <div class="content-right"  :class="{settle:getAmount>0}" @click.stop='goSettle'>
                    <div class="pay">去结算</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import { XHeader } from 'vux'
    import cartControl from './CartControl'
    export default {
        components: {
            XHeader,
            cartControl
        },
        data() {
            return {

                cards: [],
                listHeight: [],
                scrollY: 0,
                curFood: {},
                currentIndex: 0
            }
        },
        computed: {
            selectFoods() {
                let foods = [];
                this.cards.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food);
                        }
                    });
                });
                this.$store.dispatch('addCart',foods)
                return foods;
            },
            totalCount(){
                let cnt = 0;
                this.selectFoods.forEach(item =>{
                    cnt += item.count
                })
                return cnt
            },
            getAmount(){
                let amount = 0;
                this.selectFoods.forEach(item =>{
                    amount += item.count*item.price
                })
                return amount
            }
        },
        mounted() {
            this.apiCards()
        },
        methods: {
            gohome() {
                alert('个人中心')
            },
            
            addCart() {
                console.info('增加');
            },
            goSettle(){
                if(this.$store.getters.getAllGoods().length==0) {
                    this.$store.dispatch('toast',{show:true,text:'请先选择商品'})
                    return;
                }
                //console.info('选中的项目',this.selectFood())
                
                this.$router.push({name:'ShopCart'})
            },
            selectMenu(index, event) {
                if (!event._constructed) {
                    return;
                }
                let foodList = this.$refs.foodList;
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el, 300);
                this.currentIndex = index
            },
            selectFood(food, event) {
                if (!event) {
                    return;
                }
                this.selectedFood = food;
                console.info('选中商品', food);
            },

            calculateHeight() {
                let foodList = this.$refs.foodList;
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            _followScroll(index) {
                let menuList = this.$refs.menuList;
                let el = menuList[index];
                this.meunScroll.scrollToElement(el, 300, 0, -100);
            },

            initScroll() {
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                })
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    click: true,
                    probeType: 3
                })
                this.foodsScroll.on('scroll', (pos) => {
                    if (pos.y <= 0) {
                        this.scrollY = Math.abs(Math.round(pos.y));
                    }
                });
            },
            apiCards() {
                let _this = this
                this.$api.get('/wechat/shop/coupons')
                    .then(function (data) {
                        _this.cards = data.object
                        _this.$nextTick(() => {
                            _this.initScroll()
                            _this.calculateHeight()
                        })
                    })
                    .catch(this.$errorHandle)
            }
        }
    }
</script>

<style lang='less'>
    @import '~vux/src/styles/1px.less';
    @import '../../assets/app.less';
    #eshop-cardlist {
        * {
            margin: 0;
            padding: 0;
        }
        li {
            list-style: none;
        }
        .header {
            position: relative;
            overflow: hidden;
            color: #fff;
            background: rgba(7, 17, 27, 0.5);
            height: 8rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .content-wrapper {
                position: relative;
                font-size: 0;
                .content {
                    display: inline-block;
                    margin: 2rem 1rem 2rem 2rem;
                    .title {
                        font-size: @itemsize;
                        line-height: @itemsize;
                        font-weight: 700;
                        margin-left: 4rem
                    }
                    .description {
                        font-size: @smallsize;
                        margin-left: 4rem
                    }
                    .logo {
                        position: absolute;
                        width: 3.6rem;
                        height: 3.6rem;
                        left: 1.2rem;
                        top: 1.2rem;
                        border-radius: 2px;
                        overflow: hidden;
                        background: @white0
                    }
                }
            }
            .background {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                filter: blur(10px);
            }
            .bulletin-wrapper {
                position: relative;
                height: 2rem;
                line-height: 2rem;
                padding: 0 2rem 0 1rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                background: rgba(7, 17, 27, .2);
                .bulletin-title {
                    display: inline-block;
                    vertical-align: middle;
                    margin: auto;
                    width: 1.4rem;
                    height: 1rem;
                    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAYCAYAAACBbx+6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mjk0NDhEMDg0RDhGMTFFNkJGNzlFOUVCREZEMzI2ODciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Mjk0NDhEMDk0RDhGMTFFNkJGNzlFOUVCREZEMzI2ODciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyOTQ0OEQwNjREOEYxMUU2QkY3OUU5RUJERkQzMjY4NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyOTQ0OEQwNzREOEYxMUU2QkY3OUU5RUJERkQzMjY4NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Puq6d8sAAAM6SURBVHja1FdLTFNBFL0YdrZbS7cI7vjuqoZEI0EwGhKIGkxABbugKNJFaWJ1IZC0JLapKS6IqDVKRK2BxL+uiIaVIrqTzw7aurTt+vnOwAzT+qYfNeo7ycvrm++59557Z1qmaVorEU3pj53+b8T1p7dMJ7xhArKCNAhrZCLsIJOhvJhB8+8WqKG+hqwWy3ZsEkn2NNbXFo6jPg6wV9jY+9nLN7S49IV9V++upKb9jj9HGJt5r4yQxbKTmvY5yDfspuXVNXINDbP+2PTtLEOMMOD2snVAcLDfSYnkN3r+6i3ra6irKYlwQUlMRe+zdzqdEZ6CV3hbeGIy7/yPnz6LeYygHikVUuk0cwQcokLepMMCLceOi+9I0C8k8ODxLF2/sUn2kmeIjhxuNlwDBBD+UoBoRicjQkJFS+JhbG7bM3roZL2e7GynR0/mmPfGxkOsLZc0vMvJ9vacYmsAkAOXBKI16HJmzbNaLYZk8xIGkZnYrLAY2uXJAi1Dd/As9AkYkeZyAVk8HLLHsXYxiVtQw9AuNAogUWDxrbvTzDNIQoQaG7W1HBJzQDqsywRSAnxeN/mvXs4iWwjQb0fXGaWOy1WJwkMGQvAavCsnz4mO9k1j9HAur6yJDWZ0bXMjes4NFCQIb+892GaofSMd/5R08M5p53lGDhtDCgCs5oTldu4VbICIyOGH4SWdu1ulj+uYV6MsaDnYiCe05qOd2oj/mmi7eeee5jjQyp7uPpf2PZVi7R8Wl1gf8HVlVeu/6MldjrXxeRijwtMXr9k4jOfrG8GwrMmWwuPwLryHBJkIBYTl3Ou5SfXXy5o8cCwQyko+OUxnu7tYoiFBizliL+jz91RVGvbJpa6xrrb0ssbP/Pn3C8rDAd+oHPDy6HiQolUR5UYAyKpKmByFaoVReQmDbHjrJEOIcP6PBoIi8fAtVw1EAf2QzD+5rYEQlwLe/E4hg8uA98FLuNmppIGDBMar9vstwihduST58Qyi8nUTJOPJJPk87rw6RqhVksm9JP3S5QeyACm73WZcE6U6XGHbZXjNxCUpk8mwfhijuoqCMK9EMEw1zpR/keIm4psA4T78MAHZdVz8fggwAAhHLI5JzyRSAAAAAElFTkSuQmCC);
                    background-size: 22px 12px;
                    background-repeat: no-repeat;
                }
                .bulletin-text {
                    vertical-align: top;
                    margin: 0 4px;
                    font-size: @xssize;
                }
                .icon-keyboard_arrow_right {
                    position: absolute;
                    font-size: @xssize;
                    right: @xssize;
                }
            }
        }
        .goods {
            display: flex;
            position: absolute;
            top: 8rem;
            bottom: 3rem;
            width: 100%;
            overflow: hidden;
            .menu-wrapper {
                flex: 0 0 5rem;
                width: 5rem;
                background: @white2;
                .menu-item {
                    display: table;
                    height: 3rem;
                    width: 3.6rem;
                    padding: 0 0.8rem;
                    line-height: @smallsize;
                    &.current {
                        position: relative;
                        z-index: 10;
                        margin-top: -1px;
                        background: #fff;
                        font-weight: 700;
                        .text {
                            &:after {
                                display: none;
                            }
                        }
                    }
                    .icon {
                        display: inline-block;
                        vertical-align: top;
                        width: 12px;
                        height: 12px;
                        margin-right: 2px;
                        background-size: 12px 12px;
                        background-repeat: no-repeat;
                    }
                    .text {
                        display: table-cell;
                        width: 56px;
                        vertical-align: middle;
                        position: relative;
                        font-size: 12px;
                        &:after {
                            display: block;
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            border-top: 1px solid rgba(7, 17, 27, 0.1);
                            content: ' ';
                        }
                    }
                }
            }
            .foods-wrapper {
                flex: 1;
                .title {
                    padding-left: 1rem;
                    height: 1.6rem;
                    line-height: 1.6rem;
                    border-left: 2px solid #d9dde1;
                    font-size: @smallsize;
                    color: @black1;
                    background: @white1;
                }
                
                .food-item {
                    display: flex;
                    margin: 18px;
                    padding-bottom: 18px;
                    position: relative;
                    &:after {
                        display: block;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        border-top: 1px solid rgba(7, 17, 27, 0.1);
                        content: ' ';
                    }
                    &:last-child {
                        margin-bottom: 0;
                        &:after {
                            display: none;
                        }
                    }
                    .icon {
                        flex: 0 0 57px;
                        margin-right: 10px;
                    }
                    .content {
                        flex: 1;
                        .name {
                            margin: 2px 0 8px 0;
                            min-height: @smallsize;
                            line-height: @smallsize;
                            font-size: @smallsize;
                            color: #07111b;
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
                            right: 0;
                            bottom: @smallsize;
                            color: @basecolor;
                            .minus {}

                        }
                    }
                }

            }
        }
        .goods .foods-wrapper .food-item .content .desc,
        .goods .foods-wrapper .food-item .content .extra {
            line-height: 10px;
            font-size: 10px;
            color: #93999f;
        }

        .shopcart {
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 50;
            width: 100%;
            height: 3rem;
            .content {
                display: flex;
                height: 100%;
                background: @deepcolor;
                color: @white0;
                .content-left {
                    flex: 1;
                    display: flex;
                    .logo-wrapper {
                        display: flex;
                        position: relative;
                        .logo {
                            color: @white0;
                            background: #54A1ED;
                            height: 3.4rem;
                            width: 3.4rem;
                            margin-left: 1rem;
                            margin-top: -0.6rem;
                            border-radius: 50%;
                            box-sizing: border-box;
                            border: 6px solid @deepcolor;
                            font-size: 1.3rem;
                            text-align: center;
                            padding-top: 4px;
                            padding-right: 1px;

                            * {
                                width: 50%;
                                height: 50%;
                                vertical-align: middle;
                            }
                        }
                        .num {
                            position: absolute;
                            font-size: @xssize;
                            background: @highcolor;
                            padding: 4px 8px;
                            height: @xssize;
                            line-height: @xssize;
                            border-radius: @xssize;
                            right: -0.4rem;
                            top: -0.6rem;
                            box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 1);
                        }
                    }
                    .price {
                        font-weight: 700;
                        font-size: @itemsize;
                        height: 100%;
                        line-height: 100%;
                        margin-left: 1rem;
                        display: flex;
                        justify-content: center;
                        align-items: Center;
                    }
                }
                .content-right {
                    background: @black0;
                    font-size: @smallsize;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding:0 1.6rem;
                    .pay{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height:100%;
                        
                    }
                }
                .settle{
                    background: @basecolor ;
                }
            }
        }
    }
</style>
<template>
    <div id="eshop-cardlist">
        <div class="goods">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li v-for="(item,index) in cards.menus" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)"
                        ref="menuList">
                        <span class="text border-1px">
                           {{item.name}}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper" ref="foodsWrapper">
                <ul>
                    <li v-for="item in cards.foods" class="food-list" ref="foodList">
                        <h1 class="title">{{item.name}}</h1>
                        <ul>
                            <li @click="selectFood(food,$event)" v-for="food in item.food" class="food-item border-1px">
                                <div class="icon">
                                    <img width="57" height="57" :src="food.icon">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <div class="extra">
                                        <span class="count">月售{{food.sellCount}}份</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        +
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    export default {
        data() {
            return {

                cards: {},
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            }
        },
        computed: {
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        this._followScroll(i);
                        return i;
                    }
                }
                return 0;
            },
            selectFoods() {
                let foods = [];
                this.cards.foods.forEach((food) => {
                    food.forEach((f) => {
                        if (f.count) {
                            foods.push(f);
                        }
                    });
                });
                return foods;
            }
        },
        created() {
            this.apiCards()
        },
        methods: {
            selectMenu(index, event) {
                if (!event._constructed) {
                    return;
                }
                let foodList = this.$refs.foodList;
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el, 300);
            },
            selectFood(food, event) {
                if (!event._constructed) {
                    return;
                }
                this.selectedFood = food;
                this.$refs.food.show();
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
                if(this.meunScroll) this.meunScroll.scrollToElement(el, 300, 0, -100);
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
                    // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
                    if (pos.y <= 0) {
                        this.scrollY = Math.abs(Math.round(pos.y));
                    }
                });
            },
            apiCards() {
                let _this = this
                this.$api.get('/eshop/cards')
                    .then(function (data) {
                        _this.cards = data.object;
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
            padding: 0;
            margin: 0;
        }
        li {
            list-style: none;
        }
        .goods {
            display: flex;
            position: absolute;
            top: 6rem;
            bottom: 46px;
            width: 100%;
            overflow: hidden;
            .menu-wrapper {
                flex: 0 0 80px;
                width: 80px;
                background: #f3f5f7;
                .menu-item {
                    display: table;
                    height: 54px;
                    width: 56px;
                    padding: 0 12px;
                    line-height: 14px;
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
                    padding-left: 14px;
                    height: 26px;
                    line-height: 26px;
                    border-left: 2px solid #d9dde1;
                    font-size: 12px;
                    color: #93999f;
                    background: #f3f5f7;
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
                            bottom: 12px;
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


    }
</style>
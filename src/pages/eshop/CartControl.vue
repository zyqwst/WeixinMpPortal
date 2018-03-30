<template>
    
        <div class='control'>
            <font-awesome-layers class="minus" @click.stop="reduceCart" >
                <font-awesome-icon :icon="['far','circle']" />
                <font-awesome-icon icon="minus" transform="shrink-6" style="margin-left:1px" />
            </font-awesome-layers>
            <span class='count'>{{food.count || ''}}</span>
            <font-awesome-icon class="plus" icon='plus-circle' @click.stop="addCart" />
        </div>
</template>
<script>
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart() {
                if (!this.food.count) {
                    this.$set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
                this.$emit('add', event.target);
            },
            reduceCart() {
                if (this.food.count) {
                    this.food.count--;
                }
            }
        }
    }
</script>

<style lang='less'>
    @import '../../assets/app.less';
    .control{
        display: flex;
        height:1.2rem;
        justify-content: space-between;
        .count {
            width:2rem;
            text-align:center;
            color: @black1;
            font-size: @xssize;
        }
        .minus{
            color:@black1
        }
    }
           
</style>
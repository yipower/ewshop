<template>
    <div class="goods">
        <goods-list-item v-for="item in goods" :product='item' :key='item'></goods-list-item>
       
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
    name:'GoodsList',
    props:{
        goods:{
            goods:Array,
            default(){
                return []
            }
        }
    },
    components:{
        GoodsListItem
    },
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>
    .goods{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 4px;
    }
</style>
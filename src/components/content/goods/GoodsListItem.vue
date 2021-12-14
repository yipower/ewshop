<template>
    <div class="goods-item">
        <img v-lazy="product.cover_url" @click="itemClick" alt="">
        <div class="goods-info">
            <p>{{product.title}}</p>
            <span class="price"><small>￥</small>{{product.price}}</span>
            <span class="collect">{{product.collects_count}}</span>
        </div>
    </div>
</template>

<script>
import {useRouter} from 'vue-router'
export default {
    name:'GoodsListItem',
    // props:{
    //     product:Object,
    //     default(){
    //         return{}
    //     }
    // },
    props:{
        product:{
            type:Object,
            default(){
                return{}
            }
        }
    },
    setup (props) {
        const router =useRouter();

       return {
                itemClick:()=>{
                    router.push({path:'/detail', query:{id:props.product.id}})
                }
            }
    }
}
</script>

<style scoped lang="scss">
.goods-item {
    width:46%;
    padding-bottom: 40px;
    position: relative;


    img {
        width:100%;
        border-radius: 5px;
    }

    .goods-info {
        font-size:12px;
        position: absolute;
        bottom:5px;
        left:0;
        right:0;
        overflow: hidden;
        text-align: center;
        p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 3px;
        }

        .price {
            color: red;
            margin-right: 20px;
        }

        .collect {
            position: relative;
        }
        .collect::before {
            content: '';
            position: absolute;
            left:-15px;
            width:14px;
            height:14px;
            top:-1px;
            background: url('~assets/images/collect.png') 0 0/14px 14px;
        }
    }
}

</style>
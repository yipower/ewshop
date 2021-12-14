<template>
    <div>
        <nav-bar>
            <template v-slot:default>商品分类</template>
        </nav-bar>

        <div id="mainbox">
            <div class="ordertab">

                <van-tabs v-model="active" @click="tabClick">
                    <van-tab title="销量排序"></van-tab>
                    <van-tab title="价格排序"></van-tab>
                    <van-tab title="评化排序"></van-tab>

                </van-tabs>
            </div>


            <van-sidebar class="leftmenu" v-model="activeKey">
                <van-collapse v-model="activeName" accordion>
                    <van-collapse-item v-for="item in categories" :key="item.id"
                                       :title="item.name"
                                       :name="item.name">

                        <van-sidebar-item
                                v-for="sub in item.children"
                                :title="sub.name"
                                :key="sub.id"
                                @click="getGoods(sub.id)"
                        />

                    </van-collapse-item>

                </van-collapse>
            </van-sidebar>



            <div class="goodslist">
                <div class="content">
                    <van-card
                            v-for="item in showGoods" :key="item.id"
                            @click="itemClick(item.id)"
                            :num="item.comments_count"
                            :tag="item.comments_count >= 0 ? '流行' : '标签'"
                            :price="item.price"
                            :desc="item.updated_at"
                            :title="item.title"
                            :thumb="item.cover_url"
                            :lazy-load="true"

                    />

                </div>
            </div>

        </div>

        <back-top @bTop="bTop" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import BackTop from "components/common/backtop/BackTop";

    import {ref, reactive, onMounted, computed, watchEffect, nextTick} from 'vue';
    import {useRouter} from 'vue-router';

    import {getCategory, getCategoryGoods} from "network/category";

    import BScroll from 'better-scroll';

    export default {
        name: "Categroy",
        setup() {
            const router = useRouter();

            let active = ref(1);
            let activeKey = ref(0);
            let activeName = ref(1);
            let categories = ref([]);
            let isShowBackTop = ref(false);

            //当前的排序条件
            let currentOrder = ref('sales');
            //当前的分类ID
            let currentCid = ref(0);

            //数据模型
            const goods = reactive({
                sales:{page:0, list:[]},
                price:{page:0, list:[]},
                comments_count:{page:0, list:[]}
            })

            const showGoods = computed(()=>{
                return goods[currentOrder.value].list;
            })



            const init = () =>{
                getCategoryGoods('sales', currentCid.value).then(res=>{
                     goods.sales.list = res.goods.data;
                })

                getCategoryGoods('price', currentCid.value).then(res=>{
                    goods.price.list = res.goods.data;
                })

                getCategoryGoods('comments_count', currentCid.value).then(res=>{
                    goods.comments_count.list = res.goods.data;
                })

            }
    
            let bscroll = reactive({});

            onMounted(()=>{
                getCategory().then(res=>{
                    categories.value = res.categories;
                })

                init();

                // 创建BetterScroll对象
                bscroll = new BScroll(document.querySelector('.goodslist'), {
                    probeType: 3,  // 0, 1, 2, 3, 3 只要在运运就触发scroll事件
                    click: true, // 是否允许点击
                    pullUpLoad: true //上拉加载更多， 默认是false
                });

                // 注册滚动事件
                bscroll.on('scroll', (position)=>{
                     isShowBackTop.value = (-position.y) > 300
                })

                // 上拉加载数据,触发pullingUp
                bscroll.on("pullingUp", ()=>{
                    console.log('上拉加载更多.....');

                    const page = goods[currentOrder.value].page + 1;

                    getCategoryGoods(currentOrder.value, currentCid.value).then(res=>{
                        goods[currentOrder.value].list.push(...res.goods.data);
                        goods[currentOrder.value].page +=1;

                    })


                    // 完成上拉， 等数据请求完成， 要将新数据展示出来
                    bscroll.finishPullUp();


                    //重新计算高度
                    nextTick(()=>{
                        // 重新计算高度
                        bscroll &&  bscroll.refresh();
                    })
                    console.log("contentheight:"+document.querySelector('.content').clientHeight);
                    console.log("当前类型:"+currentOrder.value+",当前页："+page);
                })
            })

            // 排序选项卡
            const tabClick = (index)=>{


                let orders = ['sales', 'price', 'comments_count'];

                currentOrder.value = orders[index];

                getCategoryGoods(currentOrder.value, currentCid.value).then(res=>{
                    goods[currentOrder.value].list = res.goods.data;

                    nextTick(()=>{
                        // 重新计算高度
                        bscroll &&  bscroll.refresh();
                    })
                })


                console.log("当前分类id: "+currentCid.value);
                console.log("排序的序号："+currentOrder.value);
            }
            // 通过分类get商品
            const getGoods = (cid) =>{
                currentCid.value = cid;
                init();
                console.log("当前分类id: "+currentCid.value);
                console.log("排序的序号："+currentOrder.value);
            }

            // 监听 任何一个变量有变量
            watchEffect(()=>{
                nextTick(()=>{
                    // 重新计算高度
                    bscroll &&  bscroll.refresh();
                })
            })

            const bTop = ()=>{
                bscroll.scrollTo(0, 0, 300);
            }

            return {
                activeKey,
                categories,
                activeName,
                active,
                tabClick,
                currentOrder,
                currentCid,
                getGoods,
                goods,
                showGoods,
                bscroll,
                isShowBackTop,
                bTop,
                itemClick:(id)=>{
                    
                    router.push({path:'/detail', query:{id}});
                }
            }
        },
        components: {
            NavBar,
            BackTop
        }
    }
</script>

<style scoped lang="scss">
#mainbox {
    margin-top: 45px;
    display: flex;
    .ordertab {
        flex: 1;
        float:right;
        height:50px;
        z-index: 9;
        position: fixed;
        top:45px;
        right:0;
        left:130px;
    }

    .leftmenu {
        position: fixed;
        top:95px;
        left:0;
        width:130px;
    }

    .goodslist {
        flex:1;
        position: absolute;
        top:100px;
        left:130px;
        right:0;
        height:100vh;
        padding:10px;
        text-align: left !important;
        .content {

        }
    }
}

.van-card__thumb {
    width:68px !important
}
</style>
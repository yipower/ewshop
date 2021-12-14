<template>
    <div id="home">
        <nav-bar>
            <template v-slot:default>图书兄弟</template>
        </nav-bar>

        <tab-control v-show="isTabFixed" @tabClick="tabClick" :titles="['畅销', '新书', '精选']"></tab-control>


        <div  class="wrapper">
           <div class="content">
               <div ref="banref">
                   <home-swiper  :banners="banners"></home-swiper>

                   <recommend-view :recommends="recommends"></recommend-view>
               </div>


               <tab-control @tabClick="tabClick" :titles="['畅销', '新书', '精选']"></tab-control>

               <goods-list :goods="showGoods"></goods-list>
           </div>
        </div>


        <back-top @bTop="bTop" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
    import HomeSwiper from "./ChildComps/HomeSwiper";
    import NavBar from "components/common/navbar/NavBar";
    import RecommendView from "./ChildComps/RecommendView";
    import TabControl from "components/content/tabControl/TabControl";
    import GoodsList from "components/content/goods/GoodsList";
    import BackTop from "components/common/backtop/BackTop";
    import {getHomeAllData, getHomeGoods} from 'network/home';
    import {ref, reactive, onMounted, computed, watchEffect, nextTick} from 'vue';
    import BScroll from 'better-scroll';


    export default {
        name: "Home",
        setup() {

            let isTabFixed = ref(false);
            let isShowBackTop = ref(false);
            let banref = ref(null);
            const recommends = ref([]);

            // 商品列表数据模型
            const goods = reactive({
                sales:{page:1, list:[]},
                new: {page:1, list:[]},
                recommend: {page:1, list:[]}
            })

            let currentType = ref('sales');

            const showGoods = computed(()=>{
                return goods[currentType.value].list;
            })


            let bscroll = reactive({});

            let banners = ref([]);
            onMounted(()=>{

                getHomeAllData().then(res=>{

                    recommends.value = res.goods.data;
                    banners.value = res.slides;



                })

                getHomeGoods('sales').then(res=>{
                    goods.sales.list = res.goods.data;
                })

                getHomeGoods('recommend').then(res=>{
                    goods.recommend.list = res.goods.data;
                })

                getHomeGoods('new').then(res=>{
                    goods.new.list = res.goods.data;
                })

                // 创建BetterScroll对象
                bscroll = new BScroll(document.querySelector('.wrapper'), {
                    probeType: 3,  // 0, 1, 2, 3, 3 只要在运运就触发scroll事件
                    click: true, // 是否允许点击
                    pullUpLoad: true //上拉加载更多， 默认是false
                });


                //触发滚动事件
                bscroll.on('scroll', (position)=>{
                    // console.log(banref.value.offsetHeight);
                    // console.log(-position.y);

                    isShowBackTop.value = isTabFixed.value = (-position.y) > banref.value.offsetHeight;

                })

                // 上拉加载数据,触发pullingUp
                bscroll.on("pullingUp", ()=>{
                    // console.log('上拉加载更多.....');

                    const page = goods[currentType.value].page + 1;

                    getHomeGoods(currentType.value, page).then(res=>{
                        goods[currentType.value].list.push(...res.goods.data);
                        goods[currentType.value].page += 1;
                    })

                    // 完成上拉， 等数据请求完成， 要将新数据展示出来
                    bscroll.finishPullUp();


                    //重新计算高度
                    bscroll.refresh();
                    // console.log("contentheight:"+document.querySelector('.content').clientHeight);
                    // console.log("当前类型:"+currentType.value+",当前页："+page);
                })


            })

            const tabClick = (index)=>{

                let types = ['sales', 'new', 'recommend'];

                currentType.value = types[index];

                nextTick(()=>{
                    // 重新计算高度
                    bscroll &&  bscroll.refresh();
                })
            }

            // 监听 任何一个变量有变量
            watchEffect(()=>{
                nextTick(()=>{
                    // 重新计算高度
                    bscroll &&  bscroll.refresh();
                })
            })

            const bTop = () =>{
                bscroll.scrollTo(0, 0, 500);
            }

            return {
                recommends,
                tabClick,
                goods,
                showGoods,
                isTabFixed,
                isShowBackTop,
                banref,
                bTop,
                banners
            }
        },
        components: {
            HomeSwiper,
            NavBar,
            RecommendView,
            TabControl,
            BackTop,
            GoodsList
        }
    }
</script>

<style scoped>
.banners img{
    width:100%;
    height:auto;
}

#home {
    height:100vh;
    position: relative;
}

    .wrapper {
        position: absolute;
        top:45px;
        bottom:50px;
        left:0px;
        right:0px;
        overflow: hidden;
    }
    
</style>
<template>
    <van-swipe v-if="banners.length" class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item style="height:150px" v-for="(item, index) in banners" :key="index">
            <img  v-lazy="item.img_url" alt="">
        </van-swipe-item>
    </van-swipe>
</template>

<script>
    export default {
        name: "HomeSwiper",
        props: {
            banners: Array,
            default() {
                return []
            }
        }
    }
</script>

<style scoped>
img {
    width:100%;
    height:auto !important;
}
</style>
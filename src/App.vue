<template>
  <router-view /> 
  <!-- <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view> -->
  <div id="nav">
    <router-link class="tab-bar-item" to="/">
      <div class="icon"><i class="iconfont icon-shouye"></i></div>
      <div>首页</div>
    </router-link>
    <router-link class="tab-bar-item" to="/categroy">
      <div class="icon"><i class="iconfont icon-fenlei"></i></div>
      <div>分类</div>
    </router-link>
    <router-link class="tab-bar-item" to="/shopcart">
      <div class="icon">
        <van-badge :content="$store.state.cartCount" max="9">
          <i class="iconfont icon-gouwuchezhengpin"></i>
        </van-badge>
      </div>
      <div>购物车</div>
    </router-link>
    <router-link class="tab-bar-item" to="/profile">
      <div class="icon"><i class="iconfont icon-yonghu"></i></div>
      <div>我的</div>
    </router-link>
  </div>
</template>

<script>
  import {onMounted} from 'vue'
  import {useStore} from 'vuex'
  export default{
    setup(){
      const store= useStore();
      onMounted(()=>{
        store.dispatch('updateCart')
      })
    }
  }
</script>


<style lang="scss">
@import "assets/css/base.css";
@import "assets/css/iconfont.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  // padding: 30px;
  background-color: #f6f6f6;
  display: flex;
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
  a {
    color: var(--color-text);

    &.router-link-exact-active {
      // color: var (--color-high-text);
      color: red;
    }
  }
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 50px;
    font-size: var(--font-size);
  }
  .tab-bar-item .icon {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
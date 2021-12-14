import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
const Home =()=>import('../views/home/Home.vue')
const Categroy =()=>import('../views/category/Categroy.vue')
const Detail=()=>import('../views/detail/Detail.vue')
const Profile =()=>import('../views/profile/Profile.vue')
const ShopCart =()=>import('../views/shopcart/Shopcart.vue')
const Register =()=>import('../views/profile/Register.vue')
const Login =()=>import('../views/profile/Login.vue')

import store from '../store'
import {Notify} from 'vant'
const routes = [
  {
    path: '',
    name: 'DefaultHome',
    component: Home,
    meta:{
      title:'首页'
    }
  },
  {
    path:'/home',
    name:'Home',
    component:Home,
    meta:{
      title:'图书兄弟-首页'
    }
  },
  {
    path:'/categroy',
    name:'Categroy',
    component:Categroy,
    meta:{
      title:'图书兄弟-商品分类'
    }
  },
  {
    path:'/detail',
    name:'Detail',
    component:Detail,
    meta:{
      title:'图书兄弟-商品详情'
    }
  },
  {
    path:'/profile',
    name:'Profile',
    component:Profile,
    meta:{
      title:'图书兄弟-个人中心',
      isAuthRequired:true
    }
  },
  {
    path:'/register',
    name:'Register',
    component:Register,
    meta:{
      title:'图书兄弟-注册'
    }
  },
  {
    path:'/shopCart',
    name:'ShopCart',
    component:ShopCart,
    meta:{
      title:'图书兄弟-购物车',
      isAuthRequired:true
    }
  },
  {
    path:'/login',
    name:'Login',
    component:Login,
    meta:{
      title:'图书兄弟-用户登录'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next)=>{
  // 如果没有登录， 在这里到login
if(to.meta.isAuthRequired && store.state.user.isLogin === false) {
  Notify('您还没有登录， 请先登录');
  return next('/login');
}else{
  next();
}


 document.title = to.meta.title;
})
export default router

<template>
    <div>
        <nav-bar>
            <template v-slot:default>个人中心</template>
        </nav-bar>
        <div style="margin-top:100px">
            <van-button round block  color="#42b983" @click="tologout">退出登录</van-button>
        </div>
    </div>
</template>

<script>
import {logout} from 'network/user'
import NavBar from 'components/common/navbar/NavBar.vue'
import { Toast } from 'vant'
import {useRouter} from 'vue-router'
import { useStore } from 'vuex'
export default {
     name:"Profile",
     components:{NavBar},
    setup () {
        const router= useRouter();
        const store=useStore()
        const tologout =()=>{
            logout().then(res=>{
                if(res.status=='204'){
                    Toast.success('退出成功')

                    // 清除token
                    window.localStorage.setItem('token','');

                    store.commit('setIsLogin',false);
                    setTimeout(()=>{
                        router.push({path:'/login'})
                    },2000)
                }
            })   
        }

        return {tologout,}
    }
}
</script>

<style scoped>

</style>
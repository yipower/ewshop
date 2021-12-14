<template>
  <div>
    <nav-bar>
      <template v-slot:default>新用户注册</template>
    </nav-bar>
    <div style="margin-top: 50px">
      <div style="text-align: center; padding-top: 50px">
        <van-image
          width="100"
          height='5rem'
          src="https://www.lmonkey.com/_nuxt/img/logo.ca1ae0c.png"
        />
      </div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="name"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="password_confirmation"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请填写一致的密码' }]"
        />
        <van-field
          v-model="email"
          name="电子邮箱"
          label="电子邮箱"
          placeholder="电子邮箱"
          :rules="[{ required: true, message: '请填写电子邮箱' }]"
        />
        <div style="margin: 16px">
          <div class="link-login" @click="$router.push({path:'/login'})">
            已有账号，立即登录
          </div>
          <van-button
            round
            block
            type="info"
            color="#44b883"
            native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { reactive ,toRefs} from '@vue/reactivity';
import {register} from 'network/user';
import { Notify } from 'vant';
import { Toast } from 'vant';
import {useRouter} from 'vue-router'
export default {
  name: "Register",
  components: { NavBar },
  setup() {
    const router= useRouter();
      const userinfo=reactive({
          name:'',
          password:'',
          password_confirmation:'',
          email:''
      })
      const onSubmit=()=>{
        // 先验证。。
        if(userinfo.password!=userinfo.password_confirmation){
          Notify('两次密码不一致')

          // 提交给服务器 
        }else{
          register(userinfo).then(res=>{

            //     use123
            if(res.status=='201'){
              Toast.success('注册成功');
              setTimeout(()=>{
                router.push({path:'/login'})
              },1000)
            }
            userinfo.password_confirmation='',
            userinfo.password='';
          })
        }

        
      }
    return {
       ...toRefs(userinfo),
       onSubmit
    };
  },
};
</script>

<style lang="scss" scoped>
.link-login{
  font-size: 14px;
  margin-bottom: 20px;
  color: #42b983;
  display: inline-block;
  text-align: left;

}
</style>
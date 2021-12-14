<template>
  <div>
    <nav-bar>
      <template v-slot:default>用户注册</template>
    </nav-bar>
    <div style="margin-top: 50px">
      <div style="text-align: center; padding-top: 50px">
        <van-image
          width="100"
          height="5rem"
          src="https://www.lmonkey.com/_nuxt/img/logo.ca1ae0c.png"
        />
      </div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="email"
          name="用户名"
          label="邮箱"
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
        <!-- <van-field
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
        /> -->
        <div style="margin: 16px">
          <div class="link-login" @click="$router.push({ path: '/register' })">
            没有账号，立即注册
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
import { reactive, toRefs } from "@vue/reactivity";
import { login } from "network/user";
import { Notify } from "vant";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import {userStore, useStore} from 'vuex'
export default {
  name: "Login",
  components: { NavBar },
  setup() {
    const router =useRouter();
    const store =useStore()
    const userinfo = reactive({
      email: "",
      password: "",
    });
    const onSubmit = () => {
      login(userinfo).then((res) => {
        // console.log(res.access_token);
        // 将token保存在本地 window.localStorage   setItem(key, value) getItem(key)
        window.localStorage.setItem("token", res.access_token);
        // 在vuex isLogin
        store.commit('setIsLogin',true);
         

        Toast.success("登录成功");

        userinfo.email = "";
        userinfo.password = "";

        setTimeout(() => {
          router.go(-1);
        }, 500);
      });
    };
    return {
      ...toRefs(userinfo),
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.link-login {
  font-size: 14px;
  margin-bottom: 20px;
  color: #42b983;
  display: inline-block;
  text-align: left;
}
</style>
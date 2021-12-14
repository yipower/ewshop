import { createStore } from 'vuex'
import  mutations  from './mutations'
import actions from './actions'
import getters from './getters'

const state= {
  user:{
    // 判断本地是否存在账户信息
    isLogin:window.localStorage.getItem('token')?true:false
  },
  cartCount:0
}
export default createStore({
  state,
  mutations,
  actions,
  getters
})

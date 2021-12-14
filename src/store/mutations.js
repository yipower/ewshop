const mutations ={
    setIsLogin(state,payload){
        state.user.isLogin=payload;
    },
    addCart(state,payload){
        state.cartCount=payload.count
    }
}

export default mutations;


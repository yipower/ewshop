import {getCart} from "network/cart"

const actions={
    updateCart({commit}){
        getCart().then(res=>{
            commit('addCart',{count:res.data.length || 0})
        })
    }
}
export default actions;
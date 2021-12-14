import {request} from './request'


// 添加购物车
export function addCart(data){
    return request({
        url:'/api/carts',
        method:'post',
        data
    })
}

// 修改购物车
export function modifyCart(id,data){
    return request({
        url:`/api/carts/${id}`,
        method:'put',
        data
    })
}

// 选择商品的状态  所有选择的id
export function checkCart(data){
    return request({
        url:'/api/carts/checked',
        method:'pathch',
        data
    })
}


// 获取购物车列表
export function getCart(data=''){
    return request({
        url:'/api/carts?'+data,
        method:'',
        data
    })
}

// 删除购物车
export function deleteCartItem(data){
    return request({
        url:`/api/carts/${id}`,
        method:'delete',
        data
    })
}
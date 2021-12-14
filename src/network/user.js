import {request} from './request'
export function register(data) {
    return request({
        url:'/api/auth/register',
        method:'post',
        data
    })
}

export function login(data){
    return request({
        url:'api/auth/login',
        method:'post',
        data
    })
}

export function logout(data){
    return request({
        url:'api/auth/logout',
        method:'post',
        
    })
}
import request from '@/utils/request';

//get请求封装
export const getAction = (url,params) => {
    return request({
        url,
        method: 'get',
        params
      })
}
//post请求封装
export const postAction = (url,data) => {
    return request({
        url,
        method:'post',
        data
    })
}
//put请求封装
export const putAction = (url,data) => {
    return request({
        url,
        method:'put',
        data,
    }) 
}
//get请求下载
export const getDownAction = (url,params) => {
    return request({
        url,
        method:'get',
        params,
        responseType:'blob'
    })
}
//post请求下载
export const postDownAction = (url,data) => {
    return request({
        url,
        method:'post',
        data,
        responseType:'blob'
    })
}
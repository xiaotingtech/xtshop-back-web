import request from '@/utils/request'
//首页数据获取
export function fetchHome() {
  return request({
    url:'/back/index/index',
    method:'post'
  })
}
export function fetchOrder(params) {
  return request({
    url:'/back/index/order',
    method:'post',
    data:params
  })
}

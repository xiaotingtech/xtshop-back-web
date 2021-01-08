import request from '@/utils/request'

export function getOrderSetting(type) {
  return request({
    url:'/back/ordersetting/info/'+type,
    method:'get',
  })
}

export function updateOrderSetting(data) {
  return request({
    url:'/back/ordersetting/update',
    method:'post',
    data:data
  })
}

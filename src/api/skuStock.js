import request from '@/utils/request'
export function fetchList(pid,params) {
  return request({
    url:'/back/product/sku?product_id='+pid,
    method:'get',
    params:params
  })
}

export function update(data) {
  return request({
    url:'/back/product/skuupdate',
    method:'post',
    data:data
  })
}

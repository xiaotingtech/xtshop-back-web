import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/back/product/productskuvalue',
    method:'get',
    params:params
  })
}

export function createProductSkuValue(data) {
  return request({
    url:'/back/product/productskuvalueadd',
    method:'post',
    data:data
  })
}

export function deleteProductSkuValue(data) {
  return request({
    url:'/back/product/productskuvaluedel',
    method:'post',
    data:data
  })
}

export function updateProductSkuValue(data) {
  return request({
    url:'/back/product/productskuvalueedit',
    method:'post',
    data:data
  })
}

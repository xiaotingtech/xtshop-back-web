import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/back/product/list',
    method:'get',
    params:params
  })
}

export function updateDeleteStatus(params) {
  return request({
    url:'/back/product/deletestatus',
    method:'post',
    data:params
  })
}

export function updateNewStatus(params) {
  return request({
    url:'/back/product/newstatus',
    method:'post',
    data:params
  })
}

export function updateRecommendStatus(params) {
  return request({
    url:'/back/product/recommendstatus',
    method:'post',
    data:params
  })
}

export function updatePublishStatus(params) {
  return request({
    url:'/back/product/publishstatus',
    method:'post',
    data:params
  })
}

export function createProduct(data) {
  return request({
    url:'/back/product/create',
    method:'post',
    data:data
  })
}

export function updateProduct(data) {
  return request({
    url:'/back/product/update',
    method:'post',
    data:data
  })
}

export function getProduct(id) {
  return request({
    url:'/back/product/productinfo/'+id,
    method:'get',
  })
}


import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/back/product/productattr',
    method:'get',
    params:params
  })
}

export function createProductAttrCate(data) {
  return request({
    url:'/back/product/productattradd',
    method:'post',
    data:data
  })
}

export function deleteProductAttrCate(id) {
  return request({
    url:'/back/product/productattrdel/'+id,
    method:'get'
  })
}

export function updateProductAttrCate(data) {
  return request({
    url:'/back/product/productattredit',
    method:'post',
    data:data
  })
}

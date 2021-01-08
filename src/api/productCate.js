import request from '@/utils/request'
export function fetchList(parentId,params) {
  return request({
    url:'/back/product/productcate/'+parentId,
    method:'get',
    params:params
  })
}
export function deleteProductCate(id) {
  return request({
    url:'/back/product/productcatedel',
    method:'post',
    data:{ids:id}
  })
}

export function createProductCate(data) {
  return request({
    url:'/back/product/productcateadd',
    method:'post',
    data:data
  })
}

export function updateProductCate(data) {
  return request({
    url:'/back/product/updateproductcate',
    method:'post',
    data:data
  })
}

export function getProductCate(id) {
  return request({
    url:'/back/product/productcateinfo/'+id,
    method:'get',
  })
}

export function updateShowStatus(data) {
  return request({
    url:'/back/product/productcatestatus',
    method:'post',
    data:data
  })
}

export function updateNavStatus(data) {
  return request({
    url:'/back/product/productcatenav',
    method:'post',
    data:data
  })
}

export function fetchListWithChildren() {
  return request({
    url:'/back/productcategory/tree',
    method:'get'
  })
}

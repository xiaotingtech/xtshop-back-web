import request from '@/utils/request'
export function fetchList(cid,params) {
  params['cid']=cid;
  return request({
    url:'/back/product/productskulist',
    method:'get',
    params:params
  })
}

export function deleteProductAttr(data) {
  return request({
    url:'/back/product/productskudel',
    method:'post',
    data:data
  })
}

export function createProductAttr(data) {
  return request({
    url:'/back/product/productskuadd',
    method:'post',
    data:data
  })
}

export function updateProductAttr(data) {
  return request({
    url:'/back/product/productskuedit',
    method:'post',
    data:data
  })
}

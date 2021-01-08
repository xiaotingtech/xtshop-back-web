import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/back/banner/bannerlist',
    method:'get',
    params:params
  })
}
export function deleteBanner(id) {
  return request({
    url:'/back/banner/bannerdel',
    method:'post',
    data:{ids:id}
  })
}

export function createBanner(data) {
  return request({
    url:'/back/banner/banneradd',
    method:'post',
    data:data
  })
}

export function updateBanner(data) {
  return request({
    url:'/back/banner/banneredit',
    method:'post',
    data:data
  })
}

export function getBanner(id) {
  return request({
    url:'/back/banner/banneredit/'+id,
    method:'get',
  })
}

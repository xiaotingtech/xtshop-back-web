import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/back/returnReason/list',
    method:'get',
    params:params
  })
}

export function deleteReason(params) {
  return request({
    url:'/back/returnReason/delete',
    method:'post',
    params:params
  })
}

export function updateStatus(params) {
  return request({
    url:'/back/returnReason/update/status',
    method:'post',
    params:params
  })
}

export function addReason(data) {
  return request({
    url:'/back/returnReason/create',
    method:'post',
    data:data
  })
}

export function getReasonDetail(id) {
  return request({
    url:'/returnReason/'+id,
    method:'get'
  })
}

export function updateReason(id,data) {
  return request({
    url:'/returnReason/update/'+id,
    method:'post',
    data:data
  })
}

import request from '@/utils/request'

export function fetchList(parentId,params) {
  return request({
    url:'/back/subject/list/'+parentId,
    method:'get',
    params:params
  })
}
export function deleteApiSubject(id) {
  return request({
    url:'/back/subject/subjectcatedel',
    method:'post',
    data:{ids:id}
  })
}

export function createApiSubject(data) {
  return request({
    url:'/back/subject/subjectadd',
    method:'post',
    data:data
  })
}

export function updateApiSubject(data) {
  return request({
    url:'/back/subject/subjectedit',
    method:'post',
    data:data
  })
}

export function getApiSubject(id) {
  return request({
    url:'/back/subject/info/'+id,
    method:'get',
  })
}

export function updateShowStatus(data) {
  return request({
    url:'/back/subject/subjectstatus',
    method:'post',
    data:data
  })
}

export function updateNavStatus(data) {
  return request({
    url:'/back/subject/subjectnav',
    method:'post',
    data:data
  })
}

export function fetchSubjectWithChildren() {
  return request({
    url:'/back/subject/tree',
    method:'get'
  })
}

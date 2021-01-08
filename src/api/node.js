import request from '@/utils/request'

export function fetchList(parentId,params) {
  if(parentId){
    return request({
      url: '/back/node/list?parentId='+parentId,
      method: 'get',
      params: params
    })
  }else {
    return request({
      url: '/back/node/list',
      method: 'get',
      params: params
    })
  }
}

export function deleteMenu(id) {
  return request({
    url: '/back/node/delete/' + id,
    method: 'post'
  })
}

export function createMenu(data) {
  return request({
    url: '/back/node/create',
    method: 'post',
    data: data
  })
}

export function updateMenu(id, data) {
  return request({
    url: '/back/node/update?id=' + id,
    method: 'post',
    data: data
  })
}

export function getMenu(id) {
  return request({
    url: '/back/node/update?id=' + id,
    method: 'get',
  })
}

export function updateHidden(id, params) {
  if(id) {
    return request({
      url: '/back/node/hidden?id=' + id,
      method: 'post',
      params: params
    })
  }else{
    return request({
      url: '/back/node/hidden/' + id,
      method: 'post',
      params: params
    })
  }
}

export function fetchTreeList() {
  return request({
    url: '/back/node/tree',
    method: 'get'
  })
}


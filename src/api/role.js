import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/back/role/list',
    method: 'get',
    params: params
  })
}

export function createRole(data) {
  return request({
    url: '/back/role/create',
    method: 'post',
    data: data
  })
}

export function updateRole(id, data) {
  return request({
    url: '/back/role/update',
    method: 'post',
    data: data
  })
}

export function updateStatus(data) {
  return request({
    url: '/back/role/status',
    method: 'post',
    data: data
  })
}

export function deleteRole(data) {
  return request({
    url:'/back/role/delete',
    method:'post',
    data:data
  })
}

export function fetchAllRoleList() {
  return request({
    url: '/back/role/listselect',
    method: 'get'
  })
}

export function listMenuByRole(roleId) {
  return request({
    url: '/back/role/listmenu?roleId='+roleId,
    method: 'get'
  })
}


export function allocMenu(data) {
  return request({
    url: '/back/role/access',
    method: 'post',
    data:data
  })
}

export function allocResource(data) {
  return request({
    url: '/back/role/allocResource',
    method: 'post',
    data:data
  })
}

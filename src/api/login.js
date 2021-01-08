import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/back/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/back/user/info',
    method: 'post',
  })
}

export function logout() {
  return request({
    url: '/back/user/logout',
    method: 'post'
  })
}

export function fetchList(params) {
  return request({
    url: '/back/member/list',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/back/member/add',
    method: 'post',
    data: data
  })
}

export function updateAdmin(id, data) {
  return request({
    url: '/back/member/update',
    method: 'post',
    data: data
  })
}

export function updateStatus(params) {
  return request({
    url: '/back/member/status',
    method: 'post',
    data: params
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/back/user/delete/' + id,
    method: 'post'
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/back/role/member?memberId=' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  return request({
    url: '/back/role/alloc',
    method: 'post',
    data: data
  })
}

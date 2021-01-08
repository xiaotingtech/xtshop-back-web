import request from '@/utils/request'
export function fetchList() {
  return request({
    url:'/back/companyAddress/list',
    method:'get'
  })
}

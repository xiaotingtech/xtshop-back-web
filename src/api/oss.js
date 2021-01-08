import request from '@/utils/request'
export function policy() {
  return request({
    url:'/back/file/upload',
    method:'post',
  })
}

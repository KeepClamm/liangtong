import request from '@/utils/request'
export function getSameClient() {
  return request({
    url: '/liangtong/same-client/test',
    method: 'get'
  })
}
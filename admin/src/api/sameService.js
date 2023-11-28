import request from '@/utils/request'
export function getSameServiceData() {
  return request({
    url: '/liangtong/same-service/service-detail',
    method: 'get'
  })
}
import request from '@/utils/request'
export function getSameClientTopCredit() {
  return request({
    url: '/liangtong/same-client/same-client-top-credit',
    method: 'get'
  })
}
export function getSameClientTopNonCredit() {
  return request({
    url: '/liangtong/same-client/same-client-top-non-credit',
    method: 'get'
  })
}
export function getSameClientServiceRisk() {
  return request({
    url: '/liangtong/same-client/same-client-service-risk',
    method: 'get'
  })
}
export function getDefaultsBlacklists() {
  return request({
    url: '/liangtong/same-client/default-blacklists',
    method: 'get'
  })
}
export function getRelationDetail() {
  return request({
    url: '/liangtong/same-client/relation-detail',
    method: 'get'
  })
}
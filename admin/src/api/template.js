import { axios } from './common';

// 获取
export function testA(params = {}, config = {}){
  return axios.get('/get', {
    params,
    headers: config.headers || {},
    notToastErr: false, // 是否要关闭错误提示
    showLoading: false, // 是否需要显示loading
  });
}


export function testB(data = {}, params = {}){
  return axios.post('/post', data, params);
}


export function testC(data = {}, params = {}){
  return axios.put(`/put/${data.id}`, data, params);
}

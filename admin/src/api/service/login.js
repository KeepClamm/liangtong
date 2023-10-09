const { axios } = require('../common');
import baseUrl from '../config';
import qs from 'qs';


export function getLoginVerifyImage(params = {}, config = {}){
  return baseUrl.URL_EASYMOCK + `/verify?width=${params.width}&height=${params.height}&codeCount=${params.codeCount}&time=${new Date().getTime()}`
}

export function userLogin(data = {}, params = {}){
  return axios.post('/login', data, params);
}


export function reqUserInfo(params = {}, config = {}){
  return axios.get('/user', params);
}

export function userlogout(data = {}, params = {}){
  return axios.post('/user/loginout', data, params);
}

export function userModifyPasswors(params = {}, config = {}){
  return axios.put('/user/modifyPassword', params);
}
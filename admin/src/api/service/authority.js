const { axios } = require('../common');
import qs from 'qs';

// 角色列表
export function getRoleList(params = {}, config = {}){
  return axios.get('/role', params);
}

// 添加角色
export function addRole(data = {}, params = {}){
  return axios.post('/role', data, params);
}

// 编辑角色
export function editRole(data = {}, params = {}){
  return axios.put(`/role/${data.id}`, data, params);
}

//  删除角色
export function deleteRole(data = {}, params = {}){
  return axios.delete(`/role/${data.id}`, data, params);
}


// 权限树列表
export function getAuthTree(params = {}, config = {}){
  return axios.get('/permission', params);
}
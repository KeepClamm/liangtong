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

// 角色详情
export function getRoleDetail(params = {}, config = {}){
  return axios.get(`/role/${params.id}`, params);
}


// 权限树列表
export function getAuthTree(params = {}, config = {}){
  return axios.get('/permission', params);
}

// 获取用户列表
export function getAdminUser(params = {}, config = {}){
  return axios.get('/adminUser', params);
}

// 添加用户
export function addAdminUser(data = {}, params = {}){
  return axios.post('/adminUser', data, params);
}

// 编辑用户
export function editAdminUser(data = {}, params = {}){
  return axios.put(`/adminUser/${data.id}`, data, params);
}

// 删除用户
export function deleteAdminUser(data = {}, params = {}){
  return axios.delete(`/adminUser/${data.id}`, data, params);
}

// 用户信息
export function getAdminUserDetail(data = {}, config = {}){
  return axios.get(`/adminUser/${data.id}`, params);
}


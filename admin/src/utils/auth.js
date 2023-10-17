import Storage from './storage';

const TokenKey = 'ct_user_token';
const UserInfoKey = 'ct_user_userinfo';
const UserSearch = 'ct_history';

export function getToken() {
  return Storage.get(TokenKey);
}

export function setToken(token) {
  Storage.set(TokenKey, token);
}

export function removeToken() {
  Storage.remove(TokenKey);
}

export function setUserInfo(userInfo) {
  Storage.set(UserInfoKey, userInfo);
}

export function getUserInfo() {
  let uInfo = Storage.get(UserInfoKey) || null;
  return uInfo;
}

export function clearUserInfo() {
  Storage.remove(UserInfoKey);
}

export function getCurWatchStockInfo() {
  return Storage.get('CurWatchStock') || null;
}

export function setCurWatchStockInfo(data) {
  Storage.set('CurWatchStock', data);
}

export function getActiveMenuName() {
  return Storage.get('activeMenuName');
}

export function setActiveMenuName(name) {
  Storage.set('activeMenuName', name);
}

export function removeActiveMunuName() {
  Storage.remove('activeMenuName');
}

// 搜索历史 start
export function setSearchHistory(data) {
  Storage.set(UserSearch, data);
}

export function getSearchHistory() {
  return Storage.get(UserSearch);
}

export function removeSearchHistory() {
  Storage.remove(UserSearch);
}
// 搜索历史 end

// 头部公司列表 start
export function setHeaderCompany(data) {
  Storage.set('headerCompany', data);
}

export function getHeaderCompany() {
  return Storage.get('headerCompany');
}

export function removeHeaderCompany() {
  Storage.remove('headerCompany');
}
// 头部公司列表 end

// 登录 start
export function setCTLogin(data) {
  Storage.set('ct_login', data);
}

export function getCTLogin() {
  return Storage.get('ct_login');
}

export function removeCTLogin() {
  Storage.remove('ct_login');
}
// 登录 end
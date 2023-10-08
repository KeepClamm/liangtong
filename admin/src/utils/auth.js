import Storage from './storage';

const TokenKey = 'ct_user_token';
const UserInfoKey = 'ct_user_userinfo';

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
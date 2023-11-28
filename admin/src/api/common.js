import axios from 'axios';
import baseUrl from './config';
import store from '@/store';
import router from '@/router';
import { Message, Loading } from 'element-ui';
const NormalErrorMsg = '网络错误，请稍后重试';

axios.defaults.baseURL = baseUrl.URL_EASYMOCK;
axios.defaults.timeout = 30000;

// request 拦截器
axios.interceptors.request.use(config => {
  const token = store.getters.token;

  // 添加 全局参数
  config.params = Object.assign({}, config.params || {});

  // config.headers['Access-Control-Allow-Origin'] =  '*';
  // config.headers['Access-Control-Allow-Credentials'] =  true;

  if (token) {
    config.headers['Authorization'] =  token ? 'Bearer ' + token : '';
  }

  if (config.showLoading) {
    showFullScreenLoading();
  }

  return config;
}, err => {
  hideFullScreenLoading();
  return Promise.reject(err);
})

// response 拦截器
axios.interceptors.response.use(
  response => {
    hideFullScreenLoading();

    const ErrorMsg = NormalErrorMsg;
    const ErrorCode = Number(response.status);
    const ConfigInfo = response.config;

    if (ErrorCode >= 200 && ErrorCode < 300) {
      return response.data;
    } else {
      if (!ConfigInfo.notToastErr) { // 错误提示是否弹出
        Message({
          message: ErrorMsg,
          type: 'error'
        });
      }

      return Promise.reject({
        data: {
          type: 'error',
          code: ErrorCode,
          message: ErrorMsg
        },
      });
    }
  }, err => {
    hideFullScreenLoading();

    if (err && err.response){
      const Response = err.response;
      const ErrorCode = Response.status;
      const ErrorMsg = Response.data ? Response.data.message || NormalErrorMsg : NormalErrorMsg;
      const ConfigInfo = Response.config;

      switch (ErrorCode) {
        case 401:
        case 403:
          // store.dispatch('LOGOUT').then(res => {
          //   router.replace('/login');
            
          //   Message({
          //     message: '登录超时，请重新登录',
          //     type: 'error'
          //   });
          // });
        break;
        case 404:
        break;
        default:
          if (!ConfigInfo.notToastErr) { // 错误提示是否弹出
            Message({
              message: ErrorMsg,
              type: 'error'
            });
          }
        break;
      }
    }

    return Promise.reject(err.response);
  }
);

// Request loading
let loading;
let needLoadingRequestCount = 0;

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    loading = Loading.service({
      lock: true,
      text: '拼命加载中...',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  }
  
  needLoadingRequestCount ++;
}

function hideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount --;
  if (needLoadingRequestCount === 0) {
    loading.close();
  }
}

export {
  axios,
};
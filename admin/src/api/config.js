// baseUrl
function getBaseUrl() {
  // let origin = window.location.origin;

  // if (!origin || typeof(origin) == "undefined") {
  //   origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  // }
  let origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  // + ':8080'
  // const domainUrl = baseUrl && baseUrl.indexOf('localhost') < 0 ? (baseUrl + '/api') : 'http://information.xueqiusoft.com/api';

  return origin;
}



const currentOrigin = getBaseUrl();
const hasDeloitte = origin && origin.indexOf('deloitte') >= 0;
const hasLocalhost = origin && origin.indexOf('localhost') >= 0;
let domain = hasDeloitte ? currentOrigin : (hasLocalhost ? 'http://47.114.3.239:6808' : currentOrigin);
let baseUrl = domain + '/api';

const DOMAIN_NAME = {
  // URL_EASYMOCK: '', // 测试服 地址
  URL_EASYMOCK: baseUrl
}

export default DOMAIN_NAME

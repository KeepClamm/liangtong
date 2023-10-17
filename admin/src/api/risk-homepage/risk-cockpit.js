const { axios } = require('../common');
// 风险驾驶舱Api
// 风险提示 
export function getRiskWarning() {
    return axios.get(`/risk-cockpit/risk-warning`)
}
// 高危预警
export function getHighRiskAlert(params = {}) {
    return axios({
        url: '/risk-cockpit/high-risk-warning',
        method: 'GET',
        params,
    })
}
// 评级下调
export function getDownGrade(params = {}) {
    return axios({
        url: '/risk-cockpit/rating-reduce',
        method: 'GET',
        params,
    })
}
// 评级上调
export function getUpGrade(params = {}) {
    return axios({
        url: '/risk-cockpit/rating-increase',
        method: 'GET',
        params,
    })
}
// 风险评估分布
export function getRiskment(params = {}) {
    return axios({
        url: '/risk-cockpit/risk-assessment-distribute',
        method: 'GET',
        params,
    })
}
// 财务退市预警
export function getFinancialDlistWarning(params = {}) {
    return axios({
        url: '/risk-cockpit/financial-delisting-warning',
        method: 'GET',
        params,
    })
}
// 交易类退市预警
export function getTradeDlistWarning(params = {}) {
    return axios({
        url: '/risk-cockpit/trading-delisting-warning',
        method: 'GET',
        params,
    })
}
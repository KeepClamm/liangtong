
const Mock = require('mockjs')
const data = [
  {num: '12364898', smallClass: '场外衍生品', name: '国家开发银行', dept: '固定收益部', limitNum: '76000', smallNum: '-76000', curNum: '-18970', nearNum: '3890', mainRisks: '低风险', status: '否'},
  {num: '12473508', smallClass: '场外衍生品', name: '国家开发银行', dept: '固定收益部', limitNum: '76000', smallNum: '-76000', curNum: '-57030', nearNum: '24120', mainRisks: '低风险', status: '否'},
  {num: '12582117', smallClass: '融资融券', name: '深圳前海微众银行股份有限公司', dept: '经纪业务部', limitNum: '4410', smallNum: '-1324', curNum: '-1324', nearNum: '487', mainRisks: '低风险', status: '否'},
  {num: '12690723', smallClass: '股票质押', name: '深圳前海微众银行股份有限公司', dept: '资产管理部', limitNum: '4410', smallNum: '-1539', curNum: '-1539', nearNum: '765', mainRisks: '低风险', status: '否'},
  {num: '12799339', smallClass: '银行间逆回购', name: '深圳前海微众银行股份有限公司', dept: '资产管理部', limitNum: '4410', smallNum: '-537.11', curNum: '-537.11', nearNum: '568', mainRisks: '低风险', status: '否'},
  {num: '12907946', smallClass: '场外衍生品', name: '比亚迪汽车金融有限公司', dept: '固定收益部', limitNum: '6500', smallNum: '-4470.05', curNum: '-4470.05', nearNum: '1450', mainRisks: '中风险', status: '否'},
]
module.exports = [
  {
    url: '/liangtong/same-service/service-detail',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: data
      }
    }
  }
]
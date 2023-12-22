
const Mock = require('mockjs')
let order = ['信用客户A', '信用客户B', '信用客户C', '信用客户D', '信用客户E', '信用客户F', '信用客户G', '信用客户H', '信用客户I', '信用客户J'];
let orderY = ['非信用客户A','非信用客户B', '非信用客户C','非信用客户D', '非信用客户E','非信用客户F', '非信用客户G', '非信用客户H', '非信用客户I', '非信用客户J'];
const creditData = Mock.mock({
  'items|10': [{
    'percentage|1': ['99%', '88%', '100%', '23%'],
    'name|+1': order,
    'outJudge|1': ['AA','AAA','A'],
    'mainRisks|1': ['高风险','低风险'],
    'inJudge|1': ['A-', 'AAA', 'A']
  }]
})
const dataNocredit = Mock.mock({
  'items|10': [{
    'percentage|1': ['99%', '88%', '100%', '23%'],
    'name|+1': orderY,
    'outJudge|1': ['AA','AAA','A'],
    'mainRisks|1': ['高风险','低风险'],
    'inJudge|1': ['A-', 'AAA', 'A']
  }]
})
const serviceData = [
  {num: '123456',stockCode: '1', stockName: '国家开发银行', bigClass: '机构', smallClass: '银行', belong: '中央国有企业', serviceRange: '跨业务', limitNum: '760000000', percentage: '249.67%', mainrisks: '低风险', blackFlag: '否'},
  {num: '125637',stockCode: '2', stockName: '宁波银行股份有限公司', bigClass: '机构', smallClass: '银行', belong: '地方国有企业', serviceRange: '跨业务', limitNum: '290000000', percentage: '77.22%', mainrisks: '低风险', blackFlag: '否'},
  {num: '127818',stockCode: '3', stockName: '中信建投证券股份有限公司', bigClass: '机构', smallClass: '券商', belong: '中央国有企业', serviceRange: '跨业务', limitNum: '799532013', percentage: '103.84%', mainrisks: '低风险', blackFlag: '否'},
  {num: '129999',stockCode: '4', stockName: '正信期货有限公司', bigClass: '机构', smallClass: '期货', belong: '民营企业', serviceRange: '单业务', limitNum: '135000000', percentage: '79.46%', mainrisks: '低风险', blackFlag: '否'},
  {num: '132180', stockCode: '5',stockName: '深圳前海微众银行股份有限公司', bigClass: '机构', smallClass: '银行', belong: '民营企业', serviceRange: '单业务', limitNum: '44100000', percentage: '77.10%', mainrisks: '低风险', blackFlag: '否'},
  {num: '134361',stockCode: '6', stockName: '天虹基金管理有限公司', bigClass: '机构', smallClass: '基金', belong: '民营企业', serviceRange: '跨业务', limitNum: '187000000', percentage: '88.69%', mainrisks: '中风险', blackFlag: '否'},
  {num: '136542',stockCode: '7', stockName: '中国光大银行股份有限公司', bigClass: '机构', smallClass: '银行', belong: '中央国有企业', serviceRange: '跨业务', limitNum: '140000000', percentage: '99.85%', mainrisks: '低风险', blackFlag: '否'},
  {num: '138723', stockCode: '8',stockName: '五矿期货有限公司', bigClass: '机构', smallClass: '期货', belong: '中央国有企业', serviceRange: '单业务', limitNum: '24500000', percentage: '113.07%', mainrisks: '高风险', blackFlag: '否'},
  {num: '140904',stockCode: '9', stockName: '美国友邦保险有限公司', bigClass: '机构', smallClass: '其他金融机构', belong: '外商独资企业', serviceRange: '单业务', limitNum: '105000000', percentage: '93.67%', mainrisks: '中高风险', blackFlag: '否'},
  {num: '143085', stockCode: '10',stockName: '比亚迪汽车金融有限公司', bigClass: '机构', smallClass: '其他金融机构', belong: '民营企业', serviceRange: '跨业务', limitNum: '65000000', percentage: '68.77%', mainrisks: '中风险', blackFlag: '否'},
]
//status: 0 待审核 1 审核不通过 2 审核通过
const blacklist = [
  {name: 'test1', code: '21312313', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '1221000', sDate: '2023/08/09', eDate: '2023/09/22', status: 0},
  {name: 'test2', code: '77432111', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '5631000', sDate: '2023/08/19', eDate: '2023/09/12', status: 1},
  {name: 'test3', code: '12789033', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '2321200', sDate: '2023/08/02', eDate: '2023/10/09', status: 2},
  {name: 'test4', code: '90532221', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '8621250', sDate: '2023/08/01', eDate: '2023/09/02', status: 1},
  {name: 'test5', code: '36883232', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '9821000', sDate: '2023/08/09', eDate: '2023/09/27', status: 0},
  {name: 'test6', code: '24574345', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '2321000', sDate: '2023/08/09', eDate: '2023/09/25', status: 2},
  {name: 'test6', code: '24574345', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '2321000', sDate: '2023/08/09', eDate: '2023/09/25', status: 1},
  {name: 'test6', code: '24574345', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '2321000', sDate: '2023/08/09', eDate: '2023/09/25', status: 0},
  {name: 'test6', code: '24574345', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '2321000', sDate: '2023/08/09', eDate: '2023/09/25', status: 1},
  {name: 'test6', code: '24574345', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '2321000', sDate: '2023/08/09', eDate: '2023/09/25', status: 2},
  {name: 'test6', code: '24574345', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '2321000', sDate: '2023/08/09', eDate: '2023/09/25', status: 2},
]

const relationDetail = [
  {relaClient: '中华人民共和国财政部', relaType: '股东', rate: '36.54%', mainrisk: '低风险', qualition: '机关机构', sector: '机关单位', creditTask: '无', scale: '-', status: 2},
  {relaClient: '中央汇金投资有限责任公司', relaType: '股东', rate: '34.69%', mainrisk: '低风险', qualition: '中央国有企业', sector: '金融业', creditTask: '无', scale: '-', status: 2},
  {relaClient: '梧桐树投资平台有限责任公司', relaType: '股东', rate: '27.19%', mainrisk: '低风险', qualition: '中央国有企业', sector: '金融业', creditTask: '无', scale: '-', status: 2},
  {relaClient: '全国社会保障基金理事会', relaType: '股东', rate: '1.59%', mainrisk: '低风险', qualition: '机关机构', sector: '事业单位', creditTask: '无', scale: '-', status: 2},
  {relaClient: '海南航空控股股份有限公司', relaType: '对外投资', rate: '2.07%', mainrisk: '低风险', qualition: '民营企业', sector: '航空运输', creditTask: '有', scale: '20000000', status: 2},
  {relaClient: '重庆燃气股份集团有限公司', relaType: '对外投资', rate: '5.15%	', mainrisk: '低风险', qualition: '地方国有企业', sector: '燃气', creditTask: '无', scale: '-', status: 2},
  {relaClient: '吉林吉恩镍业股份有限公司', relaType: '对外投资', rate: '5.95%', mainrisk: '低风险', qualition: '民营企业', sector: '机关单位', creditTask: '有', scale: '25000000', status: 2},
  {relaClient: '国开金融有限责任公司', relaType: '对外投资', rate: '100%', mainrisk: '低风险', qualition: '中央国有企业', sector: '其他金融机构', creditTask: '无', scale: '-', status: 2},
  {relaClient: '云南祥云飞龙再生科技股份有限公司', relaType: '对外担保', rate: '', mainrisk: '中风险', qualition: '民营企业', sector: '工业与商业服务', creditTask: '无', scale: '-', status: 2},
]
module.exports = [
  {
    url: '/liangtong/same-client/same-client-top-credit',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: creditData
      }
    }
  },
  {
    url: '/liangtong/same-client/same-client-top-non-credit',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: dataNocredit
      }
    }
  },
  {
    url: '/liangtong/same-client/same-client-service-risk',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: serviceData
      }
    }
  },
  {
    url: '/liangtong/same-client/default-blacklists',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: blacklist
      }
    }
  },
  {
    url: '/liangtong/same-client/relation-detail',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: relationDetail
      }
    }
  },
]
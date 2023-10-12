
import Layout from '@/layout'

export default [
  {
    path: '/risk-home',
    name: 'RiskHome',
    component: Layout,
    meta: {
      title: '风险首页',
      icon: 'ComparisonOfPeers'
    },
    redirect: '/risk-home/risk-cockpit',
    header: true,
    children: [
      {
        path: '/risk-home/risk-cockpit',
        name: 'RiskCockpit',
        component: () => import('@/views/risk-home/risk-cockpit/index'),
        meta: {
          title: '风险驾驶舱'
        }
      },
      {
        path: '/risk-home/individual-stocks',
        component: () => import('@/views/risk-home/individual-stock-query/index'),
        meta: {
          title: '个股查询',
          icon: 'ComparisonOfPeers',
        },
        redirect: '/risk-home/individual-stocks/risk-inquiry',
        children: [
          {
            path: '/risk-home/individual-stocks/risk-inquiry',
            name: 'RiskInquiry',
            component: () => import('@/views/risk-home/individual-stock-query/risk-inquiry/index'),
            meta: {
              title: '个股风险查询',
            }
          },
          {
            path: '/risk-home/individual-stocks/equity-inquiry',
            name: 'EquityInquiry',
            component: () => import('@/views/risk-home/individual-stock-query/equity-inquiry/index'),
            meta: {
              title: '个股权益查询',
            }
          },
          {
            path: '/risk-home/individual-stocks/oncentration-query',
            name: 'ConcentrationControl',
            component: () => import('@/views/risk-home/individual-stock-query/concentration-query/index'),
            meta: {
              title: '个股集中控制度查询',
            }
          },
          {
            path: '/risk-home/individual-stocks/risk-fluctuation',
            name: 'RiskFluctuation',
            component: () => import('@/views/risk-home/individual-stock-query/risk-fluctuation/index'),
            meta: {
              title: '风险波动概览',
            }
          },
          {
            path: '/risk-home/individual-stocks/risk-indicator',
            name: 'RiskIndicator',
            component: () => import('@/views/risk-home/individual-stock-query/risk-indicator/index'),
            meta: {
              title: '风险指标详情',
            }
          },
          {
            path: '/risk-home/individual-stocks/public-sentiment',
            name: 'PublicSentiment',
            component: () => import('@/views/risk-home/individual-stock-query/public-sentiment/index'),
            meta: {
              title: '个股舆情预警',
            }
          },
        ]
      },
      {
        path: '/risk-home/peer-comparison',
        name: 'PeerComparison',
        component: () => import('@/views/risk-home/peer-comparison/index'),
        meta: {
          title: '同业对比'
        },
        children: [
          {
            path: '/risk-home/peer-comparison/finance-bid',
            name: 'FinanceBid',
            component: () => import('@/views/risk-home/peer-comparison/finance-bid'),
            meta: {
              title: '融资标的查询'
            }
          },
          {
            path: '/risk-home/peer-comparison/margin-auction',
            name: 'MarginAuction',
            component: () => import('@/views/risk-home/peer-comparison/margin-auction'),
            meta: {
              title: '融券标的查询'
            }
          },
          {
            path: '/risk-home/peer-comparison/deductible-deposit',
            name: 'DeductibleDeposit',
            component: () => import('@/views/risk-home/peer-comparison/deductible-deposit'),
            meta: {
              title: '可充抵保证金查询'
            },
            children: [
              {
                path: '/risk-home/peer-comparison/deductible-deposit/conversion-rate',
                name: 'ConversionRate',
                component: () => import('@/views/risk-home/peer-comparison/deductible-deposit/conversion-rate'),
                meta: {
                  title: '折算率查询'
                }
              },
              {
                path: '/risk-home/peer-comparison/deductible-deposit/concentration-degree',
                name: 'ConcentrationDegree',
                component: () => import('@/views/risk-home/peer-comparison/deductible-deposit/concentration-degree'),
                meta: {
                  title: '集中度查询'
                }
              }
            ]
          },
          {
            path: '/risk-home/peer-comparison/statistical-analysis',
            name: 'StatisticalAnalysis',
            component: () => import('@/views/risk-home/peer-comparison/statistical-analysis'),
            meta: {
              title: '统计分析'
            }
          }
        ]
      }
    ]
  },
]

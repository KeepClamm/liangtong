import Layout from '@/layout'

export default [
  {
    path: '/risk-home',
    component: Layout,
    meta: {
      title: '风险首页',
      icon: 'ComparisonOfPeers'
    },
    redirect: '/risk-home/risk-cockpit',
    children: [{
      path: 'risk-cockpit',
      name: 'RiskCockpit',
      component: () => import('@/views/risk-home/risk-cockpit/index'),
      meta: {
        title: '风险驾驶舱'
      }
    },
    {
      path: 'individual-stock-query',
      name: 'IndividualStockQuery',
      component: () => import('@/views/risk-home/individual-stock-query/index'),
      meta: {
        title: '个股查询'
      }
    },
    {
      path: 'peer-comparison',
      name: 'PeerComparison',
      component: () => import('@/views/risk-home/peer-comparison/index'),
      meta: {
        title: '同业对比'
      },
      children: [
        {
          path: 'finance-bid',
          name: 'FinanceBid',
          component: () => import('@/views/risk-home/peer-comparison/finance-bid'),
          meta: {
            title: '融资标的查询'
          }
        },
        {
          path: 'margin-auction',
          name: 'MarginAuction',
          component: () => import('@/views/risk-home/peer-comparison/margin-auction'),
          meta: {
            title: '融券标的查询'
          }
        },
        {
          path: 'deductible-deposit',
          name: 'DeductibleDeposit',
          component: () => import('@/views/risk-home/peer-comparison/deductible-deposit'),
          meta: {
            title: '可充抵保证金查询'
          },
          children: [
            {
              path: 'conversion-rate',
              name: 'ConversionRate',
              component: () => import('@/views/risk-home/peer-comparison/deductible-deposit/conversion-rate'),
              meta: {
                title: '折算率查询'
              }
            },
            {
              path: 'concentration-degree',
              name: 'ConcentrationDegree',
              component: () => import('@/views/risk-home/peer-comparison/deductible-deposit/concentration-degree'),
              meta: {
                title: '集中度查询'
              }
            }
          ]
        },
        {
          path: 'statistical-analysis',
          name: 'StatisticalAnalysis',
          component: () => import('@/views/risk-home/peer-comparison/statistical-analysis'),
          meta: {
            title: '统计分析'
          }
        }
      ]
    }]
  }
]

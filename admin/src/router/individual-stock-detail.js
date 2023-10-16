import Layout from '@/layout';

export default [
  {
    path: '/individual-stock-detail',
    name: 'IndividualStockDetail',
    component: Layout,
    meta: {
      title: '个股详情'
    },
    header: true,
    hidden: true,
    redirect: '/individual-stock-detail/risk-fluctuation',
    children: [
      {
        path: '/individual-stock-detail/risk-fluctuation',
        name: 'RiskFluctuation',
        component: () => import('@/views/risk-home/individual-stock-query/risk-fluctuation/index'),
        meta: {
          title: '风险波动概览',
        },
      },
      {
        path: '/individual-stock-detail/risk-indicator',
        name: 'RiskIndicator',
        component: () => import('@/views/risk-home/individual-stock-query/risk-indicator/index'),
        meta: {
          title: '风险指标详情',
        }
      },
      {
        path: '/individual-stock-detail/public-sentiment',
        name: 'PublicSentiment',
        component: () => import('@/views/risk-home/individual-stock-query/public-sentiment/index'),
        meta: {
          title: '个股舆情预警',
        }
      },
    ]
  }
]
import Layout from '@/layout'

export default [
  {
    path: '/centralized-control',
    component: Layout,
    meta: {
      title: '集中度管控',
      icon: 'ComparisonOfPeers'
    },
    redirect: '/centralized-control/underlying-query',
    children: [{
      path: 'underlying-query',
      name: 'UnderlyingQuery',
      component: () => import('@/views/centralized-control/underlying-query'),
      meta: {
        title: '标的券查询'
      },
      children: [
        {
          path: 'collateral-securities',
          name: 'CollateralSecurities',
          component: () => import('@/views/centralized-control/underlying-query/collateral-securities'),
          meta: {
            title: '两融标的证券'
          }
        },
        {
          path: 'tender-securities',
          name: 'TenderSecurities',
          component: () => import('@/views/centralized-control/underlying-query/tender-securities'),
          meta: {
            title: '担保品证券'
          }
        }
      ]
    },
    {
      path: 'underlying-manage',
      name: 'UnderlyingManage',
      component: () => import('@/views/centralized-control/underlying-manage'),
      meta: {
        title: '标的券管理'
      },
      children: [
        {
          path: 'adjustment-detail',
          name: 'AdjustmentDetail',
          component: () => import('@/views/centralized-control/underlying-manage/adjustment-detail'),
          meta: {
            title: '今日调整明细'
          }
        },
        {
          path: 'underlying-adjust',
          name: 'UnderlyingAdjust',
          component: () => import('@/views/centralized-control/underlying-manage/underlying-adjust'),
          meta: {
            title: '标的券调整'
          }
        },
        {
          path: 'adjust-query',
          name: 'AdjustQuery',
          component: () => import('@/views/centralized-control/underlying-manage/adjust-query'),
          meta: {
            title: '调整查询'
          }
        }
      ]
    },
    {
      path: 'attention-pool',
      name: 'AttentionPool',
      component: () => import('@/views/centralized-control/attention-pool'),
      meta: {
        title: '关注池'
      }
    }
    ]
  }
]

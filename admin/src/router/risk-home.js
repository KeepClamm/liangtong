
import Layout from '@/layout';

export default [
  {
    path: '/risk-home',
    name: 'RiskHome',
    component: Layout,
    meta: {
      title: '信用风险管理系统',
      icon: 'ComparisonOfPeers'
    },
    redirect: '/risk-home/same-client',
    header: true,
    children: [
      {
        path: '/risk-home/same-client',
        name: 'SameClient',
        component: () => import('@/views/risk-home/same-client/index'),
        meta: {
          title: '同一客户管理'
        }
      },
      {
        path: '/risk-home/same-service',
        name: 'SameService',
        component: () => import('@/views/risk-home/same-service/index'),
        meta: {
          title: '同一业务管理'
        }
      },
      {
        path: '/risk-home/defaults-blacklists',
        name: 'DefaultsBlacklists',
        component: () => import('@/views/risk-home/defaults-blacklist/index'),
        meta: {
          title: '违约及黑名单'
        }
      },
      {
        path: '/risk-home/client-detail',
        name: 'ClientDetail',
        component: () => import('@/views/risk-home/client-detail/index'),
      },
      {
        path: '/risk-home/company-relation-detail',
        name: 'CompanyRelationDetail',
        component: () => import('@/views/risk-home/company-relation-detail/index'),
      },
      {
        path: '/risk-home/negative-sentiment',
        name: 'NegativeSentiment',
        component: () => import('@/views/risk-home/negative-sentiment/index'),
      },
    ]
  },
]

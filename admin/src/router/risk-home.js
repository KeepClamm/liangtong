
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
    redirect: '/risk-home/same-client/same-client',
    header: true,
    children: [
      {
        path: '/risk-home/same-client',
        component: () => import('@/views/risk-home/same-client/index'),
        meta: {
          title: '同一客户管理'
        },
        children: [
          {
            path: '/risk-home/same-client/same-client',
            name: 'SameClient',
            component: () => import('@/views/risk-home/same-client/same-client/index'),
            meta: {
              title: '单一客户管理'
            },
          },
          {
            path: '/risk-home/same-client/group-manage',
            name: 'GroupManage',
            component: () => import('@/views/risk-home/same-client/group-manage/index'),
            meta: {
              title: '同一客户群组管理'
            }
          },
          {
            path: '/risk-home/same-client/relation-manage',
            name: 'RelationManage',
            component: () => import('@/views/risk-home/same-client/relation-manage/index'),
            meta: {
              title: '关联关系管理'
            }
          },
          {
            path: '/risk-home/client-detail',
            name: 'ClientDetail',
            component: () => import('@/views/risk-home/client-detail/index'),
            meta: {
              title: '详情'
            },
            hidden: true
          },
        ]
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
        path: '/risk-home/company-relation-detail',
        name: 'CompanyRelationDetail',
        component: () => import('@/views/risk-home/company-relation-detail/index'),
      },
      {
        path: '/risk-home/negative-sentiment',
        name: 'NegativeSentiment',
        component: () => import('@/views/risk-home/negative-sentiment/index'),
      },
      {
        path: '/risk-home/same-client-query',
        name: 'SameClientQuery',
        component: () => import('@/views/risk-home/same-client/same-client-query'),
        meta: {
          title: '主体业务及风险一览表',
        },
        hidden: true
      },
    ]
  },
]

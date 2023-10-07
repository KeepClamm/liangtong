import Layout from '@/layout';

export default [
  {
    path: '/risk-home',
    component: Layout,
    meta: {
      title: '风险首页',
      icon: 'ComparisonOfPeers',
    },
    redirect: '/risk-home/risk-cockpit',
    children: [{
      path: 'risk-cockpit',
      name: 'RiskCockpit',
      component: () => import('@/views/risk-home/risk-cockpit/index'),
      meta: {
        title: '风险驾驶舱',
      }
    },
    {
      path: 'individual-stock-query',
      name: 'IndividualStockQuery',
      component: () => import('@/views/risk-home/individual-stock-query/index'),
      meta: {
        title: '个股查询',
      }
    },
    {
      path: 'peer-comparison',
      name: 'PeerComparison',
      component: () => import('@/views/risk-home/peer-comparison/index'),
      meta: {
        title: '同业对比',
      }
    }]
  },
];
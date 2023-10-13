import Layout from '@/layout';

export default [
  {
    path: '/search',
    name: 'Search',
    component: Layout,
    hidden: true,
    meta: {
      title: '搜索',
      sidebarHidden: true,
    },
    redirect: '/search/home',
    children: [
      {
        path: '/search/home',
        name: 'SearchHome',
        meta: {
          title: '搜索',
          sidebarHidden: true,
        },
        component: () => import('@/views/search/index'),
      }
    ]
    
  }
]
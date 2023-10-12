import Layout from '@/layout';

export default [
  {
    path: '/opinion-monitor',
    component: Layout,
    meta: {
      title: '舆情监控',
    },
    redirect: '/opinion-monitor/role',
    children: [
      {
        path: '/today',
        name: 'TodayOpinionMonitor',
        component: () => import('@/views/opinion-monitoring/today-monitor/index'),
        meta: {
          title: '今日舆情'
        }
      },
      {
        path: '/history',
        name: 'HistoryOpinionMonitor',
        component: () => import('@/views/opinion-monitoring/history-monitor/index'),
        meta: {
          title: '历史舆情回溯'
        }
      }
    ]
  }
]
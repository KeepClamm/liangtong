import Layout from '@/layout';

export default [
  {
    path: '/opinion-monitor',
    name: 'OpinionMonitor',
    component: Layout,
    header: true,
    meta: {
      title: '舆情监控',
    },
    redirect: '/opinion-monitor/today',
    children: [
      {
        path: '/opinion-monitor/today',
        name: 'TodayOpinionMonitor',
        component: () => import('@/views/opinion-monitoring/today-monitor/index'),
        meta: {
          title: '今日舆情'
        }
      },
      {
        path: '/opinion-monitor/history',
        name: 'HistoryOpinionMonitor',
        component: () => import('@/views/opinion-monitoring/history-monitor/index'),
        meta: {
          title: '历史舆情回溯'
        }
      }
    ]
  }
]
import Layout from '@/layout';

export default [
  {
    path: '/authority-management',
    name: 'AuthorityManagement',
    component: Layout,
    meta: {
      title: '权限管理',
    },
    header: true,
    redirect: '/authority-management/role',
    children: [
      {
        path: '/authority-management/role',
        name: 'authorityManagementRole',
        component: () => import('@/views/authority-management/role/index'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: '/authority-management/user',
        name: 'authorityManagementUser',
        component: () => import('@/views/authority-management/user/index'),
        meta: {
          title: '用户管理'
        }
      }
    ]
  }
]
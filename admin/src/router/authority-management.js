import Layout from '@/layout';

export default [
  {
    path: '/authority-management',
    name: 'AuthorityManagement',
    component: Layout,
    meta: {
      title: '权限管理',
      code: '/authority-management',
    },
    header: true,
    redirect: '/authority-management/role',
    children: [
      {
        path: '/authority-management/role',
        name: 'authorityManagementRole',
        component: () => import('@/views/authority-management/role/index'),
        meta: {
          title: '角色管理',
          code: '/authority-management/role',
          roles: [
            {code: '/authority-management/role/view',label: '查看',},
            {code: '/authority-management/role/addRoles',label: '添加角色',}
          ]
        }
      },
      {
        path: '/authority-management/user',
        name: 'authorityManagementUser',
        component: () => import('@/views/authority-management/user/index'),
        meta: {
          title: '用户管理',
          code: '/authority-management/user',
          roles: [
            {code: '/authority-management/user/view',label: '查看',},
            {code: '/authority-management/user/addRoles',label: '添加用户',}
          ]
        }
      }
    ]
  }
]
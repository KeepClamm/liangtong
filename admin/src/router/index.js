import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Layout from '@/layout'
import riskHome from './risk-home'
import centralizedControl from './centralized-control'
import opinionMonitoring from "./opinion-monitoring"
import authorityManagement from './authority-management'
// risk-home
// opinion-monitoring
// authority-management
// centralized-control

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]

export const asyncRoutes = [
  ...riskHome,
  ...centralizedControl,
  ...opinionMonitoring,
  ...authorityManagement,
  // 404 page must be placed at the end !!!
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // },
]

// 导出权限树
// console.log(JSON.stringify(convert(asyncRoutes)));
// function convert(arr) {
//   return arr.reduce((acc, cur) => {
//     let obj = {
//       label: cur.meta.title,
//       code: cur.meta.code
//     }
//     if (cur.children) {
//       obj.children = convert(cur.children);
//     } else if (cur.meta.roles && cur.meta.roles.length > 0) {
//       obj.children = cur.meta.roles;
//     }

//     acc.push(obj);
//     return acc;
//   }, []);
// }

const createRouter = () => new Router({
  mode: 'history', // require service support
  base: 'app',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

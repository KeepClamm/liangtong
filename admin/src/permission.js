import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login', '/user-protocol']; // no redirect whitelist
const hasRolesWhiteList = ['/','/login', '/user-protocol'];


function getToRouter(to) {
  if (to.children && to.children.length > 0) {
    return getToRouter(to.children[0]);
  }

  return to;
}

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  console.log('hasToken', hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      if (hasRoles) {
        next()
      } else {
        try {
          const { rolesList } = await store.dispatch('getLoginUserInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', rolesList)
          const toRoute = to && to.path && hasRolesWhiteList.indexOf(to.path) < 0 ? to : getToRouter(accessRoutes[0]);

          router.addRoutes(accessRoutes);
          next({ ...toRoute, replace: true });
        } catch (error) {
          store.dispatch('LOGOUT').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })

          NProgress.done();
        }
      }
    }
  } else {
    console.log('11111111111')
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      next({ path: '/login', replace: true });
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

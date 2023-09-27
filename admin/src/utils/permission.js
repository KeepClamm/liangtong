import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(roleValue) {
  const roles = store.getters && store.getters.roles

  if (roles && roles[0] === 'admin') {
    return true
  } else if (roleValue) {
    var roleList = [];

    if (roleValue instanceof Array) {
      roleList = roleValue;
    } else {
      roleList.push(roleValue);
    }

    const permissionRoles = roleList
    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    // console.error('没有相关权限');
    return false
  }
}

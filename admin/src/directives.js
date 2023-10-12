
import store from './store';

const directives = [{
  name: 'permission',
  value: {
    inserted: function (el, binding) {
      const roles = store.getters.roles;
      const isAdmin = roles && roles.length > 0 ? roles[0] == 'admin' : false;
      console.log("---获取的权限内容----");
      console.log(roles);
      console.log(binding.value);

      if (isAdmin) {
        // el.parentNode.removeChild(el)
      } else {
        
      }
      // const hasPer = CommonUtils.checkHasThisPermission(binding.value);

      // if (!hasPer) {
      //   el.parentNode.removeChild(el)
      // }
    }
  }
}];

export const useDirectives = (vue) => {
  directives.forEach(directive => vue.directive(directive.name, directive.value))
}

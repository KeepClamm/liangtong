
import store from './store';

function hasPermisstion(name) {
  const roles = store.getters.roles;
  const isAdmin = roles && roles.length > 0 ? roles[0] == 'admin' : false;
  let hasStatus = false;

  if (isAdmin) {
    hasStatus = true;
  } else {
    hasStatus = roles.indexOf(name) >= 0;
  }

  return hasStatus;
}

const directives = [{
  name: 'permission',
  value: {
    inserted: function (el, binding) {
      const hasStatus = hasPermisstion(binding.value);

      if (hasStatus) {

      } else {
        el.parentNode.removeChild(el);
      }
    }
  }
}];

const useDirectives = (vue) => {
  directives.forEach(directive => vue.directive(directive.name, directive.value))
}

export {
  useDirectives,
  hasPermisstion
}

import { Perms } from './permissions';

let permissions = Object.keys(Perms);

const hasPermissions = (perm) => {
  if (Array.isArray(perm)) {
      return perm.find(e => permissions.indexOf(e) != -1);
  } else {
      return permissions.indexOf(perm) != -1;
  }
}

const getPermissions = () => {
  return Perms;
}

export default {
  hasPermissions,
  getPermissions
}

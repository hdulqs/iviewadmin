
let sysApis = {
  sys: {
    dashboard: {
      sellStatistic: 'sys/dashboard/sellStatistic',
      sellTarget: 'sys/dashboard/sellTarget',
      xboxInStock: 'sys/dashboard/xboxInStock',
      ps4InStock: 'sys/dashboard/ps4InStock'
    },
    system: {
      save: 'sys/system/save',
      update: 'sys/system/update',
      delete: 'sys/system/delete',
      get: 'sys/system/get',
      find: 'sys/system/find'
    },
    module: {
      save: 'sys/module/save',
      update: 'sys/module/update',
      delete: 'sys/module/delete',
      get: 'sys/module/get',
      find: 'sys/module/find'
    },
    resource: {
      save: 'sys/resource/save',
      update: 'sys/resource/update',
      delete: 'sys/resource/delete',
      get: 'sys/resource/get',
      find: 'sys/resource/find'
    },
    menu: {
      save: 'sys/menu/save',
      update: 'sys/menu/update',
      delete: 'sys/menu/delete',
      get: 'sys/menu/get',
      find: 'sys/menu/find',
      tree: 'sys/menu/tree'
    },
    org: {
      save: 'sys/org/save',
      update: 'sys/org/update',
      delete: 'sys/org/delete',
      get: 'sys/org/get',
      find: 'sys/org/find'
    },
    group: {
      save: 'sys/group/save',
      update: 'sys/group/update',
      delete: 'sys/group/delete',
      get: 'sys/group/get',
      find: 'sys/group/find'
    },
    role: {
      save: 'sys/role/save',
      update: 'sys/role/update',
      delete: 'sys/role/delete',
      get: 'sys/role/get',
      find: 'sys/role/find'
    },
    user: {
      save: 'sys/user/register',
      update: 'sys/user/update',
      delete: 'sys/user/delete',
      get: 'sys/user/get',
      find: 'sys/user/find',
      lockOrUnlock: 'sys/user/lockOrUnlock',
      grantGroup: 'sys/user/grantGroup'
    },
    syslog: {
      find: 'sys/syslog/find',
      get: 'sys/syslog/get'
    },
    tokens: {
      login: 'tokens/login',
      refresh: 'tokens/refresh'
    }
  }
};

export default sysApis;

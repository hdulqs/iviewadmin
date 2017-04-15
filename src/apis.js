
let root = 'http://localhost:8888'
let sysApis = {
  sys: {
    dashboard: {
      sellStatistic: root + '/sys/dashboard/sellStatistic',
      sellTarget: root + '/sys/dashboard/sellTarget',
      xboxInStock: root + '/sys/dashboard/xboxInStock',
      ps4InStock: root + '/sys/dashboard/ps4InStock'
    },
    system: {
      save: root + '/sys/system/save',
      update: root + '/sys/system/update',
      delete: root + '/sys/system/delete',
      get: root + '/sys/system/get',
      find: root + '/sys/system/find'
    },
    module: {
      save: root + '/sys/module/save',
      update: root + '/sys/module/update',
      delete: root + '/sys/module/delete',
      get: root + '/sys/module/get',
      find: root + '/sys/module/find'
    },
    resource: {
      save: root + '/sys/resource/save',
      update: root + '/sys/resource/update',
      delete: root + '/sys/resource/delete',
      get: root + '/sys/resource/get',
      find: root + '/sys/resource/find'
    },
    menu: {
      save: root + '/sys/menu/save',
      update: root + '/sys/menu/update',
      delete: root + '/sys/menu/delete',
      get: root + '/sys/menu/get',
      find: root + '/sys/menu/find'
    },
    org: {
      save: root + '/sys/org/save',
      update: root + '/sys/org/update',
      delete: root + '/sys/org/delete',
      get: root + '/sys/org/get',
      find: root + '/sys/org/find'
    },
    group: {
      save: root + '/sys/group/save',
      update: root + '/sys/group/update',
      delete: root + '/sys/group/delete',
      get: root + '/sys/group/get',
      find: root + '/sys/group/find'
    },
    role: {
      save: root + '/sys/role/save',
      update: root + '/sys/role/update',
      delete: root + '/sys/role/delete',
      get: root + '/sys/role/get',
      find: root + '/sys/role/find'
    },
    user: {
      save: root + '/sys/user/save',
      update: root + '/sys/user/update',
      delete: root + '/sys/user/delete',
      get: root + '/sys/user/get',
      find: root + '/sys/user/find'
    }
  }
}

export default sysApis

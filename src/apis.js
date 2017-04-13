
let root = 'http://localhost:8888'
let sysApis = {
  sys: {
    dashboard: {
      sellStatistic: root + '/dashboard/sellStatistic',
      sellTarget: root + '/dashboard/sellTarget',
      xboxInStock: root + '/dashboard/xboxInStock',
      ps4InStock: root + '/dashboard/ps4InStock'
    },
    system: {
      save: root + '/system/save',
      update: root + '/system/update',
      delete: root + '/system/delete',
      get: root + '/system/get',
      find: root + '/system/find'
    },
    module: {
      save: root + '/module/save',
      update: root + '/module/update',
      delete: root + '/module/delete',
      get: root + '/module/get',
      find: root + '/module/find'
    },
    resource: {
      save: root + '/resource/save',
      update: root + '/resource/update',
      delete: root + '/resource/delete',
      get: root + '/resource/get',
      find: root + '/resource/find'
    },
    menu: {
      save: root + '/menu/save',
      update: root + '/menu/update',
      delete: root + '/menu/delete',
      get: root + '/menu/get',
      find: root + '/menu/find'
    },
    org: {
      save: root + '/org/save',
      update: root + '/org/update',
      delete: root + '/org/delete',
      get: root + '/org/get',
      find: root + '/org/find'
    },
    group: {
      save: root + '/group/save',
      update: root + '/group/update',
      delete: root + '/group/delete',
      get: root + '/group/get',
      find: root + '/group/find'
    },
    role: {
      save: root + '/role/save',
      update: root + '/role/update',
      delete: root + '/role/delete',
      get: root + '/role/get',
      find: root + '/role/find'
    },
    user: {
      save: root + '/user/save',
      update: root + '/user/update',
      delete: root + '/user/delete',
      get: root + '/user/get',
      find: root + '/user/find'
    }
  }
}

export default sysApis

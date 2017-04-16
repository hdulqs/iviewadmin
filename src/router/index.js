import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '@/views/404'
import Dashboard from '@/views/admin/Dashboard'
import GroupIndex from '@/views/admin/group/Index'
import MenuIndex from '@/views/admin/menu/Index'
import ResourceIndex from '@/views/admin/resource/Index'
import SystemIndex from '@/views/admin/system/Index'
import ModuleIndex from '@/views/admin/module/Index'
import OrgIndex from '@/views/admin/org/Index'
import RoleIndex from '@/views/admin/role/Index'
import UserIndex from '@/views/admin/user/Index'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/sys/group',
      name: 'sys.group.index',
      component: GroupIndex
    },
    {
      path: '/sys/menu',
      name: 'sys.menu.index',
      component: MenuIndex
    },
    {
      path: '/sys/resource',
      name: 'sys.resource.index',
      component: ResourceIndex
    },
    {
      path: '/sys/system',
      name: 'sys.system.index',
      component: SystemIndex
    },
    {
      path: '/sys/module',
      name: 'sys.module.index',
      component: ModuleIndex
    },
    {
      path: '/sys/org',
      name: 'sys.org.index',
      component: OrgIndex
    },
    {
      path: '/sys/role',
      name: 'sys.role.index',
      component: RoleIndex
    },
    {
      path: '/sys/user',
      name: 'sys.user.index',
      component: UserIndex
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    }
  ]
})

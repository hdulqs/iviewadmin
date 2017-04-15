import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '@/views/404'
import Dashboard from '@/views/admin/Dashboard'
import GroupIndex from '@/views/admin/group/Index'
import MenuIndex from '@/views/admin/menu/Index'
import ResourceIndex from '@/views/admin/resource/Index'
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
      path: '*',
      name: 'notFound',
      component: NotFound
    }
  ]
})

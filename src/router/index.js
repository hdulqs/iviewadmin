import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '@/views/404'
import Dashboard from '@/views/admin/Dashboard'
import GroupIndex from '@/views/admin/group/Index'
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
      path: '*',
      name: 'notFound',
      component: NotFound
    }
  ]
})

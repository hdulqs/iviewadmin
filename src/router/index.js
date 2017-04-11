import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '@/views/404'
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
      path: '*',
      name: 'notFound',
      component: NotFound
    }
  ]
})

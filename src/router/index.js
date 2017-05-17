import Vue from 'vue';
import Router from 'vue-router';
import iView from 'iview';

import Layout from '@/components/Layout';

import NotFound from '@/views/404';
import Dashboard from '@/views/admin/Dashboard';
import GroupIndex from '@/views/admin/group/Index';
import MenuIndex from '@/views/admin/menu/Index';
import ResourceIndex from '@/views/admin/resource/Index';
import SystemIndex from '@/views/admin/system/Index';
import ModuleIndex from '@/views/admin/module/Index';
import OrgIndex from '@/views/admin/org/Index';
import RoleIndex from '@/views/admin/role/Index';
import UserIndex from '@/views/admin/user/Index';
import Login from '@/views/admin/user/Login';
import SyslogIndex from '@/views/admin/syslog/Index';
import Hello from '@/components/Hello';
import UnAuth from '@/views/401';

Vue.use(Router);
Vue.use(iView);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: '用户登录',
      component: Login
    },
    {
      path: '/401',
      name: '无权访问',
      component: UnAuth
    },
    {
      path: '/',
      name: '欢迎页',
      component: Layout,
      redirect: '/hello',
      children: [
        { path: 'hello', component: Hello }
      ],
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/sys',
      name: '基础系统',
      component: Layout,
      redirect: '/sys/dashboard',
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'dashboard',
          name: '仪表盘',
          component: Dashboard
        },
        {
          path: 'group',
          name: '用户组管理',
          component: GroupIndex
        },
        {
          path: 'menu',
          name: '系统菜单管理',
          component: MenuIndex
        },
        {
          path: 'resource',
          name: '系统资源管理',
          component: ResourceIndex
        },
        {
          path: 'system',
          name: '系统组成管理',
          component: SystemIndex
        },
        {
          path: 'module',
          name: '系统模块管理',
          component: ModuleIndex
        },
        {
          path: 'org',
          name: '机构管理',
          component: OrgIndex
        },
        {
          path: 'role',
          name: '角色管理',
          component: RoleIndex
        },
        {
          path: 'user',
          name: '用户管理',
          component: UserIndex
        },
        {
          path: 'syslog',
          name: '系统日志管理',
          component: SyslogIndex
        }
      ]
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
});

// 权限验证
function requireAuth (to, from, next) {
  if (localStorage.getItem('Authorization') === null) {
    // TODO 简单检测用户是否登录、是否有权限，未登录跳转到登录页面，没权限提示无权访问
    next('/401');
  } else {
    let toPath = to.path;
    let fromPath = from.path;
    console.log(`to: ${toPath} from: ${fromPath}`);
    next();
  }
}
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  // let user = localStorage.getItem('user');
  if (!to.meta.requireAuth) {
    next();
  }
  let token = sessionStorage.getItem('Authorization');
  if (!token) {
    next('/login');
  }
  if (to.meta.requireAuth) {
    requireAuth(to, from, next);
  }
  next();
});
router.afterEach(route => {
  iView.LoadingBar.finish();
  console.log(`成功浏览到: ${route.path}`);
});

export default router;

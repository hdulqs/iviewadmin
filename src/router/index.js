import Vue from 'vue';
import Router from 'vue-router';
import iView from 'iview';

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
import SyslogIndex from '@/views/admin/syslog/Index';
import Hello from '@/components/Hello';

Vue.use(Router);
Vue.use(iView);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/sys/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/sys/group',
      name: 'sys.group.index',
      component: GroupIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/sys/menu',
      name: 'sys.menu.index',
      component: MenuIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/sys/resource',
      name: 'sys.resource.index',
      component: ResourceIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/sys/system',
      name: 'sys.system.index',
      component: SystemIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/sys/module',
      name: 'sys.module.index',
      component: ModuleIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/sys/org',
      name: 'sys.org.index',
      component: OrgIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/sys/role',
      name: 'sys.role.index',
      component: RoleIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/sys/user',
      name: 'sys.user.index',
      component: UserIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/sys/syslog',
      name: 'sys.syslog.index',
      component: SyslogIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    }
  ]
});

// 权限验证
function requireAuth (to, from, next) {
  if (localStorage.getItem('userId') === null) {
    // TODO 简单检测用户是否登录、是否有权限，未登录跳转到登录页面，没权限提示无权访问
    next();
  } else {
    let toPath = to.path;
    let fromPath = from.path;
    console.log(`to: ${toPath} from: ${fromPath}`);
    next();
  }
}
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
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

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import VueResource from 'vue-resource';
import VueEcharts from 'vue-echarts/components/Echarts';
import 'iview/dist/styles/iview.css';    // 使用 CSS

Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(VueResource);

Vue.component('charts', VueEcharts);

Vue.http.options.root = process.env.BASE_API;
Vue.http.interceptors.push(function (request, next) {
  let token = sessionStorage.getItem('Authorization');
  if (token !== null && token !== undefined && token !== '') {
    request.headers.set('Authorization', token);
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

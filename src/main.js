// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import VueResource from 'vue-resource';
import VueEcharts from 'vue-echarts/components/Echarts';
import vSelect from 'vue-select';
import 'iview/dist/styles/iview.css';    // 使用 CSS

Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(VueResource);

Vue.component('charts', VueEcharts);
Vue.component('v-select', vSelect);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

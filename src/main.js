import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import VueTouch from 'vue-touch'

Vue.config.productionTip = false;
Vue.use(VueTouch, { name: 'v-touch' })
VueTouch.config.swipe = {
  threshold: 100 //手指左右滑动距离
}

import './filters'; //全局注册过滤器

import '@/vantUI'; //vant UI

import './permission'; //路由控制
// import './config/sdk';


/* eslint-disable no-new */
new Vue({
  store,
  router,
  components: {
    App
  },
  template: '<App/>',
  mounted() { }
}).$mount('#app');

import Vue from 'vue';
import Vuex from 'vuex';
import store from './store/store';
import router from './router/index';
import App from './App.vue';
// 添加全局的样式变量
import "./assets/style/reset.css";
// 按需导入组件
import "./plugins/vant";

Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

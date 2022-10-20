import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import * as echarts from 'echarts';

import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
Vue.use(ElementUI) //使用elementUI

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

export const eventBus = new Vue()

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

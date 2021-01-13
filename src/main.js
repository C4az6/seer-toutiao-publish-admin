/* 入口文件 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.less'
// 引入 Element-ui 组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false // 关闭生产环境错误提示
Vue.use(ElementUI)
// 创建Vue根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

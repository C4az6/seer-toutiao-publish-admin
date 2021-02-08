import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'
import Article from '@/views/article'
import Publish from '@/views/publish'
import Material from '@/views/material'
import Comment from '@/views/comment'
import Setting from '@/views/setting'
import Fans from '@/views/fans'
Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: Login
},
{
  path: '/',
  component: Layout,
  children: [{
    path: '', // path 为空作为默认子路由渲染
    name: 'home',
    component: Home
  },
  {
    path: '/article',
    name: 'article',
    component: Article
  }, {
    path: '/publish',
    name: 'publish',
    component: Publish
  }, {
    path: '/material',
    name: 'material',
    component: Material
  }, {
    path: '/comment',
    name: 'comment',
    component: Comment
  }, {
    path: '/setting',
    name: 'setting',
    component: Setting
  }, {
    path: '/fans',
    name: 'fans',
    component: Fans
  }
  ]
}
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 在路由拦截器中判断是否有token，如果有token就next放行，否则next重定向到登录页面
  const userToken = window.localStorage.getItem('user_token')
  if (!userToken && to.path !== '/login') {
    return next('/login')
  }
  next()
})

export default router

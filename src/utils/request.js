import axios from 'axios'
// 创建一个名字叫request的axios实例，和axios本身的功能一样
// 推荐使用axios.create方式创建实例，因为如果一个系统里面有多个api地址的时候可以给不同的实例设置不同地址
// 如果直接使用axios.default.baseurl的方式就只能设置一个api地址，很局限
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
})

// 配置axios请求拦截器
/* request.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
}) */

/* request.interceptors.request.use(config => {
  console.log(config)
}, error => Promise.reject(error)) */

// 请求拦截器
request.interceptors.request.use(
  // 任何所有请求会经过这里
  // config 是当前请求相关的配置信息对象
  // config 是可以修改的
  function (config) {
    const userToken = JSON.parse(window.localStorage.getItem('user_token'))
    if (userToken) {
      // 用户已经登录了，在headers请求头带上token
      config.headers.Authorization = `Bearer ${userToken.token}`
    }
    // 然后我们就可以在允许请求出去之前定制统一业务功能处理
    // 例如：统一的设置 token

    // 当这里 return config 之后请求在会真正的发出去
    return config
  },
  // 请求失败，会经过这里
  function (error) {
    return Promise.reject(error)
  }
)
export default request

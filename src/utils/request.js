import axios from 'axios'
import JSONbig from 'json-bigint'
// 创建一个名字叫request的axios实例，和axios本身的功能一样
// 推荐使用axios.create方式创建实例，因为如果一个系统里面有多个api地址的时候可以给不同的实例设置不同地址
// 如果直接使用axios.default.baseurl的方式就只能设置一个api地址，很局限
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  // 对后端返回的原始数据进行处理
  // 参数 data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
  // axios 默认在内部使用JSON.parse来解析数据
  transformResponse: [function (data) {
    // 防止后端返回的不是json格式的数据，这里需要进行异常捕获
    try {
      return JSONbig.parse(data)
    } catch (err) {
      console.log(err)
      // 转换失败，直接返回原始数据
      return data
    }
  }]
})
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

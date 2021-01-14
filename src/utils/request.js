import axios from 'axios'
// 创建一个名字叫request的axios实例，和axios本身的功能一样
// 推荐使用axios.create方式创建实例，因为如果一个系统里面有多个api地址的时候可以给不同的实例设置不同地址
// 如果直接使用axios.default.baseurl的方式就只能设置一个api地址，很局限
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
})
export default request

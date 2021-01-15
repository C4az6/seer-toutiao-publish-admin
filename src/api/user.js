import request from '@/utils/request'

// 用户登录
export const userLogin = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}

// 获取用户数据
export const userInfo = data => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}

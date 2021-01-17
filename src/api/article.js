// 内容管理相关接口请求函数
import request from '@/utils/request'

// 获取文章列表数据
export const articleList = data => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params: data
  })
}

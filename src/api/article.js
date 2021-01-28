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

// 获取频道数据
export const articleChannel = data => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除文章
export const deleteArticle = id => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${id}`
  })
}

// 发布文章
export const publishArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: { draft },
    data
  })
}

// 编辑文章
export const editArticle = (data, artileId, draft) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${artileId}`,
    params: { draft },
    data
  })
}

// 根据文章id查询文章信息
export const getArticleInfo = id => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles/' + id
  })
}

/* 评论数据相关的接口请求函数 */
import request from '@/utils/request'
// 修改文章评论状态
export const changeCommentStatus = (data, articleId) => {
  return request({
    url: '/mp/v1_0/comments/status',
    method: 'PUT',
    data,
    params: { article_id: articleId }
  })
}

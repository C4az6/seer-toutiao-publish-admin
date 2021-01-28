import request from '@/utils/request'

// 上传图片
/*
  注意：一般文件上传的接口都要求把请求头中的 Content-Type 设置为 multipart/form-data
  但是我们使用 axios 上传文件的话就不要需要手动设置了，你只需要给 data 一个 FormData 对象即可。
  axios 内部做了对应的封装
*/
export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}

// 获取用户图片素材
export const getUserImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

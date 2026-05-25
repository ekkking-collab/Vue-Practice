import request from '@/utils/request'
// 获取文章列表
export const artGetChannle = () => {
  return request.get('/my/cate/list')
}
// 添加文章分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)
// 编辑文章分类
export const artEditChannelService = (data) => request.put('/my/cate/info', data)
// 删除文章分类
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id },
  })
// 获取文章
export const artGetListService = (params) => request.get('/my/article/list', { params })
// 提交文章
export const artPublishService = (data) => request.post('/my/article/add', data)
// 文章删除
export const artDelService = (id) => request.delete('my/article/info', { params: { id } })

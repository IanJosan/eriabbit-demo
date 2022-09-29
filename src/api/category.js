// 定义首页需要的接口函数
import request from '@/utils/request'

export const findAllCategory = () => {
  return request('/home/category/head', 'get')
  // return request({
  //   url: '/home/category/head',
  //   method: 'get'
  // })
}

export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}

export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}

export const findSubCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params)
}

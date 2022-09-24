// 定义首页需要的接口函数
import request from '@/utils/request'

export const findAllCategory = () => {
  return request('/home/category/head', 'get')
  // return request({
  //   url: '/home/category/head',
  //   method: 'get'
  // })
}

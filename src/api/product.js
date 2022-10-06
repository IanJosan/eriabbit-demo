import request from '@/utils/request'

/**
 * 获取商品详情
 * @param {String} id - 商品ID
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}

export const findRelGoods = ({ id, limit = 16 }) => {
  return request('/goods/relevant', 'get', { id, limit })
}

export const findHotGoods = ({ id, type, limit = 3 }) => {
  return request('/goods/hot', 'get', { id, type, limit })
}

export const findCommentInfo = (id) => {
// https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate
  // return request(`/goods/${id}/evaluate`)
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}

export const findCommentList = (id, params) => {
  // https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate
  // return request(`/goods/${id}/evaluate`)
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}

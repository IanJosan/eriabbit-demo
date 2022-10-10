import request from '@/utils/request'

/**
 * 获取新的商品信息
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

/**
 * 获取商品的specs和skus
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getGoodsSkus = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}

export const mergeCart = (cartList) => {
  return request('/member/cart/merge', 'post', cartList)
}

export const findCart = () => {
  return request('/member/cart', 'get')
}

export const insertCart = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count })
}

export const deleteCart = (ids) => {
  return request('/member/cart', 'delete', { ids })
}

export const updateCart = ({ skuId, selected, count }) => {
  return request(`/member/cart/${skuId}`, 'put', { selected, count })
}

export const checkAllCart = ({ selected, ids }) => {
  return request('/member/cart/selected', 'put', { selected, ids })
}

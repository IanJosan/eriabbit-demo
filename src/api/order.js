import request from '@/utils/request'

/**
 * 获取结算信息
 */
export const createOrder = () => {
  return request('/member/order/pre', 'get')
}

export const addAddress = (address) => {
  return request('/member/address', 'post', address)
}

export const editAddress = (address) => {
  return request('/member/address', 'put', address)
}

export const submitOrder = (order) => {
  return request('/member/order', 'post', order)
}

export const findOrderDetail = (id) => {
  return request('/member/order/' + id, 'get')
}

export const findOrderList = ({ orderState, page, pageSize }) => {
  return request('/member/order', 'get', { orderState, page, pageSize })
}

export const cancelOrder = (orderId, cancelReason) => {
  return request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })
}

export const delteOrder = (ids) => {
  return request('/member/order', 'delete', { ids })
}

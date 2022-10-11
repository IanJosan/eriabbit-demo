import Mock from 'mockjs'
import qs from 'qs'
Mock.setup({
  // 模拟延迟时间500-1000ms
  timeout: '500-1000'
})
// 拦截接口
Mock.mock(/\/my\/test/, 'get', () => {
  // 随机数据逻辑
  const arr = []
  for (let i = 0; i < 5; i++) {
    arr.push(Mock.mock('@id'))
    arr.push(Mock.mock({
      id: '@id',
      name: '@cname'
    }))
  }
  return { msg: '获取数据成功', result: arr }
})

Mock.mock(/\/member\/collect/, 'get', config => {
  const querystring = config.url.split('?')[1]
  const queryObject = qs.parse(querystring)
  const items = []
  for (let i = 0; i < queryObject.pageSize; i++) {
    items.push(Mock.mock({
      id: '@id',
      name: '@ctitle(10,20)',
      desc: '@ctitle(4,10)',
      price: '@float(100,200,2,2)',
      // http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_7.jpg
      picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock('@integer(1,8)')}.jpg`

    }))
  }
  return {
    msg: '获取成功',
    result: {
      counts: 35,
      pageSize: +queryObject.pageSize,
      page: +queryObject.page,
      items
    }
  }
})

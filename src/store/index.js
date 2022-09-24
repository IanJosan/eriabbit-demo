import { createStore } from 'vuex'
import cart from './models/cart'
import user from './models/user'
import category from './models/category'
// 持久化插件引入 默认存储在localstorage
import createPersistedstate from 'vuex-persistedstate'
// vue2创建仓库  new Vuex.Store({})
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart,
    user,
    category
  },
  // 插件
  plugins: [createPersistedstate({
    // 本地存储名字
    key: 'erabbit-client-pc-124-store',
    // 本地存储的模块
    paths: ['user', 'cart']
  })]
})

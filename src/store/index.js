import { createStore } from 'vuex'
import cart from './models/cart'
import user from './models/user'
import catagory from './models/catagory'
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
    catagory
  }
})

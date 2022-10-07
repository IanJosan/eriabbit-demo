// 用户
export default {
  namespaced: true,

  state () {
    return {
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      },
      // 登陆后回跳
      redirectUrl: '/'
    }
  },
  mutations: {
    setUser (state, payload) {
      state.profile = payload
    },
    // 修改回跳
    setRedirectUrl (state, url) {
      state.redirectUrl = url
    }
  }
}

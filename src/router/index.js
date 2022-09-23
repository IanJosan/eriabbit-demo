import { createRouter, createWebHashHistory } from 'vue-router'
const routes = []

// vue2 new VueRouter({})
// vue3 createRouter({})
const router = createRouter({
  // 使用hash模式
  history: createWebHashHistory(),
  routes
})

export default router

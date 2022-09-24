import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const topCategory = () => import('@/views/category')
const subCategory = () => import('@/views/category/sub')
const routes = [
  // 一级路由
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: topCategory },
      { path: '/category/sub/:id', component: subCategory }
    ]
  }
]

// vue2 new VueRouter({})
// vue3 createRouter({})
const router = createRouter({
  // 使用hash模式
  history: createWebHashHistory(),
  routes
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const topCategory = () => import('@/views/category')
const subCategory = () => import('@/views/category/sub')
const Goods = () => import('@/views/goods/index')
const Cart = () => import('@/views/cart/index')
const Login = () => import('@/views/login')
const LoginCallback = () => import('@/views/login/callback')
const PayCheckout = () => import('@/views/member/pay/checkout')
const routes = [
  // 一级路由
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: topCategory },
      { path: '/category/sub/:id', component: subCategory },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart },
      { path: '/member/checkout', component: PayCheckout }
    ]
  },
  { path: '/login', component: Login },
  { path: '/login/callback', component: LoginCallback }
]

// vue2 new VueRouter({})
// vue3 createRouter({})
const router = createRouter({
  // 使用hash模式
  history: createWebHashHistory(),
  routes,
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 需要登陆路由地址是以/member开头
  const { profile } = store.state.user
  if (!profile.token && to.path.startsWith('/member')) {
    return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
  }
  next()
})
export default router

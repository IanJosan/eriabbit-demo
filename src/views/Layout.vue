<template>
    <AppNavbar/>
    <appHeaderVue/>
    <appHeaderStickyVue/>
    <div class="app-body">
      <!-- 二级路由 -->
      <router-view></router-view>
    </div>
    <appFooter/>
  </template>
<script>
import AppNavbar from '@/components/app-topnav.vue'
import appHeaderVue from '@/components/app-header.vue'
import appFooter from '@/components/app-footer.vue'
import appHeaderStickyVue from '@/components/app-header-sticky.vue'
import { useStore } from 'vuex'
export default {
  name: 'xtx-layout',
  components: {
    AppNavbar,
    appHeaderVue,
    appFooter,
    appHeaderStickyVue
  },
  // 获取分类下数据
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }

}
</script>

<style scoped lang='less'>
  .app-body{
    min-height: 600px;
  }
</style>

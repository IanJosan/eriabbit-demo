<template>
  <div class="home-enter">
    <div class="container">
      <!-- 左侧分类 -->
      <homeCategoryVue />
      <!-- 轮播图 -->
      <homeBannerVue />
    </div>
  </div>
  <!-- 新鲜好物 -->
  <HomeNew />
  <!-- 人气推荐 -->
  <HomeHot />
  <!-- 品牌推荐 -->
  <homeBrandVue/>
  <!-- 商品区域 -->
  <HomeProduct/>
  <!-- 最新专题 -->
  <homeSpecialVue/>
</template>

<script>
import homeCategoryVue from './components/home-category.vue'
import homeBannerVue from './components/home-banner.vue'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import homeBrandVue from './components/home-brand.vue'
import HomeProduct from './components/home-product'
import homeSpecialVue from './components/home-special.vue'
export default {
  name: 'HomePage',
  components: {
    homeCategoryVue,
    homeBannerVue,
    HomeNew,
    HomeHot,
    homeBrandVue,
    HomeProduct,
    homeSpecialVue

  }
}
</script>

<style scoped lang="less">
.container {
  .hoverShadow();
  color: @xtxColor;
}
</style>

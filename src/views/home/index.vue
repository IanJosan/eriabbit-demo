<template>
    <div class="container">
        <div class="home-enter">
          <!-- 左侧分类 -->
          <homeCategoryVue/>
          <!-- 轮播图 -->
        </div>
    </div>
</template>

<script>
import homeCategoryVue from './components/home-category.vue'
export default {
  name: 'HomePage',
  components: {
    homeCategoryVue
  }
}
</script>

<style scoped lang="less">
  .container {
    .hoverShadow();
    color:@xtxColor;
  }

</style>

<template>
    <div class="goods-item">
      <RouterLink to="/" class="image">
      <img v-lazy="goods.picture" alt="" />
      </RouterLink>
    <p class="name ellipsis-2">{{goods.name}}</p>
    <p class="desc">{{goods.tag}}</p>
    <p class="price">&yen;{{goods.price}}</p>
      <div class="extra">
        <RouterLink to="/">
          <span>找相似</span>
          <span>发现现多宝贝 &gt;</span>
        </RouterLink>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'HomeGoods',
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

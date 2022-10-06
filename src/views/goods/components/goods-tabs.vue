<template>
    <div class="goods-tabs">
      <nav>
        <a
          :class="{ active: activeName === 'GoodsDetail' }"
          href="javascript:;"
          @click="activeName = 'GoodsDetail'"
          >商品详情</a
        >
        <a
          :class="{ active: activeName === 'GoodsComment' }"
          href="javascript:;"
          @click="activeName = 'GoodsComment'"
          >商品评价<span>({{goods.commentCount}})</span></a
        >
      </nav>
      <!-- 这个位置显示对应的组件 GoodsDetail 或者 GoodsComment -->
      <component :is="activeName" />
    </div>
  </template>
<script>
import { ref, inject } from 'vue'
import GoodsDetail from './goods-detail'
import GoodsComment from './goods-comment'
export default {
  name: 'GoodsTabs',
  components: { GoodsDetail, GoodsComment },
  setup () {
    // detail-->详情   comment-->评价
    const activeName = ref('GoodsDetail')
    // const clickTab = (name) => {
    //   console.log(activeName, 2222)
    //   activeName.value = name
    //   // console.log(activeName.value, 333)
    // }
    const goods = inject('goods')
    return { activeName, goods }
  }
}
</script>

<style scoped lang="less">
.goods-tabs {
    min-height: 600px;
    background: #fff;

    nav {
        height: 70px;
        line-height: 70px;
        display: flex;
        border-bottom: 1px solid #f5f5f5;

        a {
            padding: 0 40px;
            font-size: 18px;
            position: relative;

            >span {
                color: @priceColor;
                font-size: 16px;
                margin-left: 10px;
            }

            &:first-child {
                border-right: 1px solid #f5f5f5;
            }

            &.active {
                &::before {
                    content: "";
                    position: absolute;
                    left: 40px;
                    bottom: -1px;
                    width: 72px;
                    height: 2px;
                    background: @xtxColor;
                }
            }
        }
    }
}
</style>>

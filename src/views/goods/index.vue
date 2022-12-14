<template>
    <div class='xtx-goods-page' v-if="goods">
        <div class="container">
            <!-- 面包屑 -->
            <XtxBread>
                <XtxBreadItem to="/">首页</XtxBreadItem>
                <XtxBreadItem to="`/category/${goods.categories[0].id}`">{{goods.categories[0].name}}</XtxBreadItem>
                <XtxBreadItem to="`/category/sub/${goods.categories[1].id}`">{{goods.categories[1].name}}</XtxBreadItem>
                <XtxBreadItem to="/">{{goods.name}}</XtxBreadItem>
            </XtxBread>
            <!-- 商品信息 -->
            <div class="goods-info">
                <div class="media">
                    <GoodsImage :images="goods.mainPictures" />
                    <GoodsSales />
                </div>
                <div class="spec">
                    <GoodsName :goods="goods"/>
                    <!-- 规格组件 -->
                    <GoodsSku :goods="goods" @change="changeSku" skuId=""/>
                    <!-- 数量组件 -->
                    <XtxNumbox label="数量" v-model="num" :max="goods.inventory"/>
                    <!-- 按钮组件 -->
                    <XtxButton @click="insertCart()" type="primary" style="margin-top:20px;">加入购物车</XtxButton>
                </div>
            </div>
            <!-- 商品推荐 -->
            <GoodsRelevant  :goodsId="goods.id"/>
            <!-- 商品详情 -->
            <div class="goods-footer">
                <div class="goods-article">
                    <!-- 商品+评价 -->
                    <GoodsTabs/>
                    <!-- 注意事项 -->
                    <div class="goods-warn">
                        <GoodsWarn />
                    </div>
                </div>
                <!-- 24热榜+专题推荐 -->
                <div class="goods-aside">
                    <GoodsHot  :type="1" />
                    <GoodsHot  :type="2" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GoodsSku from './components/goods-sku'
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image.vue'
import { ref, watch, nextTick, provide } from 'vue'
import { useRoute } from 'vue-router'
import { findGoods } from '@/api/product'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import GoodsTabs from './components/goods-tabs'
import GoodsHot from './components/goods-hot'
import GoodsWarn from './components/goods-warn'
import Message from '@/components/library/Message'
import { useStore } from 'vuex'
export default {
  name: 'XtxGoodsPage',
  components: { GoodsWarn, GoodsHot, GoodsTabs, GoodsRelevant, GoodsImage, GoodsSales, GoodsName, GoodsSku },
  setup () {
    const goods = useGoods()
    // sku改变时候触发
    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
      currSku.value = sku
    }
    // 提供goods数据给后代
    provide('goods', goods)
    // 选择的数量
    const num = ref(1)
    // 加入购物车
    const store = useStore()
    const currSku = ref(null)
    const insertCart = () => {
      if (currSku.value && currSku.value.skuId) {
        const { skuId, specsText: attrsText, inventory: stock } = currSku.value
        const { name, price, id, mainPictures } = goods.value
        store.dispatch('cart/insertCart', {
          skuId,
          attrsText,
          stock,
          name,
          nowPrice: price,
          id,
          picture: mainPictures[0],
          count: num.value,
          isEffective: true
        }).then(() => {
          Message({ type: 'success', text: '加入成功' })
        })
      } else {
        Message({ text: '请选择' })
      }
    }
    return { goods, changeSku, num, insertCart }
  }

}
const useGoods = () => {
  const goods = ref(null)
  const route = useRoute()
  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then(data => {
        goods.value = null
        nextTick(() => {
          goods.value = data.result
        })
      })
    }
  }, { immediate: true })
  return goods
}
</script>

<style scoped lang='less'>
.goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
        width: 580px;
        height: 600px;
        padding: 30px 50px;
    }

    .spec {
        flex: 1;
        padding: 30px 30px 30px 0;
    }
}

.goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
        width: 940px;
        margin-right: 20px;
    }

    .goods-aside {
        width: 280px;
        min-height: 1000px;
    }
}

.goods-tabs {
    min-height: 600px;
    background: #fff;
}

.goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
}
</style>

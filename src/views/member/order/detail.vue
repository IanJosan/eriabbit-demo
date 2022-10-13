<template>
  <div class="member-detail" v-if="order">
  <!-- 头部 -->
  <DetailAction :order="order"  />
  <!-- 物流 -->
  <DetailSteps :order="order"/>
  <Suspense>
<template #default>
  <DetailLogistics v-if="[3,4,5].includes(order.orderState)" :order="order"/>
</template>
<template #fallback>
  loading...
</template>
  </Suspense>
  <!-- 信息 -->
  <DetailInfo :order="order"/>
  </div>
</template>

<script>
import DetailSteps from './components/detail-steps.vue'
import DetailAction from './components/detail-action'
import DetailLogistics from './components/detail-logistics.vue'
import DetailInfo from './components/detail-info.vue'

import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { findOrderDetail } from '@/api/order'

export default {
  name: 'MemberDetail',
  components: { DetailInfo, DetailAction, DetailSteps, DetailLogistics },
  setup (props) {
    const route = useRoute()
    const order = ref(null)
    findOrderDetail(route.params.id).then(data => {
      order.value = data.result
    })
    return { order }
  }
}
</script>

<style>

</style>

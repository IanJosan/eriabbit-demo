<template>
  <div class="member-order-page">
    <!-- tab组件 -->
    <XtxTabs v-model="activeName" @tab-click="tabClick">
      <XtxTabsPanel v-for="item in orderStatus" :key="item.name" :name="item.name" :label="item.label">

      </XtxTabsPanel>
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
      <OrderItem @on-delete="handlerDelete" @on-cancel="handlerCancel" v-for="item in orderList" :key="item.id" :order="item"/>
    </div>
    <!-- 分页 -->
    <XtxPagination
    v-if="total>0"
    :current-page="requestParams.page"
    :page-size="requestParams.pageSize"
    :total="total"
    @current-change="requestParams.page=$event">
  </XtxPagination>
  <!-- 取消原因 -->
  <OrderCancel ref="orderCancelCom"/>
  </div>
</template>
<script>
import { ref, reactive, watch } from 'vue'
import { orderStatus } from '@/api/constants'
import OrderItem from './components/order-item.vue'
import { findOrderList, deleteOrder } from '@/api/order'
import OrderCancel from './components/order-cancel.vue'
import confirm from '@/components/library/confirm'
import Message from '@/components/library/Message'

export default {
  name: 'MemberOrder',
  setup () {
    const activeName = ref('all')
    // 查询订单参数
    const requestParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })
    // 订单列表
    const orderList = ref([])
    // 查询订单
    const loading = ref(false)
    const total = ref(0)
    const getOrderList = () => {
      loading.value = true
      findOrderList(requestParams).then(data => {
        orderList.value = data.result.items
        total.value = data.result.counts
        loading.value = false
      })
    }
    watch(requestParams, () => {
      getOrderList()
    }, { immediate: true })

    const tabClick = ({ index }) => {
      requestParams.page = 1
      requestParams.orderState = index
    }
    const handlerDelete = (order) => {
      confirm({ text: '确认删除' }).then(() => {
        deleteOrder(order.id).then(() => {
          Message({ type: 'success', text: '删除成功' })
          getOrderList()
        })
      }).catch(() => {

      })
    }
    return { activeName, tabClick, orderStatus, orderList, loading, total, requestParams, ...useCancel(), handlerDelete }
  },
  components: { OrderItem, OrderCancel }
}
const useCancel = () => {
  const orderCancelCom = ref(null)
  const handlerCancel = (order) => {
    orderCancelCom.value.open(order)
  }
  return { handlerCancel, orderCancelCom }
}
</script>
<style scoped lang="less">
.member-order{
  height: 100%;
}
.order-list {
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255,255,255,.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}

</style>

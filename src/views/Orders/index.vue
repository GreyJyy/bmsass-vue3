<script setup lang="ts">
import { ref } from 'vue'
import BreadCrumb from '@/components/BreadCrumb/index.vue'
import JyPanel from '@/components/JyPanel/index.vue'
import { getOrdersListAPI } from '@/api/orders'
import { formatDate } from '@/utils/formatDate'
interface orders {
  index: number
  consignee_addr?: string
  order_fapiao_company?: string
  order_fapiao_content?: string
  order_fapiao_title?: string
  order_id?: number
  trade_no?: string
  update_time?: number
  user_id?: number
  create_time: string
  is_send: string
  pay_status: string
  order_price: number
  order_number: string
}
const ordersList = ref<orders[]>([])
const getOrders = async () => {
  const res = await getOrdersListAPI({ query: null, pagenum: 1, pagesize: 10 })
  ordersList.value = res.data.goods
  let ind = 0
  ordersList.value.forEach((item: orders) => {
    delete item.consignee_addr
    delete item.order_fapiao_company
    delete item.order_fapiao_content
    delete item.order_fapiao_title
    delete item.user_id
    delete item.order_id
    delete item.trade_no
    delete item.update_time
    item.index = ++ind
    item.pay_status = item.pay_status === '0' ? '未支付' : '已支付'
    item.create_time = formatDate(item.create_time)
  })
}
getOrders()
const labels = ['#', '订单编号', '订单价格', '是否付款', '是否发货', '下单时间']
const tables = [
  'index',
  'order_number',
  'order_price',
  'pay_status',
  'is_send',
  'create_time'
]
</script>

<template>
  <bread-crumb :index="3" :second-index="0"></bread-crumb>
  <jy-panel
    :hasHeader="true"
    :hasSearchInput="true"
    :hasSearchButton="false"
    :hasOperation="true"
    :operations="['Edit']"
    :tableData="ordersList"
    :labels="labels"
    :tables="tables"
  ></jy-panel>
</template>

<style scoped lang="less"></style>

<script setup lang="ts">
import { getOrdersListAPI } from '@/api/orders'
import { formatDate } from '@/utils/formatDate'
interface orders {
  create_time: string
  is_send: string
  pay_status: string
  order_price: number
  order_number: string
}
const ordersList = ref<orders[]>([])
const getOrders = async () => {
  const res = await getOrdersListAPI({ query: null, pagenum: 1, pagesize: 10 })
  ordersList.value = res.goods
  ordersList.value.forEach((item: orders) => {
    item.pay_status = item.pay_status === '0' ? '未支付' : '已支付'
    item.create_time = formatDate(item.create_time)
  })
}
getOrders()
const labels = ['订单编号', '订单价格', '是否付款', '是否发货', '下单时间']
const tables = [
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
    :hasOperation="true"
    :hasIndex="true"
    :operations="['Edit']"
    :tableData="ordersList"
    :labels="labels"
    :tables="tables"
  ></jy-panel>
</template>

<style scoped lang="less"></style>

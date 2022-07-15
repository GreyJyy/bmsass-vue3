<script setup lang="ts" name="goods">
import { getGoodsListAPI } from '@/api/goods'
import usePagination from '@/hooks/usePagination'
import { formatDate } from '@/utils/formatDate'
import debounce from '@/utils/debounce'
interface goodsItem<T> {
  total: number
  pagenum: string
  goods: T
}
type goodsInfo = {
  goods_id: number
  goods_name: string
  goods_price: number
  goods_number: number
  goods_weight: number
  good_state: 0 | 1 | 2 | null
  add_time: number | string
  upd_time: number
  hot_number: number
  is_promote: boolean
}

//get goods list
const labels = reactive(['商品名称', '商品价格(元)', '商品重量', '创建时间'])
const tables = reactive([
  'goods_name',
  'goods_price',
  'goods_weight',
  'add_time'
])
const goodsList = ref<goodsInfo[]>([])
const getGoodsList = async (query: string | null = null) => {
  const res: goodsItem<goodsInfo[]> = await getGoodsListAPI({
    query,
    pagenum: currentPage.value,
    pagesize: pageSize.value
  })
  //format date
  res.goods.forEach((item: goodsInfo) => {
    item.add_time = formatDate(item.add_time as string)
  })
  totalItems.value = res.total
  goodsList.value = res.goods
}
onMounted(() => {
  getGoodsList(null) //render goods list
})

//pagination
const { currentPage, pageSize } = usePagination() //to control the pagination
const totalItems = ref(0)
const changePagination = async (currentPage: number, pageSize: number) => {
  const res: goodsItem<goodsInfo[]> = await getGoodsListAPI({
    query: null,
    pagenum: currentPage,
    pagesize: pageSize
  })
  res.goods.forEach((item: goodsInfo) => {
    item.add_time = formatDate(item.add_time as string)
  })
  goodsList.value = res.goods
}
//on search
const onSearch = (query: string) => {
  debounce(() => {
    getGoodsList(query)
  }, 500)
}
</script>

<template>
  <bread-crumb :index="2" :second-index="0"></bread-crumb>
  <jy-panel
    :labels="labels"
    :tables="tables"
    :operations="['Edit']"
    :hasHeader="true"
    :widthList="['550px', '80px', '80px', '120px']"
    operationWidth="80px"
    :has-search-input="true"
    :has-search-button="true"
    button-name="添加商品"
    :has-operation="true"
    :has-index="true"
    :table-data="goodsList"
    @on-search="onSearch"
  ></jy-panel>

  <!-- the pagination -->
  <pagination
    :totalItems="totalItems"
    @getGoodsList="changePagination"
  ></pagination>
</template>

<style scoped lang="less"></style>

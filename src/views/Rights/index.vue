<script setup lang="ts">
import { ref } from 'vue'
import BreadCrumb from '@/components/BreadCrumb/index.vue'
import JyPanel from '@/components/JyPanel/index.vue'
import { getRightsList } from '@/api/permission'
interface rights {
  id?: number
  pid?: number
  index: number
  authName: string
  level: string
  path: string
}
const rightsList = ref<rights[]>([])
const getRights = async () => {
  const res = await getRightsList('list')
  rightsList.value = res.data
  let ind = 0
  rightsList.value.forEach((item: rights) => {
    delete item.id
    delete item.pid
    item.index = ++ind
    item.level =
      item.level === '0' ? '等级一' : item.level === '1' ? '等级二' : '等级三'
  })
}
getRights()
const labels = ['#', '权限名称', '路径', '权限等级']
const tables = ['index', 'authName', 'path', 'level']
</script>

<template>
  <bread-crumb :index="1" :second-index="1"></bread-crumb>
  <jy-panel
    :hasHeader="false"
    :hasSearchInput="false"
    :hasSearchButton="false"
    :tableData="rightsList"
    :labels="labels"
    :tables="tables"
  ></jy-panel>
</template>

<style scoped lang="less"></style>

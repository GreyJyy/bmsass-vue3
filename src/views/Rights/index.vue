<script setup lang="ts">
import { getRightsList } from '@/api/permission'
interface rights {
  authName: string
  level: string
  path: string
}
const rightsList = ref<rights[]>([])
const getRights = async () => {
  const res = await getRightsList('list')
  rightsList.value = res
  rightsList.value.forEach((item: rights) => {
    item.level =
      item.level === '0' ? '等级一' : item.level === '1' ? '等级二' : '等级三'
  })
}
getRights()
const labels = ['权限名称', '路径', '权限等级']
const tables = ['authName', 'path', 'level']
</script>

<template>
  <bread-crumb :index="1" :second-index="1"></bread-crumb>
  <jy-panel
    :hasIndex="true"
    :tableData="rightsList"
    :labels="labels"
    :tables="tables"
  ></jy-panel>
</template>

<style scoped lang="less"></style>

<script setup lang="ts" name="treeColumns">
import { ChildItem } from '@/types/roles'
const p = defineProps<{
  childList: ChildItem[]
  sonList: ChildItem[]
}>()
// const emits = defineEmits<{
//   (e: 'onRemoveRight', rowId: number, id: number): void
// }>()
const onRemoveRight = () => {
  console.log(p.childList)
  console.log(p.sonList)
  // emits('onRemoveRight', rowId, id)
}
</script>

<template>
  <div
    :class="{ child1: item.children, child2: !item.children }"
    v-for="item in childList"
    :key="item.id"
  >
    <div :style="{ margin: item.children ? '10px 50px' : '0' }">
      <el-tag type="success" v-if="item.children">{{ item.authName }}</el-tag>
      <i :class="'el-icon-caret-right'" v-if="item.children"></i>
      <el-tag v-else closable @close="onRemoveRight()">{{
        item.authName
      }}</el-tag>
    </div>
    <div v-if="item.children">
      <tree-columns :childList="item.children"></tree-columns>
    </div>
  </div>
</template>

<style lang="less">
.child1 {
  display: flex;
  align-items: center;
}
.child2 {
  display: inline-block;
  margin: 10px;
}
</style>

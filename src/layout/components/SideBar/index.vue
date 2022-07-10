<script setup lang="ts">
const props = defineProps({
  isCollapse: Boolean,
  activePath: String
})
const emit = defineEmits(['toggleCollapse'])
const toggleCollapse = () => emit('toggleCollapse')
</script>

<template>
  <el-aside :width="props.isCollapse ? '64px' : '200px'">
    <div class="toggle-button" @click="toggleCollapse">|||</div>
    <!-- 侧边栏菜单区域 -->
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EFF"
      unique-opened
      :collapse="props.isCollapse"
      :collapse-transition="false"
      :router="true"
      :default-active="props.activePath"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item index="1-1">item one</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style scoped lang="less">
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.iconfont {
  margin-right: 10px;
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
</style>

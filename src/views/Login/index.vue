<script setup lang="ts">
import { useLoginValidate } from '@/hooks/useLoginValidate'

//to validate the login form
const { form, rules, ruleFormRef, submitForm, resetForm } = useLoginValidate()
</script>

<template>
  <div class="container">
    <div class="form-box">
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleFormRef"
        label-width="120px"
        size="large"
        status-icon
      >
        <el-form-item label="用户名" prop="username"
          ><el-input v-model="form.username"></el-input
        ></el-form-item>
        <el-form-item label="密码" prop="password"
          ><el-input v-model="form.password" show-password></el-input
        ></el-form-item>
        <el-form-item class="btns">
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
            class="btn-item"
            >登录</el-button
          >
          <el-button class="btn-item" @click="resetForm(ruleFormRef)"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 569px;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .form-box {
    width: 400px;
    height: 250px;
    padding: 30px 15px;
    margin-top: 120px;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 20px;
    .btns {
      display: flex;

      .btn-item {
        margin-top: 20px;
      }
    }
  }
}
</style>

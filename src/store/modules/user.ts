import { loginAPI } from '@/api/user'
import { loginReq } from '@/types/user'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
const useUserStore = defineStore('user', {
  state: () => {
    return { token: '' }
  },
  getters: {},
  actions: {
    async login(data: loginReq) {
      try {
        const res = await loginAPI(data)
        if (res.meta.status !== 200) {
          ElMessage({
            message: '用户名不存在或密码错误',
            type: 'warning'
          })
          return
        }
        this.token = res.data.token
        ElMessage({
          message: '登录成功',
          type: 'success'
        })
      } catch (error) {
        console.log(error)
        ElMessage({
          message: '登录失败',
          type: 'warning'
        })
      }
    }
  },
  persist: true
})
export default useUserStore

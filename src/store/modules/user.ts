import { loginAPI } from '@/api/user'
import { loginReq } from '@/types/user'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { getSideMenuAPI } from '@/api/permission'
import { SideMenuItem } from '@/types/permission'
import Vrouter from '@/router'
const router = Vrouter
const useUserStore = defineStore('user', {
  state: () => {
    return { token: '', menuList: [] as SideMenuItem[] }
  },
  getters: {},
  actions: {
    //login validate and set token to localStorage
    async login(data: loginReq) {
      try {
        const res = await loginAPI(data)
        if (res.meta.status !== 200) {
          ElMessage({
            message: '用户名不存在或密码错误',
            type: 'warning'
          })
        } else {
          this.token = res.data.token
          ElMessage({
            message: '登录成功',
            type: 'success'
          })
          router.replace('/')
        }
      } catch (error) {
        console.log(error)
        ElMessage({
          message: '登录失败',
          type: 'warning'
        })
      }
    },

    //get side menu list
    async getSideMenu() {
      try {
        const res = await getSideMenuAPI()
        this.menuList = res.data
      } catch (error) {
        console.log(error) //for debug
      }
    }
  },
  persist: {
    paths: ['token']
  }
  // persist: true
})
export default useUserStore

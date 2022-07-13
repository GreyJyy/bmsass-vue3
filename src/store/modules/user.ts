import { loginAPI } from '@/api/user'
import { loginReq } from '@/types/user'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
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
      const res = await loginAPI(data)
      this.token = res?.token
      ElMessage.success('登录成功')
      router.replace('/')
    },

    //get side menu list
    async getSideMenu() {
      const res = await getSideMenuAPI()
      this.menuList = res
    }
  },
  persist: {
    paths: ['token']
  }
  // persist: true
})
export default useUserStore

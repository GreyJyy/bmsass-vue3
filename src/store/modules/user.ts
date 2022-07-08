import { defineStore } from 'pinia'
const useUserStore = defineStore('user', {
  state: () => {
    return { token: '' }
  },
  getters: {},
  actions: {}
})
export default useUserStore

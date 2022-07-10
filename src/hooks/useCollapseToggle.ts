import useStore from '@/store'
import { ref } from 'vue'
const { user } = useStore()
export default function () {
  user.getSideMenu()
  const isCollapse = ref(false)
  const activePath = ref('0')
  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
  }
  return {
    isCollapse,
    activePath,
    toggleCollapse
  }
}

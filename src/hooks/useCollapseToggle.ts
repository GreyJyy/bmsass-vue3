import useStore from '@/store'

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

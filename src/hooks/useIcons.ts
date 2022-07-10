import { shallowRef } from 'vue'
import {
  Avatar,
  Expand,
  Goods,
  Grid,
  Monitor,
  House
} from '@element-plus/icons-vue'

export default function () {
  const icons = shallowRef<any>([
    { 0: Avatar },
    { 1: Expand },
    { 2: Goods },
    { 3: Grid },
    { 4: Monitor }
  ])
  return {
    icons,
    House
  }
}

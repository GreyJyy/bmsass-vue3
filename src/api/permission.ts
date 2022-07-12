import request from '@/utils/request'
import { listType } from '@/types/permission'

export const getSideMenuAPI = () =>
  request({
    url: 'menus',
    method: 'GET'
  })

export const getRightsList = (type: listType) =>
  request({
    url: `rights/${type}`,
    method: 'GET'
  })

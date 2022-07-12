import request from '@/utils/request'
import { getOrdersReq } from '@/types/orders'

export const getOrdersListAPI = (params: getOrdersReq) =>
  request({
    url: 'orders',
    method: 'GET',
    params
  })

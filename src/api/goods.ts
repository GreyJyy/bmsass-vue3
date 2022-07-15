import request from '@/utils/request'
import { getOrdersReq } from '@/types/orders'

type getGoodsReq = getOrdersReq
export const getGoodsListAPI = (params: getGoodsReq) =>
  request({
    url: 'goods',
    method: 'GET',
    params
  })

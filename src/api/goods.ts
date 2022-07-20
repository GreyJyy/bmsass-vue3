import request from '@/utils/request'
import { getOrdersReq } from '@/types/orders'
import { AddReq, attrsItem } from '@/types/goods'
type getGoodsReq = getOrdersReq
export const getGoodsListAPI = (params: getGoodsReq) =>
  request({
    url: 'goods',
    params
  })

export const addGoodsAPI = (data: AddReq<attrsItem>) =>
  request({
    url: 'goods',
    method: 'POST',
    data
  })

export interface AddReq<T> {
  goods_cat: string
  goods_introduce: string
  goods_number: string
  goods_name: string
  goods_price: string
  goods_weight: string
  pics: Array
  attrs: T[]
}

export type attrsItem = {
  attr_id: number
  attr_value: string
}

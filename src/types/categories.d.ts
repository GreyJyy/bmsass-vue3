export type categoriesReq = {
  type?: [1] | [1, 2] | [1, 2, 3]
  pagenum?: number
  pagesize?: number
}

export type attributesReq = {
  id: number
  sel: 'only' | 'many'
}

export type addReq = {
  id: number
  attr_name: string
  attr_sel: 'only' | 'many'
  attr_vals?: string
}

export type deleteReq = {
  id: number
  attrid: number
}

export type editReq = addReq & {
  attrid: number
}

export type addCategoriesReq = {
  cat_pid: number
  cat_name: string
  cat_level: number
}

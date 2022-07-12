export type SideMenuItem = {
  authName: string
  children: Array
  id: number
  order: number
  path: string
}

export type tableItem = {
  create_time: number
  email: string
  id: number
  index: number | null
  mobile: string
  mg_state: boolean
  role_name: string
  username: string
}

export type listType = 'list' | 'tree'

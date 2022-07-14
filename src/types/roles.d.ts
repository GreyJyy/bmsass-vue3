export interface IRoles<T> {
  id: number
  roleDesc: string
  roleName: string
  children: T
}

export type ChildItem = {
  id: number
  authName: string
  path: string
  children?: ChildItem[]
}

export type roleInfo = {
  roleName: string
  roleDesc: string | null
}

export type RoleItem = roleInfo & {
  id: number
}

export type setRoleData = {
  id: number
  rid: number
}

export type grantReq = {
  roleId: number
  rids: string | null
}

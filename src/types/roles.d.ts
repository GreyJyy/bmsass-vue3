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
  children: T
}

export type RoleItem = {
  id: number
  roleName: string
  roleDesc: string | null
}

export type setRoleData = {
  id: number
  rid: number
}

export type grantReq = {
  roleId: number
  rids: string | null
}

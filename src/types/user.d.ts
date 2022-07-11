//for loginAPI
export type loginReq = {
  username: string
  password: string
}

//for getUserListAPI
export type userListReq = {
  query: string | null
  pagenum: number
  pagesize: number
}

//for addUserInfoAPI
export type addInfoReq = {
  username: string
  password: string | null
  email: string
  mobile: string
}

//for editUserInfoAPI
export type editInfoReq = {
  id: number
  email: string | null
  mobile: string | null
}

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
  password: string
  email: string
  mobile: string
}

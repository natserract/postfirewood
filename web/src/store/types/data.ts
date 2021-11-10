export type AuthState = {
  authenticated: boolean
  token: string
}

export type DataState = {
  auth: AuthState
}

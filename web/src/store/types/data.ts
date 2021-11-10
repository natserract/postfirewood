import { AuthState } from './auth'
import { UserState } from './user'

export type DataState = {
  auth: AuthState
  user: UserState | Record<string, never>
}

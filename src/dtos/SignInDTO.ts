import { UserDTO } from './UserDTO'

export type SignInDTO = {
  token: string
  user: UserDTO
  refresh_token: string
}

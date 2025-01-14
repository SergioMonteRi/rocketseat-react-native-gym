import { UserDTO } from '@dtos/UserDTO'

export type AuthContextDataProps = {
  user: UserDTO
  isLoadingUserStorageData: boolean
  singOut: () => Promise<void>
  signIn: (email: string, password: string) => void
}

export type AuthContextProviderProps = {
  children: React.ReactNode
}

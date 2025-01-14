import { createContext, useCallback, useEffect, useState } from 'react'

import { api } from '@services/api'

import { UserDTO } from '@dtos/UserDTO'
import { SignInDTO } from '@dtos/SignInDTO'

import {
  storageUserGet,
  storageUserSave,
  storageUserRemove,
} from '@storage/user/storageUser'

import { AuthContextDataProps, AuthContextProviderProps } from './types'

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export const AuthContexProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  const signIn = useCallback(async (email: string, password: string) => {
    const { data } = await api.post<SignInDTO>('/sessions', { email, password })

    if (data?.user) {
      setUser(data.user)
      storageUserSave(data.user)
      return data.user
    }

    return undefined
  }, [])

  const loadUserData = useCallback(async () => {
    try {
      setIsLoadingUserStorageData(true)
      const user = await storageUserGet()

      if (user) {
        setUser(user)
      }
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }, [])

  const singOut = useCallback(async () => {
    try {
      setIsLoadingUserStorageData(true)

      await storageUserRemove()
      setUser({} as UserDTO)
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }, [])

  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  return (
    <AuthContext.Provider
      value={{ user, isLoadingUserStorageData, signIn, singOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
